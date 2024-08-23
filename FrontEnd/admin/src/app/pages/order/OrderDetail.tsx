import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckoutDetailDTO } from "../../model/CheckoutDetailDTO";
import Pagination from "../../comp/common/Pagination";
import Swal from "sweetalert2";
import AddDetailForm from "./AddDetailForm";
import { Dialog } from "primereact/dialog";

const BASE_URL = "http://localhost:8080/api/checkoutdt";

interface OrderDetailProps {
  orderId: number;
  onHide: () => void;
}

interface OrderSearchParams {
  page: number;
  limit: number;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId, onHide }) => {
  const [details, setDetails] = useState<CheckoutDetailDTO[]>([]);
  const [addDetailOpen, setAddDetailOpen] = useState(false);
  const [totalDetails, setTotalDetails] = useState<number>(0);
  const [selectedDetail, setSelectedDetail] =
    useState<CheckoutDetailDTO | null>(null);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [searchParams, setSearchParams] = useState<OrderSearchParams>({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    fetchOrderDetails();
  }, [searchParams]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/${orderId}`);
      setDetails(response.data);
      setTotalDetails(response.headers["x-total-count"]);
    } catch (error) {
      console.error("Error fetching checkout details", error);
    }
  };

  const handlePageClick = (page: number) => {
    setSearchParams((prevState) => ({ ...prevState, page }));
  };

  const handleAdd = () => {
    setSelectedDetail(null);
    setMode("add");
    setAddDetailOpen(true);
  };

  const handleEdit = (detail: CheckoutDetailDTO) => {
    setSelectedDetail(detail);
    setMode("edit");
    setAddDetailOpen(true);
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Confirm Delete",
      text: "Are you sure you want to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${BASE_URL}/delete/${id}`);
          fetchOrderDetails();
          Swal.fire("Deleted!", "The record has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting checkout detail", error);
          Swal.fire("Error!", "Failed to delete the record.", "error");
        }
      }
    });
  };

  const handleSave = async (detail: CheckoutDetailDTO) => {
    const action = mode === "edit" ? "update" : "add";
    const url = `${BASE_URL}/${action}${
      mode === "edit" ? `/${selectedDetail?.id}` : ""
    }`;

    Swal.fire({
      title: "Confirm Save",
      text: "Are you sure you want to save this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Save it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (action === "update") {
            await axios.put(url, detail);
            Swal.fire("Updated!", "The record has been updated.", "success");
          } else {
            await axios.post(url, detail);
            Swal.fire("Added!", "The record has been added.", "success");
          }
          setAddDetailOpen(false);
          fetchOrderDetails();
        } catch (error) {
          console.error("Error saving checkout detail", error);
          Swal.fire("Error!", "Failed to save the record.", "error");
        }
      }
    });
  };

  const handleCancel = () => {
    setAddDetailOpen(false);
  };

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-12 text-end">
          <button className="btn btn-primary" onClick={handleAdd}>
            Add New Book
          </button>
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
                <td colSpan={5} className="text-center">
                  No details found
                </td>
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
      <Dialog
        visible={addDetailOpen}
        style={{ width: "50vw" }}
        onHide={handleCancel}
      >
        <AddDetailForm
          checkoutId={orderId}
          detail={selectedDetail}
          mode={mode}
          onSave={handleSave}
          onClose={handleCancel}
        />
      </Dialog>
    </div>
  );
};

export default OrderDetail;
