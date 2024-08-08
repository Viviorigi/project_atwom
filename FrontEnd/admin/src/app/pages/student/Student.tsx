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
    <ul className="nav nav-links mb-3 mb-lg-2 mx-n3">
      <li className="nav-item"><a className="nav-link active" aria-current="page" href="customers.html#"><span>All </span><span className="text-700 fw-semi-bold">(68817)</span></a></li>
      <li className="nav-item"><a className="nav-link" href="customers.html#"><span>New </span><span className="text-700 fw-semi-bold">(6)</span></a></li>
      <li className="nav-item"><a className="nav-link" href="customers.html#"><span>Abandoned checkouts </span><span className="text-700 fw-semi-bold">(17)</span></a></li>
      <li className="nav-item"><a className="nav-link" href="customers.html#"><span>Locals </span><span className="text-700 fw-semi-bold">(6,810)</span></a></li>
      <li className="nav-item"><a className="nav-link" href="customers.html#"><span>Email subscribers </span><span className="text-700 fw-semi-bold">(8)</span></a></li>
      <li className="nav-item"><a className="nav-link" href="customers.html#"><span>Top reviews </span><span className="text-700 fw-semi-bold">(2)</span></a></li>
    </ul>
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
              <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                <td className="fs--1 align-middle ps-0 py-3">
                  <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;customer&quot;:{&quot;avatar&quot;:&quot;/team/35.webp&quot;,&quot;name&quot;:&quot;Stanly Drinkwater&quot;},&quot;email&quot;:&quot;stnlwasser@hotmail.com&quot;,&quot;city&quot;:&quot;Smallville&quot;,&quot;totalOrders&quot;:69,&quot;totalSpent&quot;:19872,&quot;lastSeen&quot;:&quot;43 min ago&quot;,&quot;lastOrder&quot;:&quot;Dec 4, 12:56 PM&quot;}" /></div>
                </td>
                <td className="customer align-middle white-space-nowrap pe-5"><a className="d-flex align-items-center text-1100" href="../landing/profile.html">
                    <div className="avatar avatar-m"><img className="rounded-circle" src="https://prium.github.io/phoenix/v1.13.0/assets/img/team/35.webp" alt="" /></div>
                    <p className="mb-0 ms-3 text-1100 fw-bold">Stanly Drinkwater</p>
                  </a></td>
                <td className="email align-middle white-space-nowrap pe-5"><a className="fw-semi-bold" href="mailto:stnlwasser@hotmail.com">stnlwasser@hotmail.com</a></td>
                <td className="total-orders align-middle white-space-nowrap fw-semi-bold text-end text-1000">69</td>
                <td className="total-spent align-middle white-space-nowrap fw-bold text-end ps-3 text-1100">$ 19872</td>
                <td className="city align-middle white-space-nowrap text-1000 ps-7">Smallville</td>
                <td className="last-seen align-middle white-space-nowrap text-700 text-end">43 min ago</td>
                <td className="last-order align-middle white-space-nowrap text-700 text-end">Dec 4, 12:56 PM</td>
              </tr>
              <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                <td className="fs--1 align-middle ps-0 py-3">
                  <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;customer&quot;:{&quot;avatar&quot;:&quot;/team/57.webp&quot;,&quot;name&quot;:&quot;Josef Stravinsky&quot;},&quot;email&quot;:&quot;Josefsky@sni.it&quot;,&quot;city&quot;:&quot;Metropolis&quot;,&quot;totalOrders&quot;:67,&quot;totalSpent&quot;:17996,&quot;lastSeen&quot;:&quot;2 hours ago&quot;,&quot;lastOrder&quot;:&quot;Dec 1,  4:07 AM&quot;}" /></div>
                </td>
                <td className="customer align-middle white-space-nowrap pe-5"><a className="d-flex align-items-center text-1100" href="../landing/profile.html">
                    <div className="avatar avatar-m"><img className="rounded-circle" src="../../../assets/img/team/57.webp" alt="" /></div>
                    <p className="mb-0 ms-3 text-1100 fw-bold">Josef Stravinsky</p>
                  </a></td>
                <td className="email align-middle white-space-nowrap pe-5"><a className="fw-semi-bold" href="mailto:Josefsky@sni.it">Josefsky@sni.it</a></td>
                <td className="total-orders align-middle white-space-nowrap fw-semi-bold text-end text-1000">67</td>
                <td className="total-spent align-middle white-space-nowrap fw-bold text-end ps-3 text-1100">$ 17996</td>
                <td className="city align-middle white-space-nowrap text-1000 ps-7">Metropolis</td>
                <td className="last-seen align-middle white-space-nowrap text-700 text-end">2 hours ago</td>
                <td className="last-order align-middle white-space-nowrap text-700 text-end">Dec 1, 4:07 AM</td>
              </tr>
              <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                <td className="fs--1 align-middle ps-0 py-3">
                  <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;customer&quot;:{&quot;avatar&quot;:&quot;/team/58.webp&quot;,&quot;name&quot;:&quot;Igor Borvibson&quot;},&quot;email&quot;:&quot;vibigorr@technext.it&quot;,&quot;city&quot;:&quot;Central city&quot;,&quot;totalOrders&quot;:61,&quot;totalSpent&quot;:16785,&quot;lastSeen&quot;:&quot;5 days ago&quot;,&quot;lastOrder&quot;:&quot;Nov 28, 7:28 PM&quot;}" /></div>
                </td>
                <td className="customer align-middle white-space-nowrap pe-5"><a className="d-flex align-items-center text-1100" href="../landing/profile.html">
                    <div className="avatar avatar-m"><img className="rounded-circle" src="../../../assets/img/team/58.webp" alt="" /></div>
                    <p className="mb-0 ms-3 text-1100 fw-bold">Igor Borvibson</p>
                  </a></td>
                <td className="email align-middle white-space-nowrap pe-5"><a className="fw-semi-bold" href="mailto:vibigorr@technext.it">vibigorr@technext.it</a></td>
                <td className="total-orders align-middle white-space-nowrap fw-semi-bold text-end text-1000">61</td>
                <td className="total-spent align-middle white-space-nowrap fw-bold text-end ps-3 text-1100">$ 16785</td>
                <td className="city align-middle white-space-nowrap text-1000 ps-7">Central city</td>
                <td className="last-seen align-middle white-space-nowrap text-700 text-end">5 days ago</td>
                <td className="last-order align-middle white-space-nowrap text-700 text-end">Nov 28, 7:28 PM</td>
              </tr>
              <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                <td className="fs--1 align-middle ps-0 py-3">
                  <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;customer&quot;:{&quot;avatar&quot;:&quot;/team/59.webp&quot;,&quot;name&quot;:&quot;Katerina Karenin&quot;},&quot;email&quot;:&quot;karkat99@gmail.com&quot;,&quot;city&quot;:&quot;Gotham&quot;,&quot;totalOrders&quot;:58,&quot;totalSpent&quot;:14956,&quot;lastSeen&quot;:&quot;2 weeks ago&quot;,&quot;lastOrder&quot;:&quot;Nov 24, 10:16 AM&quot;}" /></div>
                </td>
                <td className="customer align-middle white-space-nowrap pe-5"><a className="d-flex align-items-center text-1100" href="../landing/profile.html">
                    <div className="avatar avatar-m"><img className="rounded-circle" src="https://prium.github.io/phoenix/v1.13.0/assets/img/team/59.webp" alt="" /></div>
                    <p className="mb-0 ms-3 text-1100 fw-bold">Katerina Karenin</p>
                  </a></td>
                <td className="email align-middle white-space-nowrap pe-5"><a className="fw-semi-bold" href="mailto:karkat99@gmail.com">karkat99@gmail.com</a></td>
                <td className="total-orders align-middle white-space-nowrap fw-semi-bold text-end text-1000">58</td>
                <td className="total-spent align-middle white-space-nowrap fw-bold text-end ps-3 text-1100">$ 14956</td>
                <td className="city align-middle white-space-nowrap text-1000 ps-7">Gotham</td>
                <td className="last-seen align-middle white-space-nowrap text-700 text-end">2 weeks ago</td>
                <td className="last-order align-middle white-space-nowrap text-700 text-end">Nov 24, 10:16 AM</td>
              </tr>
              <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                <td className="fs--1 align-middle ps-0 py-3">
                  <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;customer&quot;:{&quot;avatar&quot;:&quot;&quot;,&quot;name&quot;:&quot;Roy Anderson&quot;},&quot;email&quot;:&quot;andersonroy@netflix.chill&quot;,&quot;city&quot;:&quot;Vancouver&quot;,&quot;totalOrders&quot;:52,&quot;totalSpent&quot;:12509,&quot;lastSeen&quot;:&quot;4 days ago&quot;,&quot;lastOrder&quot;:&quot;Nov 18, 5:43 PM&quot;}" /></div>
                </td>
                <td className="customer align-middle white-space-nowrap pe-5"><a className="d-flex align-items-center text-1100" href="../landing/profile.html">
                    <div className="avatar avatar-m">
                      <div className="avatar-name rounded-circle"><span>R</span></div>
                    </div>
                    <p className="mb-0 ms-3 text-1100 fw-bold">Roy Anderson</p>
                  </a></td>
                <td className="email align-middle white-space-nowrap pe-5"><a className="fw-semi-bold" href="mailto:andersonroy@netflix.chill">andersonroy@netflix.chill</a></td>
                <td className="total-orders align-middle white-space-nowrap fw-semi-bold text-end text-1000">52</td>
                <td className="total-spent align-middle white-space-nowrap fw-bold text-end ps-3 text-1100">$ 12509</td>
                <td className="city align-middle white-space-nowrap text-1000 ps-7">Vancouver</td>
                <td className="last-seen align-middle white-space-nowrap text-700 text-end">4 days ago</td>
                <td className="last-order align-middle white-space-nowrap text-700 text-end">Nov 18, 5:43 PM</td>
              </tr>
              <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                <td className="fs--1 align-middle ps-0 py-3">
                  <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;customer&quot;:{&quot;avatar&quot;:&quot;/team/31.webp&quot;,&quot;name&quot;:&quot;Martina scorcese&quot;},&quot;email&quot;:&quot;cesetina1@gmail.com&quot;,&quot;city&quot;:&quot;Viena&quot;,&quot;totalOrders&quot;:49,&quot;totalSpent&quot;:11003,&quot;lastSeen&quot;:&quot;6 min ago&quot;,&quot;lastOrder&quot;:&quot;Nov 18, 2:09 AM&quot;}" /></div>
                </td>
                <td className="customer align-middle white-space-nowrap pe-5"><a className="d-flex align-items-center text-1100" href="../landing/profile.html">
                    <div className="avatar avatar-m"><img className="rounded-circle" src="https://prium.github.io/phoenix/v1.13.0/assets/img/team/31.webp" alt="" /></div>
                    <p className="mb-0 ms-3 text-1100 fw-bold">Martina scorcese</p>
                  </a></td>
                <td className="email align-middle white-space-nowrap pe-5"><a className="fw-semi-bold" href="mailto:cesetina1@gmail.com">cesetina1@gmail.com</a></td>
                <td className="total-orders align-middle white-space-nowrap fw-semi-bold text-end text-1000">49</td>
                <td className="total-spent align-middle white-space-nowrap fw-bold text-end ps-3 text-1100">$ 11003</td>
                <td className="city align-middle white-space-nowrap text-1000 ps-7">Viena</td>
                <td className="last-seen align-middle white-space-nowrap text-700 text-end">6 min ago</td>
                <td className="last-order align-middle white-space-nowrap text-700 text-end">Nov 18, 2:09 AM</td>
              </tr>
              <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                <td className="fs--1 align-middle ps-0 py-3">
                  <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;customer&quot;:{&quot;avatar&quot;:&quot;/team/33.webp&quot;,&quot;name&quot;:&quot;Luis Bunuel&quot;},&quot;email&quot;:&quot;luisuel@live.com&quot;,&quot;city&quot;:&quot;Bangalore&quot;,&quot;totalOrders&quot;:44,&quot;totalSpent&quot;:7897,&quot;lastSeen&quot;:&quot;56 min ago&quot;,&quot;lastOrder&quot;:&quot;Nov 16, 3:22 PM&quot;}" /></div>
                </td>
                <td className="customer align-middle white-space-nowrap pe-5"><a className="d-flex align-items-center text-1100" href="../landing/profile.html">
                    <div className="avatar avatar-m"><img className="rounded-circle" src="https://prium.github.io/phoenix/v1.13.0/assets/img/team/33.webp" alt="" /></div>
                    <p className="mb-0 ms-3 text-1100 fw-bold">Luis Bunuel</p>
                  </a></td>
                <td className="email align-middle white-space-nowrap pe-5"><a className="fw-semi-bold" href="mailto:luisuel@live.com">luisuel@live.com</a></td>
                <td className="total-orders align-middle white-space-nowrap fw-semi-bold text-end text-1000">44</td>
                <td className="total-spent align-middle white-space-nowrap fw-bold text-end ps-3 text-1100">$ 7897</td>
                <td className="city align-middle white-space-nowrap text-1000 ps-7">Bangalore</td>
                <td className="last-seen align-middle white-space-nowrap text-700 text-end">56 min ago</td>
                <td className="last-order align-middle white-space-nowrap text-700 text-end">Nov 16, 3:22 PM</td>
              </tr>
              <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                <td className="fs--1 align-middle ps-0 py-3">
                  <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;customer&quot;:{&quot;avatar&quot;:&quot;/team/34.webp&quot;,&quot;name&quot;:&quot;Jean Renoir&quot;},&quot;email&quot;:&quot;renoirjean1836@gmail.com&quot;,&quot;city&quot;:&quot;Chittagong&quot;,&quot;totalOrders&quot;:37,&quot;totalSpent&quot;:7781,&quot;lastSeen&quot;:&quot;Yesterday&quot;,&quot;lastOrder&quot;:&quot;Nov 09, 8:49 AM&quot;}" /></div>
                </td>
                <td className="customer align-middle white-space-nowrap pe-5"><a className="d-flex align-items-center text-1100" href="../landing/profile.html">
                    <div className="avatar avatar-m"><img className="rounded-circle" src="../../../assets/img/team/34.webp" alt="" /></div>
                    <p className="mb-0 ms-3 text-1100 fw-bold">Jean Renoir</p>
                  </a></td>
                <td className="email align-middle white-space-nowrap pe-5"><a className="fw-semi-bold" href="mailto:renoirjean1836@gmail.com">renoirjean1836@gmail.com</a></td>
                <td className="total-orders align-middle white-space-nowrap fw-semi-bold text-end text-1000">37</td>
                <td className="total-spent align-middle white-space-nowrap fw-bold text-end ps-3 text-1100">$ 7781</td>
                <td className="city align-middle white-space-nowrap text-1000 ps-7">Chittagong</td>
                <td className="last-seen align-middle white-space-nowrap text-700 text-end">Yesterday</td>
                <td className="last-order align-middle white-space-nowrap text-700 text-end">Nov 09, 8:49 AM</td>
              </tr>
              <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                <td className="fs--1 align-middle ps-0 py-3">
                  <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;customer&quot;:{&quot;avatar&quot;:&quot;/team/29.webp&quot;,&quot;name&quot;:&quot;Ricky Antony&quot;},&quot;email&quot;:&quot;ricky@example.com&quot;,&quot;city&quot;:&quot;New Jersey&quot;,&quot;totalOrders&quot;:33,&quot;totalSpent&quot;:7825,&quot;lastSeen&quot;:&quot;1 hour ago&quot;,&quot;lastOrder&quot;:&quot;Oct 19, 8:00 AM&quot;}" /></div>
                </td>
                <td className="customer align-middle white-space-nowrap pe-5"><a className="d-flex align-items-center text-1100" href="../landing/profile.html">
                    <div className="avatar avatar-m"><img className="rounded-circle" src="../../../assets/img/team/29.webp" alt="" /></div>
                    <p className="mb-0 ms-3 text-1100 fw-bold">Ricky Antony</p>
                  </a></td>
                <td className="email align-middle white-space-nowrap pe-5"><a className="fw-semi-bold" href="mailto:ricky@example.com">ricky@example.com</a></td>
                <td className="total-orders align-middle white-space-nowrap fw-semi-bold text-end text-1000">33</td>
                <td className="total-spent align-middle white-space-nowrap fw-bold text-end ps-3 text-1100">$ 7825</td>
                <td className="city align-middle white-space-nowrap text-1000 ps-7">New Jersey</td>
                <td className="last-seen align-middle white-space-nowrap text-700 text-end">1 hour ago</td>
                <td className="last-order align-middle white-space-nowrap text-700 text-end">Oct 19, 8:00 AM</td>
              </tr>
              <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                <td className="fs--1 align-middle ps-0 py-3">
                  <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;customer&quot;:{&quot;avatar&quot;:&quot;/team/3.webp&quot;,&quot;name&quot;:&quot;Emma Watson&quot;},&quot;email&quot;:&quot;emma@example.com&quot;,&quot;city&quot;:&quot;New York&quot;,&quot;totalOrders&quot;:45,&quot;totalSpent&quot;:18975,&quot;lastSeen&quot;:&quot;6 hours ago&quot;,&quot;lastOrder&quot;:&quot;Oct 15, 12:00 PM&quot;}" /></div>
                </td>
                <td className="customer align-middle white-space-nowrap pe-5"><a className="d-flex align-items-center text-1100" href="../landing/profile.html">
                    <div className="avatar avatar-m"><img className="rounded-circle" src="https://prium.github.io/phoenix/v1.13.0/assets/img/team/3.webp" alt="" /></div>
                    <p className="mb-0 ms-3 text-1100 fw-bold">Emma Watson</p>
                  </a></td>
                <td className="email align-middle white-space-nowrap pe-5"><a className="fw-semi-bold" href="mailto:emma@example.com">emma@example.com</a></td>
                <td className="total-orders align-middle white-space-nowrap fw-semi-bold text-end text-1000">45</td>
                <td className="total-spent align-middle white-space-nowrap fw-bold text-end ps-3 text-1100">$ 18975</td>
                <td className="city align-middle white-space-nowrap text-1000 ps-7">New York</td>
                <td className="last-seen align-middle white-space-nowrap text-700 text-end">6 hours ago</td>
                <td className="last-order align-middle white-space-nowrap text-700 text-end">Oct 15, 12:00 PM</td>
              </tr>
              <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                <td className="fs--1 align-middle ps-0 py-3">
                  <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;customer&quot;:{&quot;avatar&quot;:&quot;/team/avatar.webp&quot;,&quot;name&quot;:&quot;Jennifer Schramm&quot;,&quot;placeholder&quot;:true},&quot;email&quot;:&quot;jennifer@example.com&quot;,&quot;city&quot;:&quot;Charlotte&quot;,&quot;totalOrders&quot;:39,&quot;totalSpent&quot;:8967,&quot;lastSeen&quot;:&quot;12 hours ago&quot;,&quot;lastOrder&quot;:&quot;Oct 12, 11:00 AM&quot;}" /></div>
                </td>
                <td className="customer align-middle white-space-nowrap pe-5"><a className="d-flex align-items-center text-1100" href="../landing/profile.html">
                    <div className="avatar avatar-m"><img className="rounded-circle avatar-placeholder" src="https://prium.github.io/phoenix/v1.13.0/assets/img/team/avatar.webp" alt="" /></div>
                    <p className="mb-0 ms-3 text-1100 fw-bold">Jennifer Schramm</p>
                  </a></td>
                <td className="email align-middle white-space-nowrap pe-5"><a className="fw-semi-bold" href="mailto:jennifer@example.com">jennifer@example.com</a></td>
                <td className="total-orders align-middle white-space-nowrap fw-semi-bold text-end text-1000">39</td>
                <td className="total-spent align-middle white-space-nowrap fw-bold text-end ps-3 text-1100">$ 8967</td>
                <td className="city align-middle white-space-nowrap text-1000 ps-7">Charlotte</td>
                <td className="last-seen align-middle white-space-nowrap text-700 text-end">12 hours ago</td>
                <td className="last-order align-middle white-space-nowrap text-700 text-end">Oct 12, 11:00 AM</td>
              </tr>
              <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                <td className="fs--1 align-middle ps-0 py-3">
                  <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;customer&quot;:{&quot;avatar&quot;:&quot;/team/32.webp&quot;,&quot;name&quot;:&quot;Raymond Mims&quot;},&quot;email&quot;:&quot;raymond@example.com&quot;,&quot;city&quot;:&quot;Artesia&quot;,&quot;totalOrders&quot;:30,&quot;totalSpent&quot;:14587,&quot;lastSeen&quot;:&quot;2 day ago&quot;,&quot;lastOrder&quot;:&quot;Oct 10, 8:30 AM&quot;}" /></div>
                </td>
                <td className="customer align-middle white-space-nowrap pe-5"><a className="d-flex align-items-center text-1100" href="../landing/profile.html">
                    <div className="avatar avatar-m"><img className="rounded-circle" src="https://prium.github.io/phoenix/v1.13.0/assets/img/team/32.webp" alt="" /></div>
                    <p className="mb-0 ms-3 text-1100 fw-bold">Raymond Mims</p>
                  </a></td>
                <td className="email align-middle white-space-nowrap pe-5"><a className="fw-semi-bold" href="mailto:raymond@example.com">raymond@example.com</a></td>
                <td className="total-orders align-middle white-space-nowrap fw-semi-bold text-end text-1000">30</td>
                <td className="total-spent align-middle white-space-nowrap fw-bold text-end ps-3 text-1100">$ 14587</td>
                <td className="city align-middle white-space-nowrap text-1000 ps-7">Artesia</td>
                <td className="last-seen align-middle white-space-nowrap text-700 text-end">2 day ago</td>
                <td className="last-order align-middle white-space-nowrap text-700 text-end">Oct 10, 8:30 AM</td>
              </tr>
              <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                <td className="fs--1 align-middle ps-0 py-3">
                  <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;customer&quot;:{&quot;avatar&quot;:&quot;/team/25.webp&quot;,&quot;name&quot;:&quot;Michael Jenkins&quot;},&quot;email&quot;:&quot;jenkins@example.com&quot;,&quot;city&quot;:&quot;Philadelphia&quot;,&quot;totalOrders&quot;:43,&quot;totalSpent&quot;:45697,&quot;lastSeen&quot;:&quot;12 hours ago&quot;,&quot;lastOrder&quot;:&quot;Oct 3, 8:30 AM&quot;}" /></div>
                </td>
                <td className="customer align-middle white-space-nowrap pe-5"><a className="d-flex align-items-center text-1100" href="../landing/profile.html">
                    <div className="avatar avatar-m"><img className="rounded-circle" src="../../../assets/img/team/25.webp" alt="" /></div>
                    <p className="mb-0 ms-3 text-1100 fw-bold">Michael Jenkins</p>
                  </a></td>
                <td className="email align-middle white-space-nowrap pe-5"><a className="fw-semi-bold" href="mailto:jenkins@example.com">jenkins@example.com</a></td>
                <td className="total-orders align-middle white-space-nowrap fw-semi-bold text-end text-1000">43</td>
                <td className="total-spent align-middle white-space-nowrap fw-bold text-end ps-3 text-1100">$ 45697</td>
                <td className="city align-middle white-space-nowrap text-1000 ps-7">Philadelphia</td>
                <td className="last-seen align-middle white-space-nowrap text-700 text-end">12 hours ago</td>
                <td className="last-order align-middle white-space-nowrap text-700 text-end">Oct 3, 8:30 AM</td>
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
