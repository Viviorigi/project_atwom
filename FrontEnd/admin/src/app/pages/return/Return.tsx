import React, { useEffect, useState, useRef } from "react";
import { CheckoutDTO } from "../../model/CheckoutDTO";
import { format } from "date-fns";
import ReturnForm from "./ReturnForm";
import Pagination from "../../comp/common/Pagination";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/hook";
import { setLoading } from "../../reducers/spinnerSlice";
import { CheckoutService } from "../../services/checkout/CheckoutService";
import OrderDetail from "../order/OrderDetail";
import { Dialog } from "primereact/dialog";
import { AuthService } from "../../services/auth/AuthService";
import { UserDTO } from "../../model/UserDTO";
import axios from "axios";
import { UserFineDTO } from "../../model/UserFineDTO";

const Return = () => {
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
  const [fines, setFines] = useState<Map<number, number>>(new Map());
  const orderRef = useRef<CheckoutDTO | null>(null);
  const dispatch = useAppDispatch();
  const indexOfLastItem = orderSearchParams.page * orderSearchParams.limit;
  const indexOfFirstItem = indexOfLastItem - orderSearchParams.limit;

  useEffect(() => {
    fetchOrders();
    fetchAllUsers();
  }, [orderSearchParams.timer, orderSearchParams.page]);

  useEffect(() => {
    if (orders.length > 0) {
      fetchFinesForOrders();
    }
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const resp = await CheckoutService.findAll({
        keySearch: orderSearchParams.keySearch,
        limit: orderSearchParams.limit,
        page: orderSearchParams.page,
      });

      const filteredOrders = resp.filter((order) =>
        ["BORROWED", "EXPIRED", "RETURNED", "PENALTY"].includes(order.status)
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

  const fetchFinesForOrders = async () => {
    try {
      const finesMap = new Map<number, number>();
      const penaltyOrders = orders.filter(order => order.status === "PENALTY");
      
      for (const order of penaltyOrders) {
        const response = await axios.get<UserFineDTO>(`http://localhost:8080/api/userfine/checkout/${order.id}`);
        if (response.data) {
          finesMap.set(order.id, response.data.amount);
        }
      }
      setFines(finesMap);
    } catch (error) {
      console.error("Error fetching fines", error);
    }
  };

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

  const viewOrderDetail = (order: CheckoutDTO) => {
    orderRef.current = order;
    setOrderDetailOpen(true);
  };

  const deleteOrder = (id: number) => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to delete this return?",
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
          toast.success("Return deleted successfully");
        } catch (error) {
          dispatch(setLoading(false));
          toast.error("Error deleting return");
        }
      }
    });
  };

  function editOrder(order: CheckoutDTO): void {
    orderRef.current = order;
    setOpen(true);
  }

  return (
    <div>
      <div className="mb-9">
        <div className="card mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white">
          <div className="row g-2 mb-4">
            <div className="col-auto">
              <h2 className="mt-4">List Returns</h2>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-auto">
              <div className="search-box d-flex">
                <input
                  className="form-control search-input search"
                  type="search"
                  placeholder="Search returns by Student"
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
                    style={{ width: "10%" }}
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
                    style={{ width: "15%" }}
                  >
                    Expired Date
                  </th>
                  <th
                    className="sort align-middle text-center"
                    scope="col"
                    style={{ width: "10%" }}
                  >
                    Fine
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
                      {order.user ? order.user.fullName : "N/A"}
                    </td>
                    <td className="align-middle text-center">
                    <span
                        className={` ${order.status === "REQUESTED"
                          ? "badge badge-phoenix fs--2 badge-phoenix-info"
                          : order.status === "RETURNED" ||
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
                      {format(new Date(order.startTime), "dd-MM-yyyy")}
                    </td>
                    <td className="align-middle text-center text-900">
                      {order.startTime
                        ? format(new Date(order.startTime), "dd/MM/yyyy, hh:mm")
                        : "N/A"}
                    </td>
                    <td className="align-middle text-center text-900">
                      {order.endTime
                        ? format(new Date(order.endTime), "dd/MM/yyyy, hh:mm")
                        : "N/A"}
                    </td>
                    <td className="align-middle text-center">
                      {order.status === "PENALTY" && fines.has(order.id)
                        ? fines.get(order.id)?.toFixed(2) + " VNĐ"
                        : "N/A"}
                    </td>
                    <td className="align-middle text-center">
                    <button aria-label='d' className="btn btn-phoenix-primary me-1 mb-1" type="button" onClick={() => editOrder(order)}><i className="fa-solid fa-pen"></i></button>
                      <button aria-label='d' className="btn btn-phoenix-danger me-1 mb-1" type="button" onClick={() => deleteOrder(order.id)}><i className="fa-solid fa-trash"></i></button>
                      <button aria-label='d' className="btn btn-phoenix-secondary me-1 mb-1" type="button" onClick={() => viewOrderDetail(order)}><i className="far fa-eye"></i></button>
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
      <footer className="footer position-absolute">
          <div className="row g-0 justify-content-between align-items-center h-100">
            <div className="col-12 col-sm-auto text-center">
              <p className="mb-0 mt-2 mt-sm-0 text-900">Thank you for creating with ATWOM BOOk<span className="d-none d-sm-inline-block" /><span className="d-none d-sm-inline-block mx-1">|</span><br className="d-sm-none" />2024 ©</p>
            </div>
            <div className="col-12 col-sm-auto text-center">
              <p className="mb-0 text-600">v1.13.0</p>
            </div>
          </div>
        </footer>
      <Dialog
        visible={open}
        style={{ width: "10vw" }}
        onHide={() => setOpen(false)}
      >
        <ReturnForm
          returnData={orderRef.current}
          onClose={() => {
            setOpen(false);
            fetchOrders();
            fetchAllUsers();
          }}
          onSave={() => {
            setOpen(false);
            fetchOrders();
          }}
          fines = {fines}
        />
      </Dialog>

      <Dialog
        header="Return Detail"
        visible={orderDetailOpen}
        style={{ width: "80vw" }}
        onHide={() => setOrderDetailOpen(false)}
      >
        <OrderDetail
          orderId={orderRef.current ? orderRef.current.id : 0}
          onHide={() => setOrderDetailOpen(false)}
        />
      </Dialog>
    </div>
  );
};

export default Return;
