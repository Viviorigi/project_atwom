import React, { useState, useEffect } from "react";
import { CheckoutDTO } from "../../model/CheckoutDTO";
import { CheckoutStatus } from "../../model/CheckoutStatus";
import { UserDTO } from "../../model/UserDTO";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { CheckoutService } from "../../services/checkout/CheckoutService";

interface OrderFormProps {
  order: CheckoutDTO | null;
  users: UserDTO[];
  onSave: (order: CheckoutDTO) => void;
  onClose: (status: boolean) => void;
  mode: string;
}

const defaultCheckout: CheckoutDTO = {
  id: 0,
  user: { userUid: 0, username: "", fullName: "", password: "", email: "", dob: "", className: "", phone: "", address: "", avatar: "", cre_dt: "", upd_dt: "", deleted: false, isActive: true, resetPasswordToken: "", tokenExpirationDate: "", roles: [] },
  userUid: 0,
  userFullName: "",
  startTime: "",
  endTime: "",
  status: CheckoutStatus.REQUESTED,
  checkoutDetails: [],
  expiredTime: "",
  fine: 0
};

export default function OrderForm({ order, users, onSave, onClose }: OrderFormProps) {
  const [currentOrder, setCurrentOrder] = useState<CheckoutDTO>(defaultCheckout);
  const [statusOptions, setStatusOptions] = useState<CheckoutStatus[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<Date>(
    order?.startTime ? new Date(order.startTime) : new Date()
  );
  const [endTime, setEndTime] = useState<Date>(
    order?.endTime ? new Date(order.endTime) : new Date()
  );
  const [newStatus, setNewStatus] = useState<CheckoutStatus>(CheckoutStatus.REQUESTED);
  const [errors, setErrors] = useState({ user: '', status: '' });

  useEffect(() => {
    if (order != null) {
      setCurrentOrder({ ...order });
      setSelectedUser(order.userUid);
      setStartTime(order.startTime ? new Date(order.startTime) : new Date());
      setEndTime(order.endTime ? new Date(order.endTime) : new Date());
      updateStatusOptions(order.status);
      setNewStatus(order.status);
    } else {
      setCurrentOrder(defaultCheckout);
    }
  }, [order]);

  const updateStatusOptions = (status: CheckoutStatus) => {
    switch (status) {
      case CheckoutStatus.REQUESTED:
        setStatusOptions([
          CheckoutStatus.REQUESTED,
          CheckoutStatus.APPROVED,
          CheckoutStatus.REJECTED
        ]);
        break;
      case CheckoutStatus.APPROVED:
      case CheckoutStatus.REJECTED:
        setStatusOptions([
          CheckoutStatus.APPROVED,
          CheckoutStatus.REJECTED,
          CheckoutStatus.BORROWED
        ]);
        break;
      case CheckoutStatus.BORROWED:
        setStatusOptions([
          CheckoutStatus.BORROWED,
          CheckoutStatus.EXPIRED
        ]);
        break;
      default:
        setStatusOptions([]);
        break;
    }
  };

  const validateForm = () => {
    let valid = true;
    let errors = { user: '', status: '' };

    if (isAddMode && !selectedUser) {
      errors.user = 'User is required';
      valid = false;
    }

    if (!currentOrder.status) {
      errors.status = 'Status is required';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewStatus(e.target.value as CheckoutStatus);
  };

  const handleAdd = async () => {
    if (!validateForm()) return;

    Swal.fire({
      title: "Confirm",
      text: "Do you want to add this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#89B449",
      cancelButtonColor: "#E68A8C",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const selectedUserObj = users.find(user => user.userUid === selectedUser);

        const newOrder: CheckoutDTO = {
          id: 0,
          user: { userUid: 0, username: "", fullName: "", password: "", email: "", dob: "", className: "", phone: "", address: "", avatar: "", cre_dt: "", upd_dt: "", deleted: false, isActive: true, resetPasswordToken: "", tokenExpirationDate: "", roles: [] },
          userUid: selectedUser || 0,
          userFullName: selectedUserObj?.fullName || "",
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          status: CheckoutStatus.REQUESTED,
          checkoutDetails: [],
          expiredTime: "",
          fine: 0
        };

        try {
          await CheckoutService.save(newOrder);
          toast.success("Order added successfully");
          onClose(true);
        } catch (error) {
          toast.error("Failed to add order");
        }
      }
    });
  };

  const handleEdit = async () => {
    if (!validateForm()) return;

    Swal.fire({
      title: "Confirm",
      text: "Do you want to save changes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#89B449",
      cancelButtonColor: "#E68A8C",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedOrder: CheckoutDTO = {
          ...currentOrder,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        };

        try {
          if (newStatus !== currentOrder.status) {
            switch (newStatus) {
              case CheckoutStatus.APPROVED:
                await CheckoutService.approveCheckout(currentOrder.id);
                break;
              case CheckoutStatus.REJECTED:
                await CheckoutService.rejectCheckout(currentOrder.id);
                break;
              case CheckoutStatus.BORROWED:
                await CheckoutService.borrowCheckout(currentOrder.id);
                break;
              case CheckoutStatus.EXPIRED:
                await CheckoutService.expiredCheckout(currentOrder.id);
                break;
              default:
                break;
            }
            updatedOrder.status = newStatus;
          } else {
            updatedOrder.status = currentOrder.status;
          }

          onSave(updatedOrder);
          onClose(true);
          toast.success("Order saved successfully");
        } catch (error) {
          toast.error("Failed to update order");
        }
      }
    });
  };

  const handleSave = async () => {
    if (isAddMode) {
      await handleAdd();
    } else {
      await handleEdit();
    }
  };

  const handleCancel = () => {
    onClose(false);
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
              onChange={e => setSelectedUser(parseInt(e.target.value, 10))}
              required
            >
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user.userUid} value={user.userUid}>
                  {user.fullName}
                </option>
              ))}
            </select>
            {errors.user && <div className="text-danger">{errors.user}</div>}
          </div>
        </div>
      )}
      {!isAddMode && (
        <div className="row mb-3">
          <div className="col-2">Status</div>
          <div className="col-9">
            <label className="me-2">Current Status: {currentOrder.status}</label>
            <select
              className="form-control"
              name="status"
              value={newStatus}
              onChange={handleChange}
              required
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status && <div className="text-danger">{errors.status}</div>}
          </div>
        </div>
      )}
      <div className="text-center mt-3">
        <button onClick={handleSave} className="btn btn-primary btn-sm me-2">
          {isAddMode ? 'Save' : 'Update'}
        </button>
        <button onClick={handleCancel} className="btn btn-secondary btn-sm">
          Cancel
        </button>
      </div>
    </div>
  );
}
