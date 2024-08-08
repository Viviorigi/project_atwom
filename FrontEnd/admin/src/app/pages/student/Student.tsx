import React from 'react'

export default function Student() {
  return (
    <div>
     <div className="content">
  <div className="mb-9">
    <div className="row g-2 mb-4">
      <div className="col-auto">
        <h2 className="mb-0">Customers</h2>
      </div>
    </div>
    <div id="products" data-list="{&quot;valueNames&quot;:[&quot;customer&quot;,&quot;email&quot;,&quot;total-orders&quot;,&quot;total-spent&quot;,&quot;city&quot;,&quot;last-seen&quot;,&quot;last-order&quot;],&quot;page&quot;:10,&quot;pagination&quot;:true}">
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
          <div className="col-auto"><button className="btn btn-link text-900 me-4 px-0"><span className="fa-solid fa-file-export fs--1 me-2" />Export</button><button className="btn btn-primary"><span className="fas fa-plus me-2" />Add customer</button></div>
        </div>
      </div>
      <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
        <div className="table-responsive scrollbar-overlay mx-n1 px-1">
          <table className="table table-sm fs--1 mb-0">
            <thead>
              <tr>
                <th className="white-space-nowrap fs--1 align-middle ps-0">
                  <div className="form-check mb-0 fs-0"><input className="form-check-input" id="checkbox-bulk-customers-select" type="checkbox" data-bulk-select="{&quot;body&quot;:&quot;customers-table-body&quot;}" /></div>
                </th>
                <th className="sort align-middle pe-5" scope="col" data-sort="customer" style={{width: '10%'}}>CUSTOMER</th>
                <th className="sort align-middle pe-5" scope="col" data-sort="email" style={{width: '20%'}}>EMAIL</th>
                <th className="sort align-middle text-end" scope="col" data-sort="total-orders" style={{width: '10%'}}>ORDERS</th>
                <th className="sort align-middle text-end ps-3" scope="col" data-sort="total-spent" style={{width: '10%'}}>TOTAL SPENT</th>
                <th className="sort align-middle ps-7" scope="col" data-sort="city" style={{width: '25%'}}>CITY</th>
                <th className="sort align-middle text-end" scope="col" data-sort="last-seen" style={{width: '15%'}}>LAST SEEN</th>
                <th className="sort align-middle text-end pe-0" scope="col" data-sort="last-order" style={{width: '10%', minWidth: 150}}>LAST ORDER</th>
              </tr>
            </thead>
            <tbody className="list" id="customers-table-body">
              <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                <td className="fs--1 align-middle ps-0 py-3">
                  <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;customer&quot;:{&quot;avatar&quot;:&quot;/team/32.webp&quot;,&quot;name&quot;:&quot;Carry Anna&quot;},&quot;email&quot;:&quot;annac34@gmail.com&quot;,&quot;city&quot;:&quot;Budapest&quot;,&quot;totalOrders&quot;:89,&quot;totalSpent&quot;:23987,&quot;lastSeen&quot;:&quot;34 min ago&quot;,&quot;lastOrder&quot;:&quot;Dec 12, 12:56 PM&quot;}" /></div>
                </td>
                <td className="customer align-middle white-space-nowrap pe-5"><a className="d-flex align-items-center text-1100" href="../landing/profile.html">
                    <div className="avatar avatar-m"><img className="rounded-circle" src="https://prium.github.io/phoenix/v1.13.0/assets/img/team/32.webp" alt="" /></div>
                    <p className="mb-0 ms-3 text-1100 fw-bold">Carry Anna</p>
                  </a></td>
                <td className="email align-middle white-space-nowrap pe-5"><a className="fw-semi-bold" href="mailto:annac34@gmail.com">annac34@gmail.com</a></td>
                <td className="total-orders align-middle white-space-nowrap fw-semi-bold text-end text-1000">89</td>
                <td className="total-spent align-middle white-space-nowrap fw-bold text-end ps-3 text-1100">$ 23987</td>
                <td className="city align-middle white-space-nowrap text-1000 ps-7">Budapest</td>
                <td className="last-seen align-middle white-space-nowrap text-700 text-end">34 min ago</td>
                <td className="last-order align-middle white-space-nowrap text-700 text-end">Dec 12, 12:56 PM</td>
              </tr>
              <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                <td className="fs--1 align-middle ps-0 py-3">
                  <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;customer&quot;:{&quot;avatar&quot;:&quot;/team/avatar.webp&quot;,&quot;name&quot;:&quot;Milind Mikuja&quot;,&quot;placeholder&quot;:true},&quot;email&quot;:&quot;mimiku@yahoo.com&quot;,&quot;city&quot;:&quot;Manchester&quot;,&quot;totalOrders&quot;:76,&quot;totalSpent&quot;:21567,&quot;lastSeen&quot;:&quot;6 hours ago&quot;,&quot;lastOrder&quot;:&quot;Dec 9, 2:28 PM&quot;}" /></div>
                </td>
                <td className="customer align-middle white-space-nowrap pe-5"><a className="d-flex align-items-center text-1100" href="../landing/profile.html">
                    <div className="avatar avatar-m"><img className="rounded-circle avatar-placeholder" src="https://prium.github.io/phoenix/v1.13.0/assets/img/team/avatar.webp" alt="" /></div>
                    <p className="mb-0 ms-3 text-1100 fw-bold">Milind Mikuja</p>
                  </a></td>
                <td className="email align-middle white-space-nowrap pe-5"><a className="fw-semi-bold" href="mailto:mimiku@yahoo.com">mimiku@yahoo.com</a></td>
                <td className="total-orders align-middle white-space-nowrap fw-semi-bold text-end text-1000">76</td>
                <td className="total-spent align-middle white-space-nowrap fw-bold text-end ps-3 text-1100">$ 21567</td>
                <td className="city align-middle white-space-nowrap text-1000 ps-7">Manchester</td>
                <td className="last-seen align-middle white-space-nowrap text-700 text-end">6 hours ago</td>
                <td className="last-order align-middle white-space-nowrap text-700 text-end">Dec 9, 2:28 PM</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row align-items-center justify-content-between py-2 pe-0 fs--1">
          <div className="col-auto d-flex">
            <p className="mb-0 d-none d-sm-block me-3 fw-semi-bold text-900" data-list-info="data-list-info" /><a className="fw-semi-bold" href="customers.html#!" data-list-view="*">View all<span className="fas fa-angle-right ms-1" data-fa-transform="down-1" /></a><a className="fw-semi-bold d-none" href="customers.html#!" data-list-view="less">View Less<span className="fas fa-angle-right ms-1" data-fa-transform="down-1" /></a>
          </div>
          <div className="col-auto d-flex"><button className="page-link" data-list-pagination="prev"><span className="fas fa-chevron-left" /></button>
            <ul className="mb-0 pagination" /><button className="page-link pe-0" data-list-pagination="next"><span className="fas fa-chevron-right" /></button>
          </div>
        </div>
      </div>
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

    </div>
  )
}
