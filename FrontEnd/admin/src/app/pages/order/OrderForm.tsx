import React, { useState } from 'react';
import { CheckoutDTO} from '../../model/CheckoutDTO';
import { CheckoutStatus} from '../../model/CheckoutStatus';
import { UserDTO } from '../../model/UserDTO';

interface OrderFormProps {
  order: CheckoutDTO;
  users: UserDTO[];
  onSave: (order: CheckoutDTO) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ order, users, onSave }) => {
  const [currentOrder, setCurrentOrder] = useState<CheckoutDTO>(order);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentOrder(prevState => ({
      ...prevState,
      [name]: name === 'status' ? value as CheckoutStatus : value,
    }));
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const user = users.find(user => user.userUid === parseInt(e.target.value, 10));
    setCurrentOrder(prevState => ({
      ...prevState,
      user: user!,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(currentOrder);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>User</label>
        <select
          className="form-control"
          value={currentOrder.user.userUid}
          onChange={handleUserChange}
          required
        >
          {users.map(user => (
            <option key={user.userUid} value={user.userUid}>
              {user.fullName}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Status</label>
        <select
          className="form-control"
          name="status"
          value={currentOrder.status}
          onChange={handleChange}
          required
        >
          <option value={CheckoutStatus.REQUESTED}>Requested</option>
          <option value={CheckoutStatus.APPROVED}>Approved</option>
          <option value={CheckoutStatus.REJECTED}>Rejected</option>
          <option value={CheckoutStatus.BORROWED}>Borrowed</option>
          <option value={CheckoutStatus.EXPIRED}>Expired</option>
          <option value={CheckoutStatus.RETURNED}>Returned</option>
          <option value={CheckoutStatus.PENALTY}>Penalty</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default OrderForm;
