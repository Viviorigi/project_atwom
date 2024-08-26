import React from 'react';
import styled from 'styled-components';
import { breakpoints, defaultTheme } from '../../styles/themes/default';

const SummaryWrapper = styled.div`
  border: 1px solid ${defaultTheme.color_platinum};
  padding: 20px;
  background: ${defaultTheme.color_white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  flex: 1;
  position: sticky;
  top: 20px;

  @media (max-width: ${breakpoints.md}) {
    max-width: 100%;
  }
`;

const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const SummaryLabel = styled.span`
  font-weight: bold;
`;

const SummaryValue = styled.span`
  font-weight: normal;
`;

const OrderButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end; /* Align button to the right */
  margin-top: 20px;
`;

const OrderButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CartSummary = ({
  totalProducts,
  totalPrice,
  onOrder,
}: {
  totalProducts: number;
  totalPrice: number;
  onOrder: () => void;
}) => {
  return (
    <SummaryWrapper>
      <SummaryContent>
        <SummaryItem>
          <SummaryLabel>Tổng số sản phẩm:</SummaryLabel>
          <SummaryValue>{totalProducts}</SummaryValue>
        </SummaryItem>
        {/* <SummaryItem>
          <SummaryLabel>Tổng tiền đơn hàng:</SummaryLabel>
          <SummaryValue>{totalPrice.toFixed(2)}đ</SummaryValue>
        </SummaryItem> */}
      </SummaryContent>
      <OrderButtonWrapper>
        <OrderButton onClick={onOrder}>Tạo yêu cầu</OrderButton>
      </OrderButtonWrapper>
    </SummaryWrapper>
  );
};

export default CartSummary;
