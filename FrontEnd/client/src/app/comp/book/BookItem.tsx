import  PropTypes  from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { commonCardStyles } from "../../styles/card";
import { breakpoints, defaultTheme } from "../../styles/themes/default";

const BookCardWrapper = styled(Link)`
  ${commonCardStyles}
  @media(max-width: ${breakpoints.sm}) {
    padding-left: 0;
    padding-right: 0;
  }

  .product-img {
    height: 393px;
    position: relative;

    @media (max-width: ${breakpoints.sm}) {
      height: 320px;
    }
  }

  .product-wishlist-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border-radius: 100%;

    &:hover {
      background-color: ${defaultTheme.color_yellow};
      color: ${defaultTheme.color_white};
    }
  }
`;

const BookItem = ({ product }:any) => {
  return (
    <BookCardWrapper key={product.id} to="/book/details">
      <div className="product-img">
        <img className="object-fit-cover" src={product.imgSource} alt=""/>
        <button
        aria-label="d"
          type="button"
          className="product-wishlist-icon flex items-center justify-center bg-white"
        >
          <i className="bi bi-heart"></i>
        </button>
      </div>
      <div className="product-info">
        <p className="font-bold">{product.title}</p>
        <div className="flex items-center justify-between text-sm font-medium">
          <span className="text-gray">{product.brand}</span>
          <span className="text-outerspace font-bold">${product.price}</span>
        </div>
      </div>
    </BookCardWrapper>
  );
};

export default BookItem;

BookItem.propTypes = {
  product: PropTypes.object,
};
