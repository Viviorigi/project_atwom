import React from 'react';
import OrderItem from "./OrderItem";
import PropTypes from 'prop-types';
import { CheckoutDTO } from '../../model/checkout/CheckoutDTO';

interface OrderItemListProps {
  orders: CheckoutDTO[];
  filterStatus?: string;
}

const OrderItemList: React.FC<OrderItemListProps> = ({ orders, filterStatus }) => {
  const filteredOrders = filterStatus
    ? orders.filter(order => order.status === filterStatus)
    : orders;

  return (
    <div>
      {filteredOrders.length > 0 ? (
        filteredOrders.map(order => (
          <OrderItem key={order.id} checkout={order} />
        ))
      ) : (
        <p>No orders available</p>
      )}
    </div>
  );
};

OrderItemList.propTypes = {
  orders: PropTypes.array.isRequired,
  filterStatus: PropTypes.string,
};

export default OrderItemList;
