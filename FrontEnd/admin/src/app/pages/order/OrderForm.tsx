import React, { useState, useEffect } from "react";
import { CheckoutDTO } from "../../model/CheckoutDTO";
import { CheckoutStatus } from "../../model/CheckoutStatus";
import { UserDTO } from "../../model/UserDTO";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Dialog } from "primereact/dialog";
import { CheckoutService } from "../../services/checkout/CheckoutService";

interface OrderFormProps {
  order: CheckoutDTO | null;
  users: UserDTO[];
  onSave: (order: CheckoutDTO) => void;
  hideForm: (status: boolean) => void;
}

const defaultCheckout: CheckoutDTO = {
  id: 0,
  user: { userUid: 0, username: "", fullName: "", password: "", email: "", dob: "", className: "", phone: "", address: "", avatar: "", cre_dt: "", upd_dt: "", deleted: false, isActive: true, resetPasswordToken: "", tokenExpirationDate: "", roles: [] },
  startTime: "",
  endTime: "",
  status: CheckoutStatus.REQUESTED,
  checkoutDetails: [],
};

export default function OrderForm({ order, users, onSave, hideForm }: OrderFormProps) {
  const [currentOrder, setCurrentOrder] = useState<CheckoutDTO>(defaultCheckout);
  const [statusOptions, setStatusOptions] = useState<CheckoutStatus[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  useEffect(() => {
    if (order != null) {
      setCurrentOrder({ ...order });
      setSelectedUser(order.user.userUid);
      updateStatusOptions(order.status);
    } else {
      setCurrentOrder(defaultCheckout);
    }
  }, [order]);

  const updateStatusOptions = (status: CheckoutStatus) => {
    switch (status) {
      case CheckoutStatus.REQUESTED:
        setStatusOptions([
          CheckoutStatus.APPROVED,
          CheckoutStatus.REJECTED,
          CheckoutStatus.EXPIRED
        ]);
        break;
      case CheckoutStatus.APPROVED:
      case CheckoutStatus.REJECTED:
        setStatusOptions([
          CheckoutStatus.BORROWED,
          CheckoutStatus.REJECTED
        ]);
        break;
      case CheckoutStatus.BORROWED:
        setStatusOptions([CheckoutStatus.EXPIRED]);
        break;
      default:
        setStatusOptions([]);
        break;
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as CheckoutStatus;

    if (newStatus !== currentOrder.status) {
      try {
        let updatedOrder;
        switch (newStatus) {
          case CheckoutStatus.APPROVED:
            updatedOrder = await CheckoutService.approveCheckout(currentOrder.id);
            break;
          case CheckoutStatus.REJECTED:
            updatedOrder = await CheckoutService.rejectCheckout(currentOrder.id);
            break;
          case CheckoutStatus.BORROWED:
            updatedOrder = await CheckoutService.borrowCheckout(currentOrder.id);
            break;
          // case CheckoutStatus.EXPIRED:
          //   updatedOrder = await CheckoutService.expireCheckout(currentOrder.id);
          //   break;
          default:
            return;
        }
        setCurrentOrder(updatedOrder);
        updateStatusOptions(newStatus);
        toast.success(`Order status updated to ${newStatus}`);
      } catch (error) {
        toast.error("Failed to update order status");
      }
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userUid = parseInt(e.target.value, 10);
    setSelectedUser(userUid);
  };

  const save = () => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#89B449",
      cancelButtonColor: "#E68A8C",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedOrder = { ...currentOrder, user: users.find(user => user.userUid === selectedUser) || defaultCheckout.user };
        onSave(updatedOrder);
        hideForm(true);
        toast.success("Order saved successfully");
      }
    });
  };

  const cancel = () => {
    hideForm(false);
  };

  const isAddMode = order === null;

  return (
    <div className="container form-group">
      {isAddMode && (
        <div className="row mb-3">
          <div className="col-2">User</div>
          <div className="col-9">
            <select
              className="form-control"
              name="user"
              value={selectedUser || ''}
              onChange={handleUserChange}
              required
            >
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user.userUid} value={user.userUid}>
                  {user.fullName}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div className="row mb-3">
        <div className="col-2">Status</div>
        <div className="col-9">
          <label className="me-2">Current Status: {currentOrder.status}</label>
          <select
            className="form-control"
            name="status"
            value={currentOrder.status}
            onChange={handleChange}
            required
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="text-center mt-3">
        <button onClick={save} className="btn btn-primary btn-sm me-2">
          Save
        </button>
        <button onClick={cancel} className="btn btn-danger btn-sm">
          Cancel
        </button>
      </div>
    </div>
  );
}
