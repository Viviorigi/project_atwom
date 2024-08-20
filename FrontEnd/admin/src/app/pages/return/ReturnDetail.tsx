import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { CheckoutDetailDTO } from '../../model/CheckoutDetailDTO';
import Pagination from '../../comp/common/Pagination';
import Swal from 'sweetalert2';
import AddDetailForm from './AddDetailForm';
import { CheckoutDTO } from '../../model/CheckoutDTO';

const BASE_URL = 'http://localhost:8080/api/checkoutdt';

interface OrderDetailProps {
  returnId: number;
  onHide: () => void;
}

interface OrderSearchParams {
  keyword: string;
  categoryId: number;
  page: number;
  limit: number;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ returnId, onHide }) => {
  const [details, setDetails] = useState<CheckoutDetailDTO[]>([]);
  const [totalDetails, setTotalDetails] = useState<number>(0);
  const [selectedDetail, setSelectedDetail] = useState<CheckoutDetailDTO | null>(null);
  const [searchParams, setSearchParams] = useState<OrderSearchParams>({
    keyword: '',
    categoryId: 0,
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    fetchOrderDetails();
  }, [searchParams]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/${returnId}`, {
        params: {
          keyword: searchParams.keyword,
          categoryId: searchParams.categoryId,
          page: searchParams.page,
          limit: searchParams.limit,
        },
      });
      setDetails(response.data);
      setTotalDetails(response.headers['x-total-count']); // Assuming total count is in headers
    } catch (error) {
      console.error('Error fetching checkout details', error);
    }
  };

  const handlePageClick = (page: number) => {
    setSearchParams((prevState) => ({ ...prevState, page }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, keyword: e.target.value, page: 1 });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ ...searchParams, categoryId: parseInt(e.target.value, 10), page: 1 });
  };

  const handleAdd = () => {
    setSelectedDetail(null);
    setFormVisible(true);
  };

  const handleEdit = (detail: CheckoutDetailDTO) => {
    setSelectedDetail(detail);
    setFormVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${id}`);
      fetchOrderDetails();
      Swal.fire('Deleted!', 'The record has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting checkout detail', error);
      Swal.fire('Error!', 'Failed to delete the record.', 'error');
    }
  };

  const handleSave = async (detail: CheckoutDetailDTO) => {
    const action = selectedDetail ? 'update' : 'add';
    const url = `${BASE_URL}/${action}${selectedDetail ? `/${selectedDetail.id}` : ''}`;

    Swal.fire({
      title: 'Confirm Save',
      text: 'Are you sure you want to save this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Save it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (action === 'update') {
            await axios.put(url, detail);
            Swal.fire('Updated!', 'The record has been updated.', 'success');
          } else {
            await axios.post(url, detail);
            Swal.fire('Added!', 'The record has been added.', 'success');
          }
          setFormVisible(false);
          fetchOrderDetails();
        } catch (error) {
          console.error('Error saving checkout detail', error);
          Swal.fire('Error!', 'Failed to save the record.', 'error');
        }
      }
    });
  };

  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [visible, setVisible] = useState(true);

  return (
      <div className="container mt-4">
        <div className="row mb-3 align-items-center">
          <div className="col-md-4 mb-2 mb-md-0">
            <input
              type="text"
              className="form-control"
              placeholder="Search by book name"
              value={searchParams.keyword}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-md-4 mb-2 mb-md-0">
            <select
              className="form-control"
              value={searchParams.categoryId}
              onChange={handleCategoryChange}
            >
              <option value={0}>All Categories</option>
              {/* Populate categories here */}
            </select>
          </div>
          <div className="col-md-4 text-end">
            <button className="btn btn-primary" onClick={handleAdd}>Add New Book</button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Mã Sách</th>
                <th>Tên danh mục</th>
                <th>Tên sách</th>
                <th>Số lượng sách</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {details.length > 0 ? (
                details.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.bookId}</td>
                    <td>{detail.categoryName}</td>
                    <td>{detail.bookTitle}</td>
                    <td>{detail.quantity}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(detail)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(detail.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">No details found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <Pagination
            totalItems={totalDetails}
            currentPage={searchParams.page}
            totalPages={Math.ceil(totalDetails / searchParams.limit)}
            onPageChange={handlePageClick}
          />
        </div>
        {formVisible && (
          <AddDetailForm
            detail={selectedDetail}
            onSave={handleSave}
            onClose={() => setFormVisible(false)}
          />
        )}
      </div>
  );
};

export default OrderDetail;
