import React, { useState, useEffect } from 'react';
import { ReturnDTO } from '../../model/ReturnDTO';

interface ReturnFormProps {
  returnData?: ReturnDTO | null;
  onClose: () => void;
  onSave: (updatedReturn: ReturnDTO) => void; // Pass the updated return data to the onSave callback
}

const ReturnForm: React.FC<ReturnFormProps> = ({ returnData, onClose, onSave }) => {
  const [formData, setFormData] = useState<ReturnDTO | null>(returnData || null);

  useEffect(() => {
    if (returnData) {
      setFormData(returnData);
    }
  }, [returnData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    if (formData) {
      onSave(formData); // Pass the updated return data to the onSave callback
      onClose();
    }
  };

  if (!formData) return null;

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{returnData ? 'Edit Return Status' : 'Create Return'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Student Name</label>
              <input
                type="text"
                className="form-control"
                name="studentName"
                value={formData.user.fullName}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <input
                type="text"
                className="form-control"
                name="status"
                value={formData.status}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Fine</label>
              <input
                type="number"
                className="form-control"
                name="fine"
                value={formData.fine}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Return Date</label>
              <input
                type="date"
                className="form-control"
                name="returnDate"
                value={formData.returnDate}
                disabled
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnForm;
