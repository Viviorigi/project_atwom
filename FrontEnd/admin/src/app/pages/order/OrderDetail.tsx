import React, { useEffect, useState } from 'react';
import { CheckoutDetailDTO } from '../../model/CheckoutDetailDTO';
import axios from 'axios';
import Pagination from '../../comp/common/Pagination';

interface OrderDetailProps {
  orderId: number;
}

interface OrderSearchParams {
  keyword: string;
  categoryId: number;
  page: number;
  limit: number;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId }) => {
  const [details, setDetails] = useState<CheckoutDetailDTO[]>([]);
  const [totalDetails, setTotalDetails] = useState<number>(0);
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
      const response = await axios.get(`/api/orders/${orderId}/details`, {
        params: searchParams,
      });
      setDetails(response.data.details);
      setTotalDetails(response.data.total);
    } catch (error) {
      console.error('Error fetching order details', error);
    }
  };

  const handlePageClick = (page: number) => {
    setSearchParams(prevState => ({ ...prevState, page }));
  };

  return (
    <div>
      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search by book name"
            onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
          />
        </div>
        <div className="col">
          <select
            className="form-control"
            onChange={(e) => setSearchParams({ ...searchParams, categoryId: parseInt(e.target.value, 10) })}
          >
            <option value={0}>All Categories</option>
            {/* Categories options */}
          </select>
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
                  <td>{detail.book.id}</td>
                  <td>{detail.book.category?.name}</td>
                  <td>{detail.book.title}</td>
                  <td>{detail.quantity}</td>
                  <td>
                    <button className="btn btn-warning btn-sm">Edit</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
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
      <Pagination
        totalItems={totalDetails}
        currentPage={searchParams.page}
        totalPages={Math.ceil(totalDetails / searchParams.limit)}
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default OrderDetail;
