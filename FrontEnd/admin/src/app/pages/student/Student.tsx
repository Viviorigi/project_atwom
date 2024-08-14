import React, { useEffect, useState } from 'react'
import { UserSearchParams } from '../../model/auth/UserSearchParams';
import { AuthService } from '../../services/auth/AuthService';
import { format } from 'date-fns';
import { useAppDispatch } from '../../store/hook';
import { setLoading } from '../../reducers/spinnerSlice';
import { Dialog } from 'primereact/dialog';
import StudentForm from './StudentForm';

export default function Student() {
  const [listUser, setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [userSearchParams, setUserSearchParams] = useState<UserSearchParams>(
    new UserSearchParams("", 1, 5, new Date().getTime())
  );
  const dispatch = useAppDispatch();
  const indexOfLastItem = userSearchParams.page * userSearchParams.limit;
  const indexOfFirstItem = indexOfLastItem - userSearchParams.limit;

  const handleClickClose = () => {
    setOpen(false);
  };
  
  const formatDOB = (date: any) => {
    return format(new Date(date), "dd/MM/yyyy");
  };
  const formatDate = (date: any) => {
    return format(new Date(date), 'dd/MM/yyyy, hh:mm');
  };

  const prev = () => {
    if (userSearchParams.page > 1) {
      setUserSearchParams(() => ({
        ...userSearchParams,
        page: userSearchParams.page - 1,
      }));
    }
  };
  const next = () => {
    if (userSearchParams.page < totalPage) {
      setUserSearchParams(() => ({
        ...userSearchParams,
        page: userSearchParams.page + 1,
      }));
    }
  };
  const handlePageClick = (pageNumber: any) => {
    setUserSearchParams(() => ({
      ...userSearchParams,
      page: pageNumber,
    }));
  };
  const handleChangeSearch = (event: any) => {
    setUserSearchParams({
      ...userSearchParams,
      [event.target.name]: event.target.value,
      page: 1
    });
  };
  const handleKeyUpSearch = (e: any) => {
    if (e.key === "Enter") {
      setUserSearchParams({
        ...userSearchParams,
        timer: new Date().getTime(),
      });
    }
  };
  useEffect(() => {
    // dispatch(setLoading(true));
    AuthService.getInstance()
      .getList({
        keySearch: userSearchParams.keySearch,
        limit: userSearchParams.limit,
        page: userSearchParams.page,
      })
      .then((resp: any) => {
        // dispatch(setLoading(false));
        if (resp.status === 200) {
          setListUser(resp.data.users);
          setTotalUsers(resp.data.totalUsers);
          setTotalPage(resp.data.totalPages);
        }
      })
      .catch((err: any) => {
        console.error(err);
      })
  }, [userSearchParams.timer, userSearchParams.page]);

  const addStudent = () => {
    // categoryRef.current = null;
    setOpen(true);
  };


  return (
    <div>
    
        <div className="mb-9">
          <div className="row g-2 mb-4">
            <div className="col-auto">
              <h2 className="mb-0">List User</h2>
            </div>
          </div>
          <div id="products" data-list="{&quot;valueNames&quot;:[&quot;customer&quot;,&quot;email&quot;,&quot;total-orders&quot;,&quot;total-spent&quot;,&quot;city&quot;,&quot;last-seen&quot;,&quot;last-order&quot;],&quot;page&quot;:10,&quot;pagination&quot;:true}">
            <div className="mb-6">
              <div className="row g-3">
                <div className="col-auto">
                  <div className="search-box d-flex">
                    {/* search input */}
                    <input className="form-control search-input search" type="search" placeholder="Search students" name="keySearch" aria-label="Search"
                      value={userSearchParams.keySearch || ""}
                      onChange={handleChangeSearch}
                      onKeyUp={handleKeyUpSearch} />
                    <button className='btn btn-primary' onClick={() => {
                      setUserSearchParams({
                        ...userSearchParams,
                        timer: new Date().getTime(),
                      });
                    }}><span className="fas fa-search " /></button>
                  </div>
                </div>
                <div className="col-auto scrollbar overflow-hidden-y flex-grow-1"></div>
                <div className="col-auto scrollbar overflow-hidden-y flex-grow">
                  <div className="col-auto">
                    <button className="btn btn-primary" onClick={addStudent}>
                      <span className="fas fa-plus me-2" />Create student
                    </button></div>
                </div>
              </div>
            </div>
            <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
              <div className="table-responsive scrollbar-overlay mx-n1 px-1">
                <table className="table table-bordered fs--1 mb-0">
                  <thead>
                    <tr>
                      <th className="sort align-middle pe-5 text-700 text-end" scope="col" style={{ width: '4%' }}>#</th>
                      <th className="sort align-middle pe-5 text-center" scope="col" style={{ width: '10%' }}>USER</th>
                      <th className="sort align-middle pe-5 text-center" scope="col" style={{ width: '12%' }}>EMAIL</th>
                      <th className="sort align-middle text-end" scope="col" style={{ width: '8%' }}>USERNAME</th>
                      <th className="sort align-middle text-center ps-3" scope="col" style={{ width: '8%' }}>PHONE</th>
                      <th className="sort align-middle  text-center" scope="col" style={{ width: '8%' }}>DOB</th>
                      <th className="sort align-middle text-center" scope="col" style={{ width: '10%' }}>ADDRESS</th>
                      <th className="sort align-middle text-center" scope="col" style={{ width: '8%' }}>CREATE_AT</th>
                      <th className="sort align-middle text-center" scope="col" style={{ width: '8%' }}>UPDATE_AT</th>
                      <th className="sort align-middle text-center" scope="col" style={{ width: '8%' }}>ROLE</th>
                      <th className="sort align-middle text-center pe-0" scope="col" style={{ width: '5%', minWidth: 80 }}>ACTIVE</th>
                      <th className="sort align-middle text-center pe-0" scope="col" style={{ width: '10%', minWidth: 80 }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="list" id="customers-table-body">
                    {listUser.map((u: any, index: number) => {
                      return <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                        <td className='align-middle white-space-nowrap pe-5 text-700 text-end'>{indexOfFirstItem + index + 1}</td>
                        <td className="customer align-middle white-space-nowrap pe-5"><div className="d-flex align-items-center text-1100">
                          <div className="avatar avatar-m"><img className="rounded-circle" src={u.avatar ? `http://localhost:8080/files/${u.avatar}` : "https://scontent.fhan14-3.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_p200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=Cz0lTg2_DCEQ7kNvgFwztgC&_nc_ht=scontent.fhan14-3.fna&oh=00_AYBkfh5vKk60-PUCNGT9vOaQjV_nKakVB3lICchMxdNy5g&oe=66E273FA"} alt="" /></div>
                          <p className="mb-0 ms-3 text-1100 fw-bold">{u.fullName}</p>
                        </div></td>
                        <td className="email align-middle white-space-nowrap pe-5">{u.email}</td>
                        <td className="total-orders align-middle white-space-nowrap fw-semi-bold text-end text-1000">{u.username}</td>
                        <td className="total-spent align-middle white-space-nowrap fw-bold text-end ps-3 text-1100">{u.phone}</td>
                        <td className="city align-middle white-space-nowrap text-1000 ps-7">{formatDOB(u.dob)}</td>
                        <td className="last-seen align-middle white-space-nowrap text-700 text-end">{u.address}</td>
                        <td className="last-order align-middle white-space-nowrap text-700 text-end">{formatDate(u.cre_dt)}</td>
                        <td className="last-order align-middle white-space-nowrap text-700 text-end">{formatDate(u.upd_dt)}</td>
                        <td className="last-order align-middle white-space-nowrap text-700 text-center"><span className={u.roles=='USER'? 'badge badge-phoenix fs--2 badge-phoenix-success':'badge badge-phoenix fs--2 badge-phoenix-secondary'}><span className="badge-label">{u.roles}</span></span></td>
                        <td className="last-order align-middle white-space-nowrap text-700 text-end">
                        <span className={u.isActive ? 'badge badge-phoenix fs--2 badge-phoenix-success':'badge badge-phoenix fs--2 badge-phoenix-danger'}><span className="badge-label">{u.isActive ? "Active" : "InActive"}</span></span>
                        </td>
                        <td className="last-order align-middle white-space-nowrap text-700 text-end">

                        </td>
                      </tr>
                    })}
                    
                  </tbody>
                </table>
              </div>
              <div className="row align-items-center justify-content-between py-2 pe-0 fs--1">
                <div className="col-auto d-flex">
                  <p className="mb-0 d-none d-sm-block me-3 fw-semi-bold text-900" data-list-info="data-list-info"><span className='fw-bold'>Total user: </span>  {totalUsers} </p>
                </div>
                <div className="col-auto d-flex">
                  <button className="page-link" data-list-pagination="prev" onClick={prev}>
                    <span className="fas fa-chevron-left" /></button>
                  <ul className="mb-0 pagination mx-2">
                    {[...Array(totalPage)].map((_, index) => (
                      <li
                        key={index}
                        className={`page-item ${userSearchParams.page === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageClick(index + 1)}
                      >
                        <span className="page-link">{index + 1}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="page-link pe-0" data-list-pagination="next" onClick={next}>
                    <span className="fas fa-chevron-right" /></button>
                </div>
              </div>
            </div>
            <Dialog
              baseZIndex={2000}
              style={{ width: "1150px" }}
              visible={open}
              onHide={() => handleClickClose()}
            >
              <StudentForm
                // user={categoryRef.current}
                closeForm={handleClickClose}
                onSave={() => {
                  setUserSearchParams((prev) => ({
                    ...prev,
                    timer: new Date().getTime(),
                  }));
                }}
              />
            </Dialog>
          </div>
          <footer className="footer position-absolute">
            <div className="row g-0 justify-content-between align-items-center h-100">
              <div className="col-12 col-sm-auto text-center">
                <p className="mb-0 mt-2 mt-sm-0 text-900">Thank you for creating with Phoenix<span className="d-none d-sm-inline-block" /><span className="d-none d-sm-inline-block mx-1">|</span><br className="d-sm-none" />2023 ©<a className="mx-1" href="https://themewagon.com">Themewagon</a></p>
              </div>
              <div className="col-12 col-sm-auto text-center">
                <p className="mb-0 text-600">v1.13.0</p>
              </div>
            </div>
          </footer>
        </div>
    
    </div>
  )
}
