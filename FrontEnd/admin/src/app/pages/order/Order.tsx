import React, { useState, useEffect } from 'react';
import { CheckoutService } from '../../services/checkout/CheckoutService';
import { CheckoutDTO } from '../../model/CheckoutDTO';
import OrderModal from './OrderModal';
import { toast } from 'react-toastify';
import { CheckoutStatus } from '../../model/CheckoutStatus';

const Order: React.FC = () => {
  const [orders, setOrders] = useState<CheckoutDTO[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<CheckoutDTO[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<CheckoutDTO | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<CheckoutStatus | 'ALL'>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const rowsPerPage = 10;

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchTerm, statusFilter, orders]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const fetchedOrders = await CheckoutService.findAll();
      setOrders(fetchedOrders);
    } catch (error) {
      toast.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const handleRowClick = (order: CheckoutDTO) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (orderId: number, newStatus: CheckoutStatus) => {
    if (window.confirm(`Are you sure you want to change the status to ${newStatus}?`)) {
      try {
        let updatedOrder: CheckoutDTO;

        switch (newStatus) {
          case CheckoutStatus.APPROVED:
            updatedOrder = await CheckoutService.approveCheckout(orderId);
            break;
          case CheckoutStatus.REJECTED:
            updatedOrder = await CheckoutService.rejectCheckout(orderId);
            break;
          case CheckoutStatus.BORROWED:
            updatedOrder = await CheckoutService.borrowCheckout(orderId);
            break;
          default:
            throw new Error('Invalid status update');
        }

        toast.success(`Status updated successfully to ${newStatus}`);
        fetchOrders();
      } catch (error) {
        toast.error(`Error updating status to ${newStatus}`);
      }
    }
  };

  const handleDelete = async (orderId: number) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await CheckoutService.deleteById(orderId);
        toast.success("Order deleted successfully");
        fetchOrders();
      } catch (error) {
        toast.error("Error deleting order");
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      
        <div className="mb-9">
          <div className="row g-2 mb-4">
            <div className="col-auto">
              <h2 className="mb-0">Orders</h2>
            </div>
            <div className="col-auto ms-auto">
              <input
                type="text"
                placeholder="Search by student name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as CheckoutStatus | 'ALL')}
                className="form-select"
              >
                <option value="ALL">All Statuses</option>
                <option value={CheckoutStatus.REQUESTED}>Requested</option>
                <option value={CheckoutStatus.APPROVED}>Approved</option>
                <option value={CheckoutStatus.REJECTED}>Rejected</option>
                <option value={CheckoutStatus.BORROWED}>Borrowed</option>
              </select>
            </div>
          </div>

          <div className="table-responsive scrollbar-overlay mx-n1 px-1">
            <table className="table table-sm fs--1 mb-0">
              <thead>
                <tr>
                  <th className="sort align-middle pe-5" scope="col">OrderID</th>
                  <th className="sort align-middle pe-5" scope="col">Full Name</th>
                  <th className="sort align-middle pe-5" scope="col">Start Time</th>
                  <th className="sort align-middle pe-5" scope="col">End Time</th>
                  <th className="sort align-middle pe-5" scope="col">Status</th>
                  <th className="sort align-middle pe-5" scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map(order => (
                  <tr key={order.id} className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="orderid align-middle">{order.id}</td>
                    <td className="full-name align-middle">{order.user?.fullName || 'N/A'}</td>
                    <td className="start-time align-middle">{order.startTime}</td>
                    <td className="end-time align-middle">{order.endTime}</td>
                    <td className="status align-middle">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as CheckoutStatus)}
                        disabled={order.status === CheckoutStatus.BORROWED}
                        className="form-select"
                      >
                        {order.status === CheckoutStatus.REQUESTED && (
                          <>
                            <option value={CheckoutStatus.APPROVED}>Approved</option>
                            <option value={CheckoutStatus.REJECTED}>Rejected</option>
                          </>
                        )}
                        {(order.status === CheckoutStatus.APPROVED || order.status === CheckoutStatus.REJECTED) && (
                          <option value={CheckoutStatus.BORROWED}>Borrowed</option>
                        )}
                        <option value={order.status}>{order.status}</option>
                      </select>
                    </td>
                    <td className="actions align-middle">
                      <button
                        className="btn btn-info me-2"
                        onClick={() => handleRowClick(order)}
                      >
                        <i className="fas fa-eye" />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(order.id)}
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <span>Total Orders: {filteredOrders.length}</span>
            <div className="col-auto d-flex">
              <button
                className="page-link"
                data-list-pagination="prev"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <span className="fas fa-chevron-left" />
              </button>
              <ul className="mb-0 pagination">
                {/* Add pagination controls if needed */}
              </ul>
              <button
                className="page-link pe-0"
                data-list-pagination="next"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage >= totalPages}
              >
                <span className="fas fa-chevron-right" />
              </button>
            </div>
          </div>
        </div>

        {isModalOpen && selectedOrder && (
          <OrderModal
            order={selectedOrder}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      
    </div>
  );
};

export default Order;
