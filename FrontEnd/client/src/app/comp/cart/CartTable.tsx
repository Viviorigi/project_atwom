import React from 'react';
import styled from 'styled-components';
import CartItem from './CartItem';

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px; /* Margin for spacing */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #f9f9f9;
`;

const TableHeader = styled.thead`
  background-color: #f2f2f2;
  font-weight: bold;
`;

const TableHeaderCell = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const NoItemsMessage = styled.tr`
  td {
    padding: 20px;
    text-align: center;
    color: #555;
    font-size: 16px;
    border: none;
    font-weight: bold;
  }
`;

const CartTable = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: {
  cartItems: Array<{ id: number, bookTitle: string, bookPrice: number, quantity: number, categoryName: string }>;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}) => {
  return (
    <TableWrapper>
      <Table>
        <thead>
          <TableRow>
            <TableHeaderCell>Chi tiết sản phẩm</TableHeaderCell>
            <TableHeaderCell>Giá tiền</TableHeaderCell>
            <TableHeaderCell>Số lượng</TableHeaderCell>
            <TableHeaderCell>Tạm tính</TableHeaderCell>
            <TableHeaderCell>|</TableHeaderCell>
          </TableRow>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <NoItemsMessage>
              <td colSpan={5}>Chưa có sản phẩm nào trong giỏ hàng.</td>
            </NoItemsMessage>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                cartItem={{
                  id: item.id,
                  title: item.bookTitle,
                  category: item.categoryName,
                  price: item.bookPrice,
                  quantity: item.quantity,
                  onIncreaseQuantity: (id) => onUpdateQuantity(id, item.quantity + 1),
                  onDecreaseQuantity: (id) => onUpdateQuantity(id, item.quantity - 1),
                  onRemove: (id) => onRemoveItem(id),
                }}
              />
            ))
          )}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default CartTable;
