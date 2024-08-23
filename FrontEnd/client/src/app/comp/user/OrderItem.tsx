import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { BaseLinkGreen } from "../../styles/button";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { currencyFormat } from "../../utils/helper";
import { getCheckoutById, getCheckoutDetailsByCheckoutId } from '../../services/CheckoutService';
import { CheckoutDTO, CheckoutDetailDTO } from '../../model/checkout/CheckoutDTO';
import { BookDTO } from '../../model/book/BookDTO';
import { CategoryDTO } from '../../model/book/CategoryDTO';
import { getBookById, getCategoryByBookId } from '../../services/BookService';
import defaultimage from '../../../assets/images/imageBookDefault.png';


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
      margin-left: 20px;
    }
  }
`;



interface OrderItemProps {
  checkoutId: number;
}

const OrderItem: React.FC<OrderItemProps> = ({ checkoutId }) => {
  const [checkout, setCheckout] = useState<CheckoutDTO | null>(null);
  const [details, setDetails] = useState<CheckoutDetailDTO[]>([]);
  const [book, setBook] = useState<BookDTO | null>(null);
  const [category, setCategory] = useState<CategoryDTO | null>(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const seenIds = new Set<number>();

      try {
        const checkoutData = await getCheckoutById(checkoutId);
        if (seenIds.has(checkoutData.id)) return;
        seenIds.add(checkoutData.id);
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
  }, []);

  if (!checkout) return <p>You have no checkout.</p>;

  if (details.length === 0) {
    return (
      <OrderItemWrapper>
        <div className="order-item-details">
          <h3 className="order-item-title">Order no: {checkoutId}</h3>
          <div className="order-info-group">
            <div className="order-info-item">
              <span className="text-gray font-semibold">Order Date:</span>
              <span className="text-silver">{new Date(checkout.startTime).toLocaleDateString()}</span>
            </div>
            <div className="order-info-item">
              <span className="text-gray font-semibold">Order Status:</span>
              <span className="text-silver">{checkout.status}</span>
            </div>
          </div>
          <p>No details available</p>
        </div>
      </OrderItemWrapper>
    );
  }

  const { startTime, status } = checkout;
  const quantity = details[0].quantity;
  const totalPrice = quantity * (book?.price || 0);

  return (
    <OrderItemWrapper>
      <div className="order-item-details">
        <h3 className="order-item-title">Order no: {checkoutId}</h3>
        <div className="order-info-group">
          <div className="order-info-item">
            <span className="text-gray font-semibold">Order Date:</span>
            <span className="text-silver">{new Date(startTime).toLocaleDateString()}</span>
          </div>
          <div className="order-info-item">
            <span className="text-gray font-semibold">Order Status:</span>
            <span className="text-silver">{status}</span>
          </div>
        </div>
      </div>
      <div className="order-overview">
        <div className="order-overview-img">
          <img src={defaultimage || ''} alt={book?.title} className="object-fit-cover" />
        </div>
        <div className="order-overview-content">
          <div className="order-overview-info">
            <h4 className="text-xl">{book?.title}</h4>
            <ul>
              <li className="font-semibold text-base">
                <span>Category:</span>
                <span className="text-silver">{category?.name}</span>
              </li>
              <li className="font-semibold text-base">
                <span>Qty:</span>
                <span className="text-silver">{quantity}</span>
              </li>
              <li className="font-semibold text-base">
                <span>Total:</span>
                <span className="text-silver">{currencyFormat(totalPrice)}</span>
              </li>
            </ul>
          </div>
        </div>
        {details.length > 0 && <BaseLinkGreen to={`/order_detail/${checkoutId}`}>View Detail</BaseLinkGreen>}
      </div>
    </OrderItemWrapper>
  );
};

export default OrderItem;
