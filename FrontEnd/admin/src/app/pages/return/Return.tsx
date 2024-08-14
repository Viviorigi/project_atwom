import React, { useState } from 'react';

export default function Return() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);

  // const handleRowClick = (return: any) => {
  //   setSelectedReturn(return);
  //   setIsModalOpen(true);
  // };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReturn(null);
  };

  return (
    <div>
        <div className="mb-9">
          <div className="row g-2 mb-4">
            <div className="col-auto">
              <h2 className="mb-0">Returns</h2>
            </div>
          </div>
          <div id="Returns" data-list="{&quot;valueNames&quot;:[&quot;student&quot;,&quot;start-time&quot;,&quot;end-time&quot;,&quot;status&quot;],&quot;page&quot;:10,&quot;pagination&quot;:true}">
          <div className="mb-4">
        <div className="row g-3">
          <div className="col-auto">
            <div className="search-box">
              <form className="position-relative" data-bs-toggle="search" data-bs-display="static"><input className="form-control search-input search" type="search" placeholder="Search customers" aria-label="Search" />
                <span className="fas fa-search search-box-icon" />
              </form>
            </div>
          </div>
          <div className="col-auto scrollbar overflow-hidden-y flex-grow-1">
            <div className="btn-group position-static" role="group">
              <div className="btn-group position-static text-nowrap"><button className="btn btn-phoenix-secondary px-7 flex-shrink-0" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"> Country<span className="fas fa-angle-down ms-2" /></button>
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
          <div className="col-auto"><button className="btn btn-primary"><span className="fas fa-plus me-2" />Add customer</button></div>
        </div>
      </div>
            <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white bReturn-top bReturn-bottom bReturn-200 position-relative top-1">
              <div className="table-responsive scrollbar-overlay mx-n1 px-1">
                <table className="table table-sm fs--1 mb-0">
                  <thead>
                    <tr>
                      <th className="sort align-middle pe-5" scope="col" data-sort="ReturnID" style={{width: '20%'}}>ReturnID</th>
                      <th className="sort align-middle pe-5" scope="col" data-sort="student" style={{width: '30%'}}>Student</th>
                      <th className="sort align-middle pe-5" scope="col" data-sort="start-time" style={{width: '18%'}}>Return Date</th>
                      <th className="sort align-middle pe-5" scope="col" data-sort="end-time" style={{width: '18%'}}>Update Time</th>
                      <th className="sort align-middle pe-5" scope="col" data-sort="status" style={{width: '20%'}}>Status</th>
                    </tr>
                  </thead>
                  <tbody className="list">
                    {/* Dữ liệu mẫu */}
                    <tr className="hover-actions-trigger btn-reveal-trigger position-static" >{/*onClick={() => handleRowClick({  })}*/}
                      <td className="Returnid align-middle">S01</td>
                      <td className="student align-middle">John Doe</td>
                      <td className="start-time align-middle">2024-08-01 10:00</td>
                      <td className="end-time align-middle">2024-08-01 12:00</td>
                      <td className="status align-middle">Completed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row align-items-center justify-content-between py-2 pe-0 fs--1">
                <div className="col-auto d-flex">
                  <p className="mb-0 d-none d-sm-block me-3 fw-semi-bold text-900" data-list-info="data-list-info" /><a className="fw-semi-bold" href="#" data-list-view="*">View all<span className="fas fa-angle-right ms-1" data-fa-transform="down-1" /></a><a className="fw-semi-bold d-none" href="#" data-list-view="less">View Less<span className="fas fa-angle-right ms-1" data-fa-transform="down-1" /></a>
                </div>
                <div className="col-auto d-flex"><button className="page-link" data-list-pagination="prev"><span className="fas fa-chevron-left" /></button>
                  <ul className="mb-0 pagination" /><button className="page-link pe-0" data-list-pagination="next"><span className="fas fa-chevron-right" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="modal" tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Return Details</h5>
                  <button type="button" className="close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="search-box mb-3">
                    <form className="position-relative" data-bs-toggle="search" data-bs-display="static">
                      <input className="form-control search-input search" type="search" placeholder="Search books" aria-label="Search" />
                      <span className="fas fa-search search-box-icon" />
                    </form>
                  </div>
                  <div className="table-responsive scrollbar-overlay">
                    <table className="table table-sm fs--1 mb-0">
                      <thead>
                        <tr>
                          <th className="sort align-middle" scope="col" style={{width: '20%'}}>Mã Sách (book_id)</th>
                          <th className="sort align-middle" scope="col" style={{width: '50%'}}>Tên sách</th>
                          <th className="sort align-middle" scope="col" style={{width: '30%'}}>Số lượng sách</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="align-middle">12345</td>
                          <td className="align-middle">The Great Gatsby</td>
                          <td className="align-middle">2</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="row align-items-center justify-content-between py-2 pe-0 fs--1">
                    <div className="col-auto d-flex">
                      <p className="mb-0 d-none d-sm-block me-3 fw-semi-bold text-900" data-list-info="data-list-info" /><a className="fw-semi-bold" href="#" data-list-view="*">View all<span className="fas fa-angle-right ms-1" data-fa-transform="down-1" /></a><a className="fw-semi-bold d-none" href="#" data-list-view="less">View Less<span className="fas fa-angle-right ms-1" data-fa-transform="down-1" /></a>
                    </div>
                    <div className="col-auto d-flex"><button className="page-link" data-list-pagination="prev"><span className="fas fa-chevron-left" /></button>
                      <ul className="mb-0 pagination" /><button className="page-link pe-0" data-list-pagination="next"><span className="fas fa-chevron-right" /></button>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}