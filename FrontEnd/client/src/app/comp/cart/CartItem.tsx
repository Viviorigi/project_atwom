import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CartTableRowWrapper = styled.tr`
  .cart-tbl-prod {
    grid-template-columns: 80px auto;
    column-gap: 12px;

    .cart-prod-info {
      p {
        margin-right: 8px;
        span {
          margin-right: 4px;
        }
      }
    }
  }

  .cart-tbl-qty {
    .qty-inc-btn,
    .qty-dec-btn {
      width: 24px;
      height: 24px;
      border: 1px solid #ccc;
      border-radius: 2px;

      &:hover {
        border-color: #2d9cdb;
        background-color: #2d9cdb;
        color: #fff;
      }
    }

    .qty-value {
      width: 40px;
      height: 24px;
    }
  }

  .cart-tbl-actions {
    .tbl-del-action {
      color: red;
      cursor: pointer;
    }
  }
`;

const CartItem = ({ cartItem }: any) => {
  return (
    <CartTableRowWrapper>
      <td>
        <div className="cart-tbl-prod">
          <div className="cart-prod-info">
            <h4 className="text-base">{cartItem.title}</h4>
            <p className="text-sm text-gray inline-flex">
              <span className="font-semibold">Category: </span> {cartItem.category}
            </p>
            {/* <p className="text-sm text-gray inline-flex">
              <span className="font-semibold">Price: </span> {cartItem.price}
            </p> */}
          </div>
        </div>
      </td>
      {/* <td>
        <span className="text-lg font-bold">{cartItem.price}</span>
      </td> */}
      <td>
        <div className="cart-tbl-qty flex items-center">
          <button className="qty-dec-btn" aria-label="Decrease quantity" onClick={() => cartItem.onDecreaseQuantity(cartItem.id)}>
            -
          </button>
          <span className="qty-value inline-flex items-center justify-center font-medium">{cartItem.quantity}</span>
          <button className="qty-inc-btn" aria-label="Increase quantity" onClick={() => cartItem.onIncreaseQuantity(cartItem.id)}>
            +
          </button>
        </div>
      </td>
      {/* <td>
        <span className="text-lg font-bold">${cartItem.price * cartItem.quantity}</span>
      </td> */}
      <td>
        <div className="cart-tbl-actions flex justify-center">
          <button className="tbl-del-action" onClick={() => cartItem.onRemove(cartItem.id)}>
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </td>
    </CartTableRowWrapper>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    onIncreaseQuantity: PropTypes.func.isRequired,
    onDecreaseQuantity: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  }).isRequired,
};

export default CartItem;
