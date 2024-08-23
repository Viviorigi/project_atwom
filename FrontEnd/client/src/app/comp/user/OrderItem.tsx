import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BaseLinkGreen } from "../../styles/button";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { currencyFormat } from "../../utils/helper";
import { CheckoutDTO } from '../../model/checkout/CheckoutDTO';
import { CheckoutDetailDTO } from '../../model/checkout/CheckoutDTO';
import { BookDTO } from '../../model/book/BookDTO';
import { CategoryDTO } from '../../model/book/CategoryDTO';
import { getBookById, getCategoryByBookId } from '../../services/BookService';
import { getUserInfo } from '../../services/UserService';

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
    justify-content: space-between;
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
      display: grid;
      grid-template-columns: 100px auto;
      gap: 18px;
    }

    &-info {
      ul {
        span {
          &:nth-child(2) {
            margin-left: 4px;
          }
        }
      }
    }
  }
`;

interface OrderItemProps {
  checkout: CheckoutDTO;
}

const OrderItem: React.FC<OrderItemProps> = ({ checkout }) => {
  const { id, startTime, status, checkoutDetails } = checkout;

  const [book, setBook] = useState<BookDTO | null>(null);
  const [category, setCategory] = useState<CategoryDTO | null>(null);

  useEffect(() => {
    if (checkoutDetails && checkoutDetails.length > 0) {
      const checkoutDetail = checkoutDetails[0] as CheckoutDetailDTO;
      const { bookId } = checkoutDetail;

      getBookById(bookId).then(bookData => setBook(bookData));

      if (bookId) {
        getCategoryByBookId(bookId).then(categoryData => setCategory(categoryData));
      }
    }
  }, [checkoutDetails]);

  if (!checkoutDetails || checkoutDetails.length === 0 || !book || !category) {
    return <p>No details available</p>;
  }

  const checkoutDetail = checkoutDetails[0] as CheckoutDetailDTO;
  const { quantity } = checkoutDetail;

  const totalPrice = quantity * (book.price || 0);

  return (
    <OrderItemWrapper>
      <div className="order-item-details">
        <h3 className="text-x order-item-title">Order no: {id}</h3>
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
        <div className="order-overview-content">
          <div className="order-overview-img">
            <img src={book.image || 'http://example.com/image.jpg'} alt={book.title} className="object-fit-cover" />
          </div>
          <div className="order-overview-info">
            <h4 className="text-xl">{book.title}</h4>
            <ul>
              <li className="font-semibold text-base">
                <span>Category:</span>
                <span className="text-silver">{category.name}</span>
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
        <BaseLinkGreen to={`/order_detail/${id}`}>View Detail</BaseLinkGreen>
      </div>
    </OrderItemWrapper>
  );
};

export default OrderItem;
