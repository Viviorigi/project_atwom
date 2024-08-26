import styled from "styled-components";
import { Container } from "../../styles/styles";
import { breakpoints } from "../../styles/themes/default";
import Breadcrumb from "../../comp/common/Breadcrumb";
import CartTable from "../../comp/cart/CartTable";
import CartSummary from "../../comp/cart/CartSummary";
import CartShopping from "../../comp/cart/CartShopping";
import { CartService } from "../../services/CartService";
import { useState, useEffect } from "react";
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { UserDetail } from "../../model/auth/UserDetail";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { CheckoutDetailDTO, CheckoutStatus } from "../../model/checkout/CheckoutDTO";
import { CheckoutDTO } from "../../model/checkout/CheckoutDTO";
import { CheckoutDetailService } from "../../services/CheckoutDetailService";
import { addCheckout, getCheckoutById } from '../../services/CheckoutService';

const CartPageWrapper = styled.main`
  padding: 48px 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;

  @media (max-width: ${breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const CartTableWrapper = styled.div`
  flex: 1;
  max-width: 82%;
  overflow-x: auto;
`;

const CartSummaryWrapper = styled.div`
  flex: 1;
  max-width: 80.5%;
  position: sticky;
  top: 20px;

  @media (max-width: ${breakpoints.md}) {
    max-width: 100%;
  }
`;

interface CartItem {
  id: number;
  bookId: number;
  quantity: number;
}

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  const [userDetail, setUserDetail] = useState<UserDetail>(new UserDetail());

  const checkLoginStatus = async () => {
    try {
      const resp = await AuthService.getInstance().getInfo();
      if (resp === null) {
        setIsLoggedIn(false);
        navigate("/login");
      } else {
        setIsLoggedIn(true);
        fetchCartItems();
        setUserDetail(resp.data);
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái đăng nhập", error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await CartService.getInstance().getCart();
      const cartItems = response.data;

      if (!Array.isArray(cartItems)) {
        throw new Error("Danh sách sản phẩm trong giỏ hàng không hợp lệ");
      }

      const cartItemsWithDetails = await Promise.all(
        cartItems.map(async (item: CartItem) => {
          if (!item.bookId) {
            console.error("Thiếu ID sách cho mục:", item);
            return { ...item, bookTitle: "Không xác định", bookPrice: 0 };
          }

          try {
            const bookDetails = await CartService.getInstance().getBookById(
              item.bookId
            );
            return {
              ...item,
              bookTitle: bookDetails.title,
              bookPrice: bookDetails.price,
            };
          } catch (error) {
            console.error(
              "Lỗi khi lấy thông tin sách cho bookId:",
              item.bookId,
              error
            );
            return { ...item, bookTitle: "Không xác định", bookPrice: 0 };
          }
        })
      );

      setCartItems(cartItemsWithDetails);
      updateTotals(cartItemsWithDetails);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin sản phẩm trong giỏ hàng", error);
    }
  };

  const updateTotals = (items: any[]) => {
    const total = items.reduce((acc, item) => acc + item.quantity, 0);
    const price = items.reduce(
      (acc, item) => acc + item.bookPrice * item.quantity,
      0
    );
    setTotalProducts(total);
    setTotalPrice(price);
  };

  const handleQuantityUpdate = async (id: number, quantity: number) => {
    try {
      await CartService.getInstance().updateBookQuantity(id, quantity);
      fetchCartItems();
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng", error);
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      await CartService.getInstance().removeBookFromCart(id);
      fetchCartItems();
    } catch (error) {
      console.error("Lỗi khi xóa mục", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await CartService.getInstance().clearCart();
      fetchCartItems();
    } catch (error) {
      console.error("Lỗi khi xóa giỏ hàng", error);
    }
  };

  const handleOrder = async () => {
    if (!isLoggedIn) {
      console.error("Bạn chưa đăng nhập");
      toast.error("Bạn cần phải đăng nhập để đặt hàng");
      return;
    }
  
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn xác nhận muốn đặt hàng?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#89B449",
      cancelButtonColor: "#E68A8C",
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const now = new Date();
        const currentISO = now.toISOString();
        const newOrder: CheckoutDTO = {
          id: 0,
          user: { userUid: userDetail.userUid, username: "", fullName: userDetail.fullName, email: "", dob: "", className: "", phone: "", address: "", avatar: "", cre_dt: "", isActive: ""},
          userUid: userDetail.userUid ?? 0,
          userFullName: userDetail.fullName ?? "",
          startTime: currentISO,
          endTime: currentISO,
          status: CheckoutStatus.REQUESTED,
          checkoutDetails: [],
          expiredTime: "",
          fine: 0,
        };
  
        try {
          const orderResponse = await addCheckout(newOrder);
          const orderId = orderResponse.id;
  
          const detailPromises = cartItems.map(async (item) => {
            const newDetail: CheckoutDetailDTO = {
              id: 0,
              bookId: item.bookId,
              bookTitle: item.bookTitle,
              cate_id: item.cate_id,
              categoryName: item.categoryName,
              quantity: item.quantity,
              checkoutId: orderId,
            };
  
            try {
              await CheckoutDetailService.add(orderId, newDetail);
            } catch (error) {
              console.error("Lỗi khi thêm chi tiết đặt hàng", error);
              toast.error("Lỗi khi thêm một số chi tiết");
            }
          });
  
          await Promise.all(detailPromises);
          fetchCartItems();
          await handleClearCart();
        } catch (error) {
          console.error("Lỗi khi thêm đơn đặt hàng", error);
          toast.error("Lỗi khi thêm đơn đặt hàng");
        }
      }
    });
  };

  const breadcrumbItems = [
    { label: "Trang chủ", link: "/" },
    { label: "Đơn hàng", link: "" },
  ];

  return (
    <CartPageWrapper>
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        {isLoggedIn ? (
          <>
            <CartTableWrapper>
              <CartTable
                cartItems={cartItems}
                onUpdateQuantity={handleQuantityUpdate}
                onRemoveItem={handleRemoveItem}
              />
            </CartTableWrapper>
            <CartSummaryWrapper>
              <CartSummary
                totalProducts={totalProducts}
                totalPrice={totalPrice}
                onOrder={handleOrder}
              />
            </CartSummaryWrapper>
          </>
        ) : (
          <div>
            <p>
              Bạn chưa đăng nhập. --<a href="/login">Đăng nhập</a>--
            </p>
          </div>
        )}
      </Container>
    </CartPageWrapper>
  );
};

export default CartScreen;
