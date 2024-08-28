import styled from "styled-components";
import { Container } from "../../styles/styles";
import { product_one } from "../../data/data";
import { Link, useLocation } from "react-router-dom";
import { BaseLinkGreen } from "../../styles/button";
import { currencyFormat } from "../../utils/helper";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import Breadcrumb from "../../comp/common/Breadcrumb";
import BookPreview from "../../comp/book/BookPreview";
import BookServices from "../../comp/book/BookService";
import BookSimilar from "../../comp/book/BookSimilar";
import BookDescriptionTab from "../../comp/book/BookDescriptionTab";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookDTO } from "../../model/BookDTO";
import imageBookDefault from "../../../assets/images/imageBookDefault.png";
import { formatCurrency, formatDate } from "../../utils/FunctionUtils";
import Cookies from "universal-cookie";
import { AuthConstant } from "../../constants/authConstant";
import { WishService } from "../../services/WishListService";
import { toast } from "react-toastify";
import { CartService } from "../../services/CartService";
import QuickBorrowDialog from './QuickBorrowDialog';
import { AuthService } from "../../services/AuthService";
import { UserDetail } from "../../model/auth/UserDetail";

const DetailsScreenWrapper = styled.main`
  margin: 40px 0;
`;

const DetailsContent = styled.div`
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;

  @media (max-width: ${breakpoints.xl}) {
    gap: 24px;
    grid-template-columns: 3fr 2fr;
  }

  @media (max-width: ${breakpoints.lg}) {
    grid-template-columns: 100%;
  }
`;

const BookDetailsWrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 24px;

  @media (max-width: ${breakpoints.sm}) {
    padding: 16px;
  }

  @media (max-width: ${breakpoints.xs}) {
    padding: 12px;
  }

  .prod-title {
    margin-bottom: 10px;
  }
  .rating-and-comments {
    column-gap: 16px;
    margin-bottom: 20px;
  }
  .prod-rating {
    column-gap: 10px;
  }
  .prod-comments {
    column-gap: 10px;
  }

  .prod-add-btn {
  background-color: green;
  color: white;
  padding: 7px 20px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

  .btn-quick-borrow {
  background-color: green;
  color: white;
  min-width: 160px;
    column-gap: 8px;
    &-text {
      margin-top: 2px;
    }
  }

  .prod-add-btn {
  background-color: green;
  color: white;
  min-width: 160px;
    column-gap: 8px;
    &-text {
      margin-top: 2px;
    }
  }

  .btn-and-price {
    margin-top: 36px;
    column-gap: 16px;
    row-gap: 10px;

    @media (max-width: ${breakpoints.sm}) {
      margin-top: 24px;
    }
  }
`;

const BookSizeWrapper = styled.div`
  .prod-size-top {
    gap: 20px;
  }
  .prod-size-list {
    gap: 12px;
    margin-top: 16px;
    @media (max-width: ${breakpoints.sm}) {
      gap: 8px;
    }
  }

  .prod-size-item {
    position: relative;
    height: 38px;
    width: 38px;
    cursor: pointer;

    @media (max-width: ${breakpoints.sm}) {
      width: 32px;
      height: 32px;
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 38px;
      height: 38px;
      opacity: 0;
      cursor: pointer;

      @media (max-width: ${breakpoints.sm}) {
        width: 32px;
        height: 32px;
      }

      &:checked + span {
        color: ${defaultTheme.color_white};
        background-color: ${defaultTheme.color_outerspace};
        border-color: ${defaultTheme.color_outerspace};
      }
    }

    span {
      width: 38px;
      height: 38px;
      border-radius: 8px;
      border: 1.5px solid ${defaultTheme.color_silver};
      text-transform: uppercase;

      @media (max-width: ${breakpoints.sm}) {
        width: 32px;
        height: 32px;
      }
    }
  }
`;

const BookColorWrapper = styled.div`
  margin-top: 32px;

  @media (max-width: ${breakpoints.sm}) {
    margin-top: 24px;
  }

  .prod-colors-top {
    margin-bottom: 16px;
  }

  .prod-colors-list {
    column-gap: 12px;
  }

  .prod-colors-item {
    position: relative;
    width: 22px;
    height: 22px;
    transition: ${defaultTheme.default_transition};

    &:hover {
      scale: 0.9;
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 22px;
      height: 22px;
      opacity: 0;
      cursor: pointer;

      &:checked + span {
        outline: 1px solid ${defaultTheme.color_gray};
        outline-offset: 3px;
      }
    }

    .prod-colorbox {
      border-radius: 100%;
      width: 22px;
      height: 22px;
      display: inline-block;
    }
  }
`;

const BookDetail = (props: any) => {
  const [userDetail, setUserDetail] = useState<UserDetail>(new UserDetail());
  const [showQuickBorrowDialog, setShowQuickBorrowDialog] = useState(false);
  const [book, setBook] = useState<BookDTO>();
  // const {bookId} = props;
  // console.log(bookId);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("bookId");
  // console.log(id);
  useEffect(() => {
    // Cuộn lên đầu trang mỗi khi component được render
    window.scrollTo(0, 0);
  }, [book]);

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/book/detail?id=${id}`;
    axios
      .get(url)
      .then((resp: any) => {
        if (resp.data) {
          setBook(resp.data);
        }
      })
      .catch((err: any) => {});
  }, [id]);

  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookie = new Cookies();

  useEffect(() => {
    if (cookie.get(AuthConstant.ACCESS_TOKEN)) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    AuthService.getInstance()
      .getInfo()
      .then((resp: any) => {
        if (resp) {
          setUserDetail(resp.data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user info:", error);
      });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      const savedFavorites = JSON.parse(
        localStorage.getItem("wishtlist") || "[]"
      );
      if (savedFavorites.includes(book?.id)) {
        setIsFavorited(true);
      }
    } else {
      WishService.getInstance()
        .check(book?.id)
        .then((resp) => {
          setIsFavorited(resp.data);
        })
        .catch((err: any) => {
          console.error("Error checking wishlist status", err);
        });
    }
  }, [book, isLoggedIn]);

  const handleFavoriteClick = async () => {
    try {
      if (isLoggedIn) {
        // Handle favorite logic for logged-in users
        if (isFavorited) {
          WishService.getInstance()
            .remove(book?.id)
            .then((resp: any) => {
              toast.success("Xóa khỏi danh sách yêu thích thành công");
              setIsFavorited(false);
            });
        } else {
          WishService.getInstance()
            .add(book?.id)
            .then((resp: any) => {
              toast.success("Thêm vào danh sách yêu thích thành công");
              setIsFavorited(true);
            });
        }
        setIsFavorited(!isFavorited);
      } else {
        const savedFavorites = JSON.parse(
          localStorage.getItem("wishlist") || "[]"
        );
        if (isFavorited) {
          const updatedFavorites = savedFavorites.filter(
            (item: any) => item.id !== book?.id
          );
          localStorage.setItem("wishlist", JSON.stringify(updatedFavorites));
          toast.success("Xóa khỏi danh sách yêu thích thành công");
          setIsFavorited(false);
        } else {
          const bookDetails = {
            id: book?.id,
            title: book?.title,
            publisher: book?.publisher,
            publicationYear: book?.publicationYear,
            image: book?.image,
          };
          savedFavorites.push(bookDetails);
          toast.success("Thêm vào danh sách yêu thích thành công");
          localStorage.setItem("wishlist", JSON.stringify(savedFavorites));
          setIsFavorited(true);
        }
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  const handleBorrowClick = async () => {
    if (!book || book.id === undefined) return;
    
    try {
      const quantity = 1;
  
      const cartResponse = await CartService.getInstance().getCart();

      const cartItems = cartResponse.data || [];
  
      const itemExists = cartItems.some((item: any) => item.bookId === book.id);
  
      if (itemExists) {
        toast.error("Quyển sách này đã có trong giỏ hàng");
      } else {
        await CartService.getInstance().addBookToCart(book.id, quantity);
        toast.success("Thêm vào giỏ hàng thành công");
      }
    } catch (error) {
      console.error("Error adding book to cart", error);
      toast.error("Lỗi khi thêm vào giỏ hàng");
    }
  };

  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`text-yellow ${
        index < Math.floor(product_one.rating)
          ? "bi bi-star-fill"
          : index + 0.5 === product_one.rating
          ? "bi bi-star-half"
          : "bi bi-star"
      }`}
    ></span>
  ));

  const breadcrumbItems = [
    { label: "Trang chủ", link: "/home" },
    { label: "Danh sách sách", link: "/book" },
    { label: "Chi tiết", link: `${location.pathname}?id=${id}` },
  ];

  return (
    <DetailsScreenWrapper>
      {/* <h2>Mô tả book</h2> */}
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <DetailsContent className="grid">
          <BookPreview previewImages={book?.imagebooks} image={book?.image} />
          {/* <BookPreview previewImages={book?.image} /> */}
          {/* <img
            // className="object-fit-cover"
            src={book?.image ? `${process.env.REACT_APP_API_URL}/getImage?atchFleSeqNm=${book?.image}` : imageBookDefault} onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop in case fallback image also fails
              target.src = imageBookDefault; // Set the fallback image
            }}
            alt=""
            width="500px"
            height="600px"
          /> */}
          <BookDetailsWrapper>
            <div className="container mt-4">
              <h2 className="text-dark mb-4">{book?.title}</h2>
              <div
                className="mb-3"
                style={{ display: "flex", alignItems: "center" }}
              >
                <p
                  style={{
                    margin: "0",
                    fontSize: "15px",
                    marginRight: "1rem",
                    color: "#4A4E52",
                    fontWeight: "normal",
                  }}
                >
                  Loại tài liệu:
                </p>
                <p
                  style={{
                    margin: "0",
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "#4A4E52",
                  }}
                >
                  {book?.cateName}
                </p>
              </div>
              <div
                className="mb-3"
                style={{ display: "flex", alignItems: "center" }}
              >
                <p
                  style={{
                    margin: "0",
                    fontSize: "15px",
                    marginRight: "1rem",
                    color: "#4A4E52",
                    fontWeight: "normal",
                  }}
                >
                  Tác giả:
                </p>
                <p
                  style={{
                    margin: "0",
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "#4A4E52",
                  }}
                >
                  {book?.publisher}
                </p>
              </div>
              <div
                className="mb-3"
                style={{ display: "flex", alignItems: "center" }}
              >
                <p
                  style={{
                    margin: "0",
                    fontSize: "15px",
                    marginRight: "1rem",
                    color: "#4A4E52",
                    fontWeight: "normal",
                  }}
                >
                  Năm xuất bản:
                </p>
                <p
                  style={{
                    margin: "0",
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "#4A4E52",
                  }}
                >
                  {book?.publicationYear}
                </p>
              </div>

              <div
                className="mb-3"
                style={{ display: "flex", alignItems: "center" }}
              >
                <p
                  style={{
                    margin: "0",
                    fontSize: "15px",
                    marginRight: "1rem",
                    color: "#4A4E52",
                    fontWeight: "normal",
                  }}
                >
                  Giá:
                </p>
                <p
                  style={{
                    margin: "0",
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "#4A4E52",
                  }}
                >
                  {book?.price ? formatCurrency(book?.price) : 0}
                </p>
              </div>
            </div>

            {/* Giá tiền-------------------------------------------------- */}
            <div className="btn-and-price flex items-center flex-wrap">
              <button
                onClick={handleBorrowClick}
                className="prod-add-btn"
              >
                Thêm vào giỏ hàng
              </button>
              <button
                className={`btn ${isFavorited ? "btn-danger" : "btn-success"}`}
                onClick={handleFavoriteClick}
              >
                {isFavorited ? "Xóa khỏi danh sách yêu thích " : "Thêm vào danh sách yêu thích "}
                {isFavorited ? (
                  <i className="fa-solid fa-heart"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </button>
            </div>
            <div className="btn-and-price flex items-center flex-wrap">
              <button onClick={() => setShowQuickBorrowDialog(true)} className="btn btn-quick-borrow">
                Mượn nhanh
              </button>
            </div>
            <BookServices />
          </BookDetailsWrapper>
          {/* <BookDetailsWrapper>
            <h2 className="prod-title">{product_one.title}</h2>
            <div className="flex items-center rating-and-comments flex-wrap">
              <div className="prod-rating flex items-center">
                {stars}
                <span className="text-gray text-xs">{product_one.rating}</span>
              </div>
              <div className="prod-comments flex items-start">
                <span className="prod-comment-icon text-gray">
                  <i className="bi bi-chat-left-text"></i>
                </span>
                <span className="prod-comment-text text-sm text-gray">
                  {product_one.comments_count} comment(s)
                </span>
              </div>
            </div>

            <BookSizeWrapper>
              <div className="prod-size-top flex items-center flex-wrap">
                <p className="text-lg font-semibold text-outerspace">
                  Select size
                </p>
                <Link to="/" className="text-lg text-gray font-medium">
                  Size Guide &nbsp; <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
              <div className="prod-size-list flex items-center">
                {product_one.sizes.map((size:any, index:any) => (
                  <div className="prod-size-item" key={index}>
                    <input type="radio" name="size" aria-label="d"/>
                    <span className="flex items-center justify-center font-medium text-outerspace text-sm">
                      {size}
                    </span>
                  </div>
                ))}
              </div>
            </BookSizeWrapper>
            <BookColorWrapper>
              <div className="prod-colors-top flex items-center flex-wrap">
                <p className="text-lg font-semibold text-outerspace">
                  Colours Available
                </p>
              </div>
              <div className="prod-colors-list flex items-center">
                {product_one?.colors?.map((color:any, index:any) => (
                  <div className="prod-colors-item" key={index}>
                    <input type="radio" name="colors" aria-label="d" />
                    <span
                      className="prod-colorbox"
                      style={{ background: `${color}` }}
                    ></span>
                  </div>
                ))}
              </div>
            </BookColorWrapper>
            <div className="btn-and-price flex items-center flex-wrap">
              <BaseLinkGreen
                to="/cart"
                as={BaseLinkGreen}
                className="prod-add-btn"
              >
                <span className="prod-add-btn-icon">
                  <i className="bi bi-cart2"></i>
                </span>
                <span className="prod-add-btn-text">Add to cart</span>
              </BaseLinkGreen>
              <span className="prod-price text-xl font-bold text-outerspace">
                {currencyFormat(product_one.price)}
              </span>
            </div>
            <BookServices />
          </BookDetailsWrapper> */}
        </DetailsContent>
        <BookDescriptionTab book={book} />

        <BookSimilar />
      </Container>
      <QuickBorrowDialog
        visible={showQuickBorrowDialog}
        onHide={() => setShowQuickBorrowDialog(false)}
        book = {book}
        userDetail={userDetail}
        isLoggedIn={isLoggedIn}
        cateid={book?.cateId}
        catename={book?.cateName}
      />
    </DetailsScreenWrapper>
  );
};

export default BookDetail;
