import React, { useEffect, useRef, useState } from 'react'
import { CategorySearch } from './category-search';
import Swal from 'sweetalert2';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddCategory from './AddCategory';

export default function Category() {

  const [searchDto, setSearchDto] = useState(new CategorySearch('', 0, 0, new Date().getTime()))
  const [categoryList, setCategoryList] = useState([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(0);
  const categoryRef = useRef<any>();

  // xử lý khi chữ thay đổi
  const handleChangeText = (event: any) => {
    setSearchDto({
      ...searchDto,
      [event.target.name]: event.target.value
    });
  }

  // Thêm cate
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
        })
      }
    })
  }

  //Lây du lieu
  useEffect(() => {
    let url = `http://localhost:8080/category/list?page=${searchDto.page}&keySearch=${searchDto.keySearch}`;
    axios.get(url).then((resp: any) => {
      if (resp.data) {
        setCategoryList(resp.data.content);
        setTotalPages(resp.data.totalPages);
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
        page: 0,
        timer: new Date().getTime()
      })
    }
  }


  return (
    <div>
      <div className="content">
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
                  <div className="search-box">
                    {/* <form className="position-relative" data-bs-toggle="search" data-bs-display="static"><input className="form-control search-input search" type="search" placeholder="Tìm kiếm" aria-label="Search" /> */}
                    <form className="position-relative" data-bs-toggle="search" data-bs-display="static"><input className="form-control search-input search" type="search" placeholder="Tìm kiếm" aria-label="Search" onClick={() => {
                      setSearchDto({
                        ...searchDto,
                        page: 0,
                        timer: new Date().getTime()
                      })
                    }} />
                      <span className="fas fa-search search-box-icon" />
                    </form>
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
                    <div className="btn-group position-static text-nowrap"><button className="btn btn-sm btn-phoenix-secondary px-7 flex-shrink-0" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"> VIP<span className="fas fa-angle-down ms-2" /></button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="customers.html#">VIP 1</a></li>
                        <li><a className="dropdown-item" href="customers.html#">VIP 2</a></li>
                        <li><a className="dropdown-item" href="customers.html#">VIP 3</a></li>
                        <li />
                      </ul>
                    </div><button className="btn btn-phoenix-secondary px-7 flex-shrink-0">More filters</button>
                  </div>
                </div>
                <div className="col-auto"><button className="btn btn-link text-900 me-4 px-0"><span className="fa-solid fa-file-export fs--1 me-2" />Export</button><button className="btn btn-primary" onClick={addCategory}><span className="fas fa-plus me-2" />Add customer</button></div>
              </div>
            </div>
            <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
              <div className="table-responsive scrollbar-overlay mx-n1 px-1">
                {/* ----------------------------------------Bảng lọc dữ liệu----------------------------------------- */}
                <table className="table table-sm fs--1 mb-0">
                  <thead>
                    <tr>
                      {/* <th className="white-space-nowrap fs--1 align-middle ps-0">
                        <div className="form-check mb-0 fs-0"><input className="form-check-input" id="checkbox-bulk-customers-select" type="checkbox" data-bulk-select="{&quot;body&quot;:&quot;customers-table-body&quot;}" /></div>
                      </th> */}
                      <th className="sort align-middle pe-5" scope="col" data-sort="email" style={{ width: '5%' }}>No</th>
                      <th className="sort align-middle text-end" scope="col" data-sort="total-orders" style={{ width: '18%' }}>Name</th>
                      <th className="sort align-middle text-end ps-3" scope="col" data-sort="total-spent" style={{ width: '18%' }}>Description</th>
                      <th className="sort align-middle text-end ps-3" scope="col" data-sort="total-spent" style={{ width: '18%' }}>Number books</th>
                      <th className="sort align-middle ps-7" scope="col" data-sort="city" style={{ width: '18%' }}>Active</th>
                      <th className="sort align-middle text-end" scope="col" data-sort="last-seen" style={{ width: '18%' }}>Operator</th>
                    </tr>
                  </thead>
                  <tbody className="list" id="customers-table-body">

                    {
                      categoryList.map((e: any, index: number) => (
                        <tr key={index}>
                          <td>{e.id}</td>
                          <td className="city align-middle white-space-nowrap text-1000 ps-7">{e.name}</td>
                          <td className="city align-middle white-space-nowrap text-1000 ps-7">{e.description}</td>
                          <td className="city align-middle white-space-nowrap text-1000 ps-7">{e.books.length}</td>
                          <td className="city align-middle white-space-nowrap text-1000 ps-7">{e.deleted}</td>
                          <td>
                            <button onClick={() => { editCategory(e) }}>Edit</button>
                            <button onClick={() => delCategory(e.id)}>Del</button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <div className="row align-items-center justify-content-between py-2 pe-0 fs--1">
                <div className="col-auto d-flex">
                  <p className="mb-0 d-none d-sm-block me-3 fw-semi-bold text-900" data-list-info="data-list-info" /><a className="fw-semi-bold" href="customers.html#!" data-list-view="*">View all<span className="fas fa-angle-right ms-1" data-fa-transform="down-1" /></a><a className="fw-semi-bold d-none" href="customers.html#!" data-list-view="less">View Less<span className="fas fa-angle-right ms-1" data-fa-transform="down-1" /></a>
                </div>

                {/* -----------------------------------------------------Phân trang */}
                <div className="col-auto d-flex">
                  <button className="page-link" data-list-pagination="prev" onClick={() => {
                    setSearchDto({
                      ...searchDto,
                      page: searchDto.page - 1
                    })
                  }} disabled={searchDto.page === 0}><span className="fas fa-chevron-left" /></button>
                  <ul className="mb-0 pagination" />
                  <button className="page-link pe-0" data-list-pagination="next" onClick={() => {
                    setSearchDto({
                      ...searchDto,
                      page: searchDto.page + 1
                    })
                  }} disabled={searchDto.page >= (totalPages - 1)}><span className="fas fa-chevron-right" /></button>
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
      </div>

    </div>
  )
}
