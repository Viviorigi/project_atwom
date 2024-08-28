import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { BaseLinkGreen } from '../../styles/button';
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { currencyFormat } from "../../utils/helper";
import { deleteCheckout, getCheckoutById, getCheckoutDetailsByCheckoutId, rejectCheckout } from '../../services/CheckoutService';
import { CheckoutDTO, CheckoutDetailDTO } from '../../model/checkout/CheckoutDTO';
import { BookDTO } from '../../model/book/BookDTO';
import { CategoryDTO } from '../../model/book/CategoryDTO';
import { getBookById, getCategoryByBookId } from '../../services/BookService';
import defaultimage from '../../../assets/images/imageBookDefault.png';

const BaseLinkRed = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  // Add more styles as needed
`;

const BaseLinkDelete = styled.button`
  background-color: darkgray;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  // Add more styles as needed
`;

const OrderItemWrapper = styled.div`
  margin: 30px 0;
  border-bottom: 1px solid ${defaultTheme.color_anti_flash_white};

  .order-item-title {
    margin-bottom: 12px;
  }

  .order-item-details {
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 24px 32px;
    border-radius: 8px;

    @media (max-width: ${breakpoints.sm}) {
      padding: 20px 24px;
    }

    @media (max-width: ${breakpoints.xs}) {
      padding: 12px 16px;
    }
  }

  .order-info-group {
    display: flex;
    flex-wrap: wrap;

    @media (max-width: ${breakpoints.sm}) {
      flex-direction: column;
    }
  }

  .order-info-item {
    width: 50%;

    span {
      &:nth-child(2) {
        margin-left: 4px;
      }
    }

    &:nth-child(even) {
      text-align: right;

      @media (max-width: ${breakpoints.lg}) {
        text-align: left;
      }
    }

    @media (max-width: ${breakpoints.sm}) {
      width: 100%;
      margin: 2px 0;
    }
  }

  .order-overview {
    display: flex;
    justify-content: space-between;  // Space between info and button
    align-items: center;  // Align items vertically
    margin: 28px 0;
    gap: 12px;

    @media (max-width: ${breakpoints.lg}) {
      margin: 20px 0;
    }

    @media (max-width: ${breakpoints.sm}) {
      flex-direction: column;
    }

    &-img {
      width: 100px;
      height: 100px;
      border-radius: 6px;
      overflow: hidden;
    }

    &-content {
      display: flex;
      flex-direction: column;
      text-align: left;
      flex-grow: 1;  // Allow content to grow and take available space
    }

    &-info {
      ul {
        margin: 0;
        padding: 0;
        list-style-type: none;

        li {
          margin-bottom: 8px;
          font-size: 16px;

          span {
            &:nth-child(2) {
              margin-left: 4px;
              color: ${defaultTheme.color_silver};
            }
          }
        }
      }
    }

    &-button {
      display: flex;
      gap: 12px; // Space between buttons
      margin-left: auto; // Pushes buttons to the right
    }
  }
`;

interface OrderItemProps {
  checkoutId: number;
  onRefresh: () => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ checkoutId, onRefresh }) => {
  const [checkout, setCheckout] = useState<CheckoutDTO | null>(null);
  const [details, setDetails] = useState<CheckoutDetailDTO[]>([]);
  const [book, setBook] = useState<BookDTO | null>(null);
  const [category, setCategory] = useState<CategoryDTO | null>(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const checkoutData = await getCheckoutById(checkoutId);
        setCheckout(checkoutData);

        const detailsData = await getCheckoutDetailsByCheckoutId(checkoutId);
        if (detailsData.length > 0) {
          const bookId = detailsData[0].bookId;
          const bookData = await getBookById(bookId);
          setBook(bookData);

          const categoryData = await getCategoryByBookId(bookId);
          setCategory(categoryData);
        }
        setDetails(detailsData);
      } catch (error) {
        console.error('Error fetching checkout or details:', error);
      }
    };

    fetchCheckoutData();
  }, [checkoutId]);

  if (!checkout) return <p>Bạn hiện chưa có đơn hàng nào.</p>;

  if (details.length === 0) {
    return (
      <OrderItemWrapper>
        <div className="order-item-details">
          <h3 className="order-item-title">Mã đơn: {checkoutId}</h3>
          <div className="order-info-group">
            <div className="order-info-item">
              <span className="text-gray font-semibold">Ngày tạo đơn:</span>
              <span className="text-silver">{new Date(checkout.startTime).toLocaleDateString()}</span>
            </div>
            <div className="order-info-item">
              <span className="text-gray font-semibold">Trạng thái đơn hàng:</span>
              <span className="text-silver">{checkout.status}</span>
            </div>
          </div>
          <p>Đơn hàng trống.</p>
        </div>
      </OrderItemWrapper>
    );
  }

  const { startTime, status } = checkout;
  const quantity = details[0].quantity;

  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      if (checkout && (checkout.status === 'REQUESTED' || checkout.status === 'APPROVED')) {
        try {
          await rejectCheckout(checkoutId);
          const updatedCheckout = await getCheckoutById(checkoutId);
          setCheckout(updatedCheckout);
          onRefresh();
        } catch (error) {
          console.error('Error rejecting checkout:', error);
        }
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      if (checkout && (checkout.status === 'REQUESTED' || checkout.status === 'APPROVED' || checkout.status === 'REJECTED' || checkout.status === 'RETURNED')) {
        try {
          await deleteCheckout(checkoutId);
          onRefresh();
        } catch (error) {
          console.error('Error deleting checkout:', error);
        }
      }
    }
  };

  return (
    <OrderItemWrapper>
      <div className="order-item-details">
        <h3 className="order-item-title">Mã đơn: {checkoutId}</h3>
        <div className="order-info-group">
          <div className="order-info-item">
            <span className="text-gray font-semibold">Ngày tạo đơn:</span>
            <span className="text-black">{new Date(startTime).toLocaleDateString()}</span>
          </div>
          <div className="order-info-item">
            <span className="text-gray font-semibold">Trạng thái đơn hàng:</span>
            <span className="text-black">{status}</span>
          </div>
        </div>
      </div>
      <div className="order-overview">
        <div className="order-overview-img">
          <img className="rounded-circle" src={book?.image ? process.env.REACT_APP_API_URL + `/getImage?atchFleSeqNm=${book?.image}` : defaultimage} alt="PersonAvatar" onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = defaultimage;
          }} />
        </div>
        <div className="order-overview-content">
          <div className="order-overview-info">
            <h4 className="text-xl">{book?.title}</h4>
            <ul>
              <li className="font-semibold text-base">
                <span>Danh mục:</span>
                <span className="text-black">{category?.name}</span>
              </li>
              <li className="font-semibold text-base">
                <span>Số lượng:</span>
                <span className="text-black">{quantity}</span>
              </li>
            </ul>
            {details.length > 0 && (
              <BaseLinkGreen to={`/order_detail/${checkoutId}`}>Xem chi tiết</BaseLinkGreen>
            )}
          </div>
          <div className="order-overview-button">
            {(status === 'REQUESTED' || status === 'APPROVED') && (
              <BaseLinkRed onClick={handleCancel}>Hủy</BaseLinkRed>
            )}
            {(status === 'REQUESTED' || status === 'APPROVED' || status === 'REJECTED' || status === 'RETURNED') && (
              <BaseLinkDelete onClick={handleDelete}>Xóa</BaseLinkDelete>
            )}
          </div>
        </div>
      </div>
    </OrderItemWrapper>
  );
};

export default OrderItem;
