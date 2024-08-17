import React, { useEffect, useRef, useState } from 'react'
import { CategorySearch } from './category-search'
import Swal from 'sweetalert2';
import axios from 'axios';
import AddCategory from './AddCategory';
import { Dialog } from 'primereact/dialog';
import { toast, ToastContainer } from 'react-toastify';
import Pagination from '../../comp/common/Pagination';
import { format } from 'date-fns';
import { formatCurrency, formatDate } from "../../utils/FunctionUtils";

export default function Book() {

  const [searchDto, setSearchDto] = useState(new CategorySearch('', 1, 0, new Date().getTime()))
  const [bookList, setBookList] = useState([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const categoryRef = useRef<any>();
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
  const addCategory = () => {
    categoryRef.current = null;
    setShowForm(true);
  }

  // edit
  const editCategory = (categoryDTO: any) => {
    categoryRef.current = categoryDTO;
    setShowForm(true);
  }

  //delete
  //xóa
  const delCategory = (id: number) => {
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
        let url = `http://localhost:8080/category/delete?id=${id}`;
        axios.delete(url).then((resp: any) => {
          console.log("thông báo xóa: ");
          console.log(resp.data);
          
          
          // if (resp.data === "success") {
          toast.success("Đã xóa");
          // console.log(resp.data);
          setSearchDto({
            ...searchDto,
            timer: new Date().getTime()
          })
          // }
        }).catch((err: any) => {
          console.log(err);
          toast.error("Xóa thất bại");
        })
      }
    })
  }

  //Lây du lieu
  useEffect(() => {
    let url = `http://localhost:8080/category/list?page=${searchDto.page}&keySearch=${searchDto.keySearch}`;
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
        <div className="row g-2 mb-4">
          <div className="col-auto">
            {/*----------------------------------------------------------Tiêu đề  */}
            <h2 className="mb-0">Category</h2>
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
                      page:1,
                      timer: new Date().getTime(),
                    });
                  }}><span className="fas fa-search " /></button>
                </div>
              </div>
              <div className="col-auto scrollbar overflow-hidden-y flex-grow-1">
                {/* .............................................................. */}
              </div>
              <div className="col-auto">
                <button className="btn btn-primary" onClick={addCategory}><span className="fas fa-plus me-2" />Add category</button>
              </div>
            </div>
          </div>
          <div className=" border-bottom border-200 position-relative top-1">
            <div className="table-responsive scrollbar-overlay mx-n1 px-1">
              <table className="table table-bordered fs--1 mb-2 mt-5">
                <thead>
                  <tr>
                    <th className="sort align-middle text-center" scope="col" style={{ width: '3%' }}>#</th>
                    <th className="sort align-middle text-center" scope="col" style={{ width: '11%' }}>NAME</th>
                    <th className="sort align-middle text-center" scope="col" style={{ width: '13%' }}>DESCRIPTION</th>
                    <th className="sort align-middle text-end" scope="col" style={{ width: '9%' }}>NUM_OF_BOOKS</th>
                    <th className="sort align-middle text-center" scope="col" style={{ width: '9%' }}>CREATE_AT</th>
                    <th className="sort align-middle text-center" scope="col" style={{ width: '6%' }}>UPDATE_AT</th>
                    <th className="sort align-middle text-center" scope="col" style={{ width: '14%' }}>ACTIVE</th>
                    <th className="sort align-middle text-center" scope="col" style={{ width: '9%' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody className="list" id="customers-table-body">
                  {bookList.map((u: any, index: number) => {
                    return <tr className="hover-actions-trigger btn-reveal-trigger position-static" key={u.id} >
                      <td className='align-middle white-space-nowrap  text-700 text-end pe-3'>{index + 1}</td>
                      <td className="customer align-middle white-space-nowrap pe-5"><div className="d-flex align-items-center text-1100">
                        <p className="mb-0 ms-3 text-1100 fw-bold">{u.name}</p>
                      </div></td>
                      <td className="email align-middle white-space-nowrap ps-3">{u.description}</td>
                      <td className="total-orders align-middle white-space-nowrap fw-semi-bold text-end text-1000">{u.books.length}</td>
                      <td className="last-order align-middle white-space-nowrap text-700 text-end">{formatDate(u.createdDate)}</td>
                      <td className="last-order align-middle white-space-nowrap text-700 text-end">{formatDate(u.updatedDate)}</td>
                      <td className="last-order align-middle white-space-nowrap text-700 text-end">
                        <span className={u.active ? 'badge badge-phoenix fs--2 badge-phoenix-success' : 'badge badge-phoenix fs--2 badge-phoenix-danger'}><span className="badge-label">{u.isActive ? "Active" : "InActive"}</span></span>
                      </td>
                      <td className="last-order align-middle white-space-nowrap text-700 ">
                        {/* <button className="btn btn-phoenix-secondary me-1 mb-1" type="button" onClick={() => info(u)}><i className="far fa-eye"></i></button> */}
                        <button className="btn btn-phoenix-primary me-1 mb-1" type="button" onClick={() => editCategory(u)}><i className="fa-solid fa-pen"></i></button>
                        <button className="btn btn-phoenix-danger me-1 mb-1" type="button" onClick={() => delCategory(u.id)}><i className="fa-solid fa-trash"></i></button>
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
        {showForm && <AddCategory hideForm={hideForm} categoryDTO={categoryRef.current} />}
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
    </div >
  )
}
