import React, { useState } from 'react';
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

const DateInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DateInputLabel = styled.label`
  font-weight: bold;
`;

const DateInput = styled.input`
  padding: 10px;
  border: 1px solid ${defaultTheme.color_platinum};
  border-radius: 4px;
  width: 100%;
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.875rem;
  margin-top: 5px;
`;

const CartSummary = ({
  totalProducts,
  totalPrice,
  onOrder,
}: {
  totalProducts: number;
  totalPrice: number;
  onOrder: (expiredTime: string) => void;
}) => {
  const [expiredTime, setExpiredTime] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleExpiredTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpiredTime(event.target.value);
  };

  const handleOrderClick = () => {
    if (expiredTime) {
      const localDateTime = `${expiredTime}T00:00:00`;
      setError('');
      onOrder(localDateTime);
    } else {
      setError('Ngày hết hạn không được để trống.');
    }
  };

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
        <DateInputWrapper>
        <DateInputLabel>
          Ngày hết hạn <span className="text-danger">(*)</span>
        </DateInputLabel>
        <DateInput
          type="date"
          value={expiredTime}
          onChange={handleExpiredTimeChange}
          placeholder="dd/mm/yyyy"
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </DateInputWrapper>
      </SummaryContent>
      <OrderButtonWrapper>
        <OrderButton onClick={handleOrderClick}>Tạo yêu cầu</OrderButton>
      </OrderButtonWrapper>
    </SummaryWrapper>
  );
};

export default CartSummary;
