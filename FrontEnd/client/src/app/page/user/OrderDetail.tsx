import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Container } from "../../styles/styles";
import { UserContent, UserDashboardWrapper } from "../../styles/user";
import Breadcrumb from "../../comp/common/Breadcrumb";
import UserMenu from "../../comp/user/UserMenu";
import Title from "../../comp/common/Title";
import {
  getCheckoutById,
  getCheckoutDetailsByCheckoutId,
} from "../../services/CheckoutService";
import { getBookById, getCategoryByBookId } from "../../services/BookService";
import {
  CheckoutDTO,
  CheckoutDetailDTO,
} from "../../model/checkout/CheckoutDTO";
import { BookDTO } from "../../model/book/BookDTO";
import { CategoryDTO } from "../../model/book/CategoryDTO";
import { currencyFormat } from "../../utils/helper";
import defaultimage from "../../../assets/images/imageBookDefault.png";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { Link } from "react-router-dom";


const OrderDetailScreenWrapper = styled.main`
  .btn-and-title-wrapper {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      margin-bottom: 0;
    }

    .btn-go-back {
      margin-right: 12px;
      transition: ${defaultTheme.default_transition};

      &:hover {
        margin-right: 16px;
      }
    }
  }

  .order-d-top {
    background-color: ${defaultTheme.color_whitesmoke};
    padding: 26px 32px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: ${breakpoints.sm}) {
      flex-direction: column;
      row-gap: 12px;
    }
  }
`;

const OrderDetailStatusWrapper = styled.div`
  margin: 0 36px;
  @media (max-width: ${breakpoints.sm}) {
    margin: 0 10px;
    overflow-x: scroll;
  }

  .order-status {
    height: 4px;
    margin: 50px 0;
    max-width: 580px;
    width: 340px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    margin-bottom: 70px;

    @media (max-width: ${breakpoints.sm}) {
      margin-right: 40px;
      margin-left: 40px;
    }

    &-dot {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      &:nth-child(1) {
        left: 0;
      }

      &:nth-child(2) {
        left: calc(33.3333% - 10px);
      }

      &:nth-child(3) {
        left: calc(66.6666% - 10px);
      }
      &:nth-child(4) {
        right: 0;
      }

      &.status-done {
        background-color: ${defaultTheme.color_outerspace};
        .order-status-text {
          color: ${defaultTheme.color_outerspace};
        }
      }

      &.status-current {
        position: absolute;
        &::after {
          content: "";
          position: absolute;
          width: 12px;
          height: 12px;
          background-color: ${defaultTheme.color_outerspace};
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 30;
          border-radius: 50%;
        }

        .order-status-text {
          color: ${defaultTheme.color_outerspace};
        }
      }
    }

    &-text {
      position: absolute;
      top: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const OrderDetailMessageWrapper = styled.div`
  background-color: ${defaultTheme.color_whitesmoke};
  max-width: 748px;
  margin-right: auto;
  margin-left: auto;
  min-height: 68px;
  padding: 16px 24px;
  border-radius: 8px;
  position: relative;
  margin-top: 80px;

  &::after {
    content: "";
    position: absolute;
    top: -34px;
    left: 20%;
    border-bottom: 22px solid ${defaultTheme.color_whitesmoke};
    border-top: 18px solid transparent;
    border-left: 18px solid transparent;
    border-right: 18px solid transparent;
  }

  @media (max-width: ${breakpoints.sm}) {
    margin-top: 10px;
  }
`;

const OrderDetailListWrapper = styled.div`
  padding: 24px;
  margin-top: 40px;
  border: 1px solid rgba(0, 0, 0, 0.05);

  @media (max-width: ${breakpoints.md}) {
    padding: 18px;
  }

  @media (max-width: ${breakpoints.md}) {
    padding: 12px;
  }

  .order-d-item {
    grid-template-columns: 80px 1fr 1fr 32px;
    gap: 20px;
    padding: 12px 0;
    border-bottom: 1px solid ${defaultTheme.color_whitesmoke};
    position: relative;

    @media (max-width: ${breakpoints.xl}) {
      grid-template-columns: 80px 3fr 2fr 32px;
      padding: 16px 0;
      gap: 16px;
    }

    @media (max-width: ${breakpoints.sm}) {
      grid-template-columns: 50px 3fr 2fr;
      gap: 16px;
    }

    @media (max-width: ${breakpoints.xs}) {
      grid-template-columns: 100%;
      gap: 12px;
    }

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }

    &-img {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

      @media (max-width: ${breakpoints.sm}) {
        width: 50px;
        height: 50px;
      }

      @media (max-width: ${breakpoints.sm}) {
        width: 100%;
        height: 100%;
      }
    }

    &-calc {
      p {
        display: inline-block;
        margin-right: 50px;

        @media (max-width: ${breakpoints.lg}) {
          margin-right: 20px;
        }
      }
    }

    &-btn {
      margin-bottom: auto;
      &:hover {
        color: ${defaultTheme.color_sea_green};
      }

      @media (max-width: ${breakpoints.sm}) {
        position: absolute;
        right: 0;
        top: 10px;
      }

      @media (max-width: ${breakpoints.xs}) {
        width: 28px;
        height: 28px;
        z-index: 5;
        background-color: ${defaultTheme.color_white};
        border-radius: 50%;
        right: 8px;
        top: 24px;
      }
    }
  }
`;

const OrderDetailButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px; /* Adjust the gap as needed */

  .order-overview-button {
    display: flex;
    gap: 12px;

    .btn {
      display: inline-block;
      padding: 8px 16px;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
    }
  }
`;

const breadcrumbItems = [
  { label: "Trang Chủ", link: "/" },
  { label: "Đơn Hàng", link: "/order" },
  { label: "Chi Tiết Đơn Hàng", link: "/order_detail" },
];

const OrderDetail = () => {
  const { orderdetailId } = useParams<{ orderdetailId: string }>();
  const [checkout, setCheckout] = useState<CheckoutDTO | null>(null);
  const [details, setDetails] = useState<CheckoutDetailDTO[]>([]);
  const [books, setBooks] = useState<Map<number, BookDTO>>(new Map());
  const [categories, setCategories] = useState<
    Map<number | undefined, CategoryDTO>
  >(new Map());

  useEffect(() => {
    if (orderdetailId) {
      const fetchOrderDetailData = async () => {
        try {
          const checkoutData = await getCheckoutById(parseInt(orderdetailId));
          setCheckout(checkoutData);

          const detailsData = await getCheckoutDetailsByCheckoutId(
            parseInt(orderdetailId)
          );
          setDetails(detailsData);

          const bookPromises = detailsData.map(async (detail) => {
            if (detail.bookId !== undefined) {
              try {
                const bookData = await getBookById(detail.bookId);
                setBooks((prev) => new Map(prev).set(detail.bookId, bookData));
                return bookData;
              } catch (error) {
                console.error(
                  `Lỗi khi tải sách cho ID sách ${detail.bookId}:`,
                  error
                );
                return null;
              }
            } else {
              console.warn("ID sách trong chi tiết đơn hàng không xác định.");
              return null;
            }
          });

          const booksData = await Promise.all(bookPromises);

          const categoryPromises = booksData.map(async (book) => {
            if (book && book.id !== undefined) {
              try {
                const category = await getCategoryByBookId(book.id);
                setCategories((prev) => new Map(prev).set(book.id, category));
                return category;
              } catch (error) {
                console.error(
                  `Lỗi khi tải danh mục cho ID sách ${book.id}:`,
                  error
                );
                return null;
              }
            } else {
              console.warn("ID sách hiện không xác định, đang bỏ qua việc tải dữ liệu sách.");
              return null;
            }
          });

          await Promise.all(categoryPromises);
        } catch (error) {
          console.error( "Lỗi khi tải dữ liệu chi tiết đơn hàng:", error);
        }
      };

      fetchOrderDetailData();
    }
  }, [orderdetailId]);

  const total = details.reduce((sum, item) => {
    const book = books.get(item.bookId);
    return sum + (book?.price || 0) * item.quantity;
  }, 0);

  return (
    <OrderDetailScreenWrapper className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <div className="flex items-center justify-start btn-and-title-wrapper">
              <Link
                to="/order"
                className="btn-go-back inline-flex items-center justify-center text-xxl"
              >
                <i className="bi bi-chevron-left"></i>
              </Link>
              <Title titleText={"Order Details"} />
            </div>

            <div className="order-d-wrapper">
              <div className="order-d-top flex justify-between items-start">
                <div className="order-d-top-l">
                  <h4 className="text-3xl order-d-no">
                    Đơn số: #{checkout?.id ?? "N/A"}
                  </h4>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium text-black">
                      Ngày tạo đơn: {checkout?.startTime ?? "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-black">
                      Trạng thái: {checkout?.status ?? "N/A"}
                    </p>
                  </div>
                </div>
                {/* <div className="order-d-top-r text-xxl text-gray font-semibold">
                  Total:{" "}
                  <span className="text-outerspace">
                    {currencyFormat(total)}
                  </span>
                </div> */}
              </div>

              <OrderDetailStatusWrapper className="order-d-status">
                {/* Update status dots here */}
              </OrderDetailStatusWrapper>

              <OrderDetailListWrapper className="order-d-list">
                {details.map((item) => {
                  const book = books.get(item.bookId);
                  const category = categories.get(item.bookId);
                  return (
                    <div className="order-d-item grid" key={item.id}>
                      <div className="order-d-item-img">
                      <img className="rounded-circle" src={book?.image ? `http://localhost:8080/getImage?atchFleSeqNm=${book?.image}` : defaultimage} alt="PersonAvatar" onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = defaultimage;
                      }} />
                      </div>
                      <div className="order-d-item-info">
                        <p className="text-xl font-bold">
                          {book?.title ?? "N/A"}
                        </p>
                        <p className="text-md font-bold">
                          Danh mục: &nbsp;
                          <span className="font-medium text-gray">
                            {category?.name ?? "N/A"}
                          </span>
                        </p>
                      </div>
                      <div className="order-d-item-calc">
                        <p className="font-bold text-lg">
                          Số lượng: &nbsp;
                          <span className="text-gray">{item.quantity}</span>
                        </p>
                        {/* <p className="font-bold text-lg">
                          Giá tiền: &nbsp;
                          <span className="text-gray">
                            {currencyFormat(book?.price)}
                          </span>
                        </p> */}
                      </div>
                    </div>
                  );
                })}
              </OrderDetailListWrapper>
            </div>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </OrderDetailScreenWrapper>
  );
};

export default OrderDetail;
