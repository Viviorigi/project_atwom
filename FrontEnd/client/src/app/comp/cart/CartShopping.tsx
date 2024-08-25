import styled from "styled-components";
import { BaseLinkGreen, BaseLinkOutlinePlatinum } from "../../styles/button";
import { breakpoints, defaultTheme } from "../../styles/themes/default";

const CartShoppingWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;

  @media (max-width: ${breakpoints.md}) {
    justify-content: center;
  }
`;

const CartShopping = () => {
  return (
    <CartShoppingWrapper>
      <BaseLinkGreen
        as={BaseLinkOutlinePlatinum}
        to="/book"
        className="contd-shop-btn"
      >
        Tiếp tục mua
      </BaseLinkGreen>
    </CartShoppingWrapper>
  );
};

export default CartShopping;
