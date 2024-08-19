import React, { useEffect, useRef, useState } from 'react'
import { BookSearch } from './book-search'
import Swal from 'sweetalert2';
import axios from 'axios';
import AddBook from './AddBook';
import { Dialog } from 'primereact/dialog';
import { toast, ToastContainer } from 'react-toastify';
import Pagination from '../../comp/common/Pagination';
import { format } from 'date-fns';
import { formatCurrency, formatDate } from "../../utils/FunctionUtils";

export default function Book() {

  const [searchDto, setSearchDto] = useState(new BookSearch('', 1, 0, new Date().getTime()))
  const [bookList, setBookList] = useState([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const bookRef = useRef<any>();
  const visible = useRef<any>(true);

  //phân trang
  const handlePageClick = (pageNumber: any) => {
    setSearchDto(() => ({
      ...searchDto,
      page: pageNumber,
    }));
  };

  const prev = () => {
    if (searchDto.page > 1) {
      setSearchDto(() => ({
        ...searchDto,
        page: searchDto.page - 1,
      }));
    }
  };
  const next = () => {
    if (searchDto.page < totalPages) {
      setSearchDto(() => ({
        ...searchDto,
        page: searchDto.page + 1,
      }));
    }
  };

  // xử lý khi chữ thay đổi
  const handleChangeText = (event: any) => {
    setSearchDto({
      ...searchDto,
      [event.target.name]: event.target.value
    });
  }

  //
  const handleKeyUpSearch = (e: any) => {
    if (e.key === "Enter") {
      setSearchDto({
        ...searchDto,
        timer: new Date().getTime(),
      });
    }
  };

  // Thêm sách
  const addBook = () => {
    bookRef.current = null;
    setShowForm(true);
  }

  // edit
  const editBook = (bookDTO: any) => {
    bookRef.current = bookDTO;
    setShowForm(true);
  }

  //delete
  //xóa
  const delBook = (id: number) => {
    Swal.fire({
      title: `Xác nhận`,
      text: `Bạn có muốn thực hiện ...`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#89B449',
      cancelButtonColor: '#E68A8C',
      confirmButtonText: `Yes`,
      cancelButtonText: `No`
    }).then((result) => {
      if (result.value) {
        let url = `http://localhost:8080/book/delete?id=${id}`;
        axios.delete(url).then((resp: any) => {
          // if (resp.data === "success") {
          toast.success("Đã xóa");
          // console.log(resp.data);
          setSearchDto({
            ...searchDto,
            timer: new Date().getTime()
          })
          // }
        }).catch((err: any) => {
          // console.log(err);
          toast.error("Xóa thất bại");
        })
      }
    })
  }

  //Lây du lieu
  useEffect(() => {
    let url = `http://localhost:8080/book/list?page=${searchDto.page}&keySearch=${searchDto.keySearch}`;
    axios.get(url).then((resp: any) => {
      // console.log(resp.data);
      if (resp.data) {
        setBookList(resp.data.content);
        setTotalPages(resp.data.totalPages);
        setTotalItems(resp.data.totalElements);
        // console.log(bookList);
      }
    }).catch((err: any) => {

    })
  }, [searchDto.page, searchDto.timer])

  // Ẩn hiện form 
  const hideForm = (isCRUD: boolean) => {
    setShowForm(false);
    if (isCRUD) {
      setSearchDto({
        ...searchDto,
        page: 1,
        timer: new Date().getTime()
      })
    }
  }


  return (
    <div>
      <div className="mb-9">
        <div className='card mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white'>
          <div className="row g-2 mb-4">
            <div className="col-auto">
              {/* title */}
              <h2 className="mt-4">List Book</h2>
            </div>
          </div>
          <div id="products" data-list="{&quot;valueNames&quot;:[&quot;customer&quot;,&quot;email&quot;,&quot;total-orders&quot;,&quot;total-spent&quot;,&quot;city&quot;,&quot;last-seen&quot;,&quot;last-order&quot;],&quot;page&quot;:10,&quot;pagination&quot;:true}">
            <div className="mb-4">
              <div className="row g-3">
                <div className="col-auto">
                  {/* Search input-------------------------------------------------------------------------------------------- */}
                  <div className="search-box d-flex">
                    {/* search input */}
                    <input className="form-control search-input search" type="search" placeholder="Search students" name="keySearch" aria-label="Search"
                      value={searchDto.keySearch || ""}
                      onChange={handleChangeText}
                      onKeyUp={handleKeyUpSearch}
                    />
                    <button className='btn btn-primary' onClick={() => {
                      setSearchDto({
                        ...searchDto,
                        page: 1,
                        timer: new Date().getTime(),
                      });
                    }}><span className="fas fa-search " /></button>
                  </div>
                </div>
                <div className="col-auto scrollbar overflow-hidden-y flex-grow-1">
                  <div className="btn-group position-static" role="group">
                    {/*------------------------Lọc theo category  */}
                    <div className="btn-group position-static text-nowrap"><button className="btn btn-phoenix-secondary px-7 flex-shrink-0" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"> Category<span className="fas fa-angle-down ms-2" /></button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="customers.html#">US</a></li>
                        <li><a className="dropdown-item" href="customers.html#">Uk</a></li>
                        <li><a className="dropdown-item" href="customers.html#">Australia</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  {/* <button className="btn btn-link text-900 me-4 px-0"><span className="fa-solid fa-file-export fs--1 me-2" />Export</button> */}
                  <button className="btn btn-primary" onClick={addBook}><span className="fas fa-plus me-2" />Add book</button>
                </div>
              </div>
            </div>
            <div className=" border-bottom border-200 position-relative top-1">
              <div className="table-responsive scrollbar-overlay mx-n1 px-1">
                <table className="table table-bordered fs--1 mb-2 mt-5">
                  <thead>
                    <tr>
                      <th className="sort align-middle text-center" scope="col" style={{ width: '3%' }}>#</th>
                      <th className="sort align-middle text-center" scope="col" style={{ width: '11%' }}>TITLE</th>
                      <th className="sort align-middle text-center" scope="col" style={{ width: '13%' }}>PUBLISHER</th>
                      <th className="sort align-middle text-end" scope="col" style={{ width: '9%' }}>PUBLISH_YEAR</th>
                      <th className="sort align-middle text-center" scope="col" style={{ width: '9%' }}>QUANTITY</th>
                      <th className="sort align-middle text-center" scope="col" style={{ width: '6%' }}>PRICE</th>
                      <th className="sort align-middle text-center" scope="col" style={{ width: '14%' }}>DESCRIPTION</th>
                      <th className="sort align-middle text-center" scope="col" style={{ width: '9%' }}>CREATE_AT</th>
                      <th className="sort align-middle text-center" scope="col" style={{ width: '9%' }}>UPDATE_AT</th>
                      <th className="sort align-middle text-center" scope="col" style={{ width: '5%' }}>ACTIVE</th>
                      <th className="sort align-middle text-center" scope="col" style={{ width: '12%' }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="list" id="customers-table-body">
                    {bookList.map((u: any, index: number) => {
                      return <tr className="hover-actions-trigger btn-reveal-trigger position-static" key={u.id} >
                        <td className='align-middle white-space-nowrap  text-700 text-end pe-3'>{index + 1}</td>
                        <td className="customer align-middle white-space-nowrap pe-5"><div className="d-flex align-items-center text-1100">
                          {/* <div className="avatar avatar-m"><img className="rounded-circle" src={u.avatar ? `http://localhost:8080/files/${u.avatar}` : defaultPersonImage} alt="PersonAvatar" /></div> */}
                          <p className="mb-0 ms-3 text-1100 fw-bold">{u.title}</p>
                        </div></td>
                        <td className="email align-middle white-space-nowrap ps-3">{u.publisher}</td>
                        <td className="total-orders align-middle white-space-nowrap fw-semi-bold text-end text-1000">{u.publicationYear}</td>
                        <td className="total-spent align-middle white-space-nowrap fw-bold text-end ps-3 text-1100">{u.quantity}</td>
                        <td className="last-seen align-middle white-space-nowrap text-700 ps-3">{formatCurrency(u.price)}</td>
                        <td className="total-spent align-middle white-space-nowrap fw-bold text-end ps-3 text-1100">{u.description}</td>
                        <td className="last-order align-middle white-space-nowrap text-700 text-end">{formatDate(u.createdDate)}</td>
                        <td className="last-order align-middle white-space-nowrap text-700 text-end">{formatDate(u.updatedDate)}</td>
                        {/* <td className="last-order align-middle white-space-nowrap text-700 text-center"><span className={u.roles == 'STUDENT' ? 'badge badge-phoenix fs--2 badge-phoenix-secondary' : 'badge badge-phoenix fs--2 badge-phoenix-info'}><span className="badge-label">{u.roles}</span></span></td> */}
                        <td className="last-order align-middle white-space-nowrap text-700 text-end">
                          <span className={u.active ? 'badge badge-phoenix fs--2 badge-phoenix-success' : 'badge badge-phoenix fs--2 badge-phoenix-danger'}><span className="badge-label">{u.isActive ? "Active" : "InActive"}</span></span>
                        </td>
                        <td className="last-order align-middle white-space-nowrap text-700 ps-5">
                          {/* <button className="btn btn-phoenix-secondary me-1 mb-1" type="button" onClick={() => info(u)}><i className="far fa-eye"></i></button> */}
                          <button className="btn btn-phoenix-primary me-1 mb-1" type="button" onClick={() => editBook(u)}><i className="fa-solid fa-pen"></i></button>
                          <button className="btn btn-phoenix-danger me-1 mb-1" type="button" onClick={() => delBook(u.id)}><i className="fa-solid fa-trash"></i></button>
                        </td>
                      </tr>
                    })}

                  </tbody>
                </table>
              </div>
              <div className="row align-items-center justify-content-between py-2 pe-0 fs--1">
                <div className="col-auto d-flex">
                  <p className="mb-0 d-none d-sm-block me-3 fw-semi-bold text-900" data-list-info="data-list-info"><span className='fw-bold'>Total books: </span>  {totalItems} </p>
                </div>
                <div className="col-auto d-flex">
                  <Pagination totalPage={totalPages} currentPage={searchDto.page} handlePageClick={handlePageClick} prev={prev} next={next} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {showForm && <AddBook hideForm={hideForm} bookDTO={bookRef.current} onSave={() => {
            setSearchDto((prev) => ({
              ...prev,
              timer: new Date().getTime(),
            }));
          }} />}
        </div>
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
  )
}
