import React, { useState, useEffect } from 'react';
import { CheckoutDetailService } from '../../services/checkout/CheckoutDetailService';
import { CheckoutDetailDTO } from '../../model/CheckoutDetailDTO';
import { toast } from 'react-toastify';
import { CheckoutDTO } from '../../model/CheckoutDTO';

interface OrderModalProps {
  order: CheckoutDTO;
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ order, isOpen, onClose }) => {
  const [details, setDetails] = useState<CheckoutDetailDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      fetchDetails();
    }
  }, [isOpen]);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const fetchedDetails = await CheckoutDetailService.findAll();
      setDetails(fetchedDetails.filter(detail => detail.id === order.id));
    } catch (error) {
      toast.error("Error fetching checkout details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Order Details</h5>
            <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="table-responsive scrollbar-overlay">
              <table className="table table-sm fs--1 mb-0">
                <thead>
                  <tr>
                    <th className="sort align-middle">Mã Sách</th>
                    <th className="sort align-middle">Tên danh mục</th>
                    <th className="sort align-middle">Tên sách</th>
                    <th className="sort align-middle">Số lượng sách</th>
                  </tr>
                </thead>
                <tbody>
                  {details.length > 0 ? (
                    details.map(detail => (
                      <tr key={detail.book.id}>
                        <td className="align-middle">{detail.book.id}</td>
                        <td className="align-middle">{detail.book.category?.name}</td>
                        <td className="align-middle">{detail.book.title}</td>
                        <td className="align-middle">{detail.quantity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center">No details found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
