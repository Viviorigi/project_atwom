import React, { useEffect, useState, useRef } from "react";
import { CheckoutDTO } from "../../model/CheckoutDTO";
import { format } from "date-fns";
import OrderForm from "./OrderForm";
import Pagination from "../../comp/common/Pagination";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/hook";
import { setLoading } from "../../reducers/spinnerSlice";
import { CheckoutService } from "../../services/checkout/CheckoutService";
import OrderDetail from "./OrderDetail";
import { Dialog } from "primereact/dialog";
import { AuthService } from "../../services/auth/AuthService";
import { UserDTO } from "../../model/UserDTO";

const Order = () => {
  const [orders, setOrders] = useState<CheckoutDTO[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [orderDetailOpen, setOrderDetailOpen] = useState(false);
  const [orderSearchParams, setOrderSearchParams] = useState({
    keySearch: "",
    page: 1,
    limit: 10,
    timer: new Date().getTime(),
  });
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const dispatch = useAppDispatch();
  const indexOfLastItem = orderSearchParams.page * orderSearchParams.limit;
  const indexOfFirstItem = indexOfLastItem - orderSearchParams.limit;
  const orderRef = useRef<CheckoutDTO | null>(null);

  useEffect(() => {
    fetchOrders();
    fetchAllUsers();
  }, [orderSearchParams.timer, orderSearchParams.page]);

  const fetchOrders = async () => {
    try {
      const resp = await CheckoutService.findAll({
        keySearch: orderSearchParams.keySearch,
        limit: orderSearchParams.limit,
        page: orderSearchParams.page,
      });

      const filteredOrders = resp.filter((order) =>
        ["REQUESTED", "APPROVED", "REJECTED", "BORROWED"].includes(order.status)
      );

      dispatch(setLoading(false));
      setOrders(filteredOrders);
      setTotalOrders(filteredOrders.length);
      setTotalPage(Math.ceil(filteredOrders.length / orderSearchParams.limit));
    } catch (error) {
      console.error("Error fetching orders", error);
      dispatch(setLoading(false));
    }
  };

  const fetchAllUsers = async () => {
    try {
      const modelSearch = {
        keySearch: orderSearchParams.keySearch,
        page: orderSearchParams.page,
        limit: orderSearchParams.limit,
      };

      const response = await AuthService.getInstance().getList(modelSearch);
      const { users, totalPages, totalUsers } = response.data;

      setUsers(users);
      setTotalPages(totalPages);
      setTotalUsers(totalUsers);
    } catch (error) {
      console.error("Error fetching all users", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderSearchParams({
      ...orderSearchParams,
      [event.target.name]: event.target.value,
      page: 1,
    });
  };

  const handleKeyUpSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setOrderSearchParams({
        ...orderSearchParams,
        timer: new Date().getTime(),
      });
    }
  };

  const addOrder = () => {
    setMode("add");
    orderRef.current = null;
    setOpen(true);
  };

  const editOrder = (order: CheckoutDTO) => {
    setMode("edit");
    orderRef.current = order;
    setOpen(true);
  };

  const viewOrderDetail = (order: CheckoutDTO) => {
    orderRef.current = order;
    setOrderDetailOpen(true);
  };

  const deleteOrder = (id: number) => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to delete this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#89B449",
      cancelButtonColor: "#E68A8C",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.value) {
        dispatch(setLoading(true));
        try {
          await CheckoutService.deleteById(id);
          dispatch(setLoading(false));
          setOrderSearchParams({
            ...orderSearchParams,
            timer: new Date().getTime(),
          });
          toast.success("Order deleted successfully");
        } catch (error) {
          dispatch(setLoading(false));
          toast.error("Error deleting order");
        }
      }
    });
  };

  return (
    <div>
      <div className="mb-9">
        <div className="card mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white">
          <div className="row g-2 mb-4">
            <div className="col-auto">
              <h2 className="mt-4">List Orders</h2>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-auto">
              <div className="search-box d-flex">
                <input
                  className="form-control search-input search"
                  type="search"
                  placeholder="Search orders by Student"
                  name="keySearch"
                  aria-label="Search"
                  value={orderSearchParams.keySearch || ""}
                  onChange={handleChangeSearch}
                  onKeyUp={handleKeyUpSearch}
                />
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setOrderSearchParams({
                      ...orderSearchParams,
                      timer: new Date().getTime(),
                    })
                  }
                >
                  <span className="fas fa-search" />
                </button>
              </div>
            </div>
            <div className="col-auto"></div>
            <div className="col-auto">
              <button className="btn btn-primary" onClick={addOrder}>
                <span className="fas fa-plus me-2" />
                Create Order
              </button>
            </div>
          </div>

          <div className="table-responsive scrollbar-overlay mx-n1 px-1 mt-5">
            <table className="table table-bordered fs--1 mb-2">
              <thead>
                <tr>
                  <th
                    className="sort align-middle text-center"
                    scope="col"
                    style={{ width: "3%" }}
                  >
                    #
                  </th>
                  <th
                    className="sort align-middle text-center"
                    scope="col"
                    style={{ width: "20%" }}
                  >
                    Student
                  </th>
                  <th
                    className="sort align-middle text-center"
                    scope="col"
                    style={{ width: "20%" }}
                  >
                    Status
                  </th>
                  <th
                    className="sort align-middle text-center"
                    scope="col"
                    style={{ width: "15%" }}
                  >
                    Start Time
                  </th>
                  <th
                    className="sort align-middle text-center"
                    scope="col"
                    style={{ width: "15%" }}
                  >
                    Update Time
                  </th>
                  <th
                    className="sort align-middle text-center"
                    scope="col"
                    style={{ width: "10%" }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id}>
                    <td className="align-middle text-end pe-3">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="align-middle">
                      {" "}
                      {order.user ? order.user.fullName : "N/A"}
                    </td>
                    <td className="text-center align-middle">
                      <span
                        className={` ${
                          order.status === "REQUESTED"
                            ? "badge badge-phoenix fs--2 badge-phoenix-info"
                            : order.status === "APPROVED" ||
                              order.status === "BORROWED"
                            ? "badge badge-phoenix fs--2 badge-phoenix-success"
                            : order.status === "REJECTED"
                            ? "badge badge-phoenix fs--2 badge-phoenix-danger"
                            : "badge badge-phoenix fs--2 badge-phoenix"
                        }`}
                      >
                        <span className="badge-label">{order.status}</span>
                      </span>
                    </td>
                    <td className="align-middle text-center">
                      {format(new Date(order.startTime), "dd/MM/yyyy, hh:mm")}
                    </td>
                    <td className="align-middle text-center">
                      {format(new Date(order.endTime), "dd/MM/yyyy, hh:mm")}
                    </td>
                    <td className="align-middle text-center">
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => editOrder(order)}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => deleteOrder(order.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => viewOrderDetail(order)}
                      >
                        <span className="fas fa-eye" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row align-items-center justify-content-between py-2 pe-0 fs--1">
            <div className="col-auto d-flex">
              <p className="mb-0">
                Total orders: <strong>{totalOrders}</strong>
              </p>
            </div>
            <div className="col-auto d-flex">
              <Pagination
                currentPage={orderSearchParams.page}
                totalPages={totalPage}
                onPageChange={(page: any) =>
                  setOrderSearchParams({ ...orderSearchParams, page })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog
        visible={open}
        onHide={() => {
          setOpen(false);
          fetchOrders();
          fetchAllUsers();
        }}
        style={{ width: "40vw" }}
        header={mode === "add" ? "Add New Order" : "Edit Order"}
      >
        <OrderForm
          mode={mode}
          order={orderRef.current}
          onClose={() => {
            setOpen(false);
            fetchOrders();
            fetchAllUsers();
          }}
          onSave={() => {
            setOpen(false);
            fetchOrders();
          }}
          users={users}
        />
      </Dialog>

      <Dialog
        visible={orderDetailOpen}
        onHide={() => setOrderDetailOpen(false)}
        style={{ width: "80vw" }}
        header="Order Details"
      >
        <OrderDetail
          orderId={orderRef.current ? orderRef.current.id : 0}
          onHide={() => setOrderDetailOpen(false)}
        />
      </Dialog>
    </div>
  );
};

export default Order;
