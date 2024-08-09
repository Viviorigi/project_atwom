import React from 'react'

export default function DashBoard() {
  return (
    <>
      <div className="content">
        <div className="pb-5">
          <div className="row g-4">
            <div className="col-12 col-xxl-6">
              <div className="mb-8">
                <h2 className="mb-2">Ecommerce Dashboard</h2>
                <h5 className="text-700 fw-semi-bold">Here’s what’s going on at your business right now</h5>
              </div>
              <div className="row align-items-center g-4">
                <div className="col-12 col-md-auto">
                  <div className="d-flex align-items-center"><span className="fa-stack" style={{ minHeight: 46, minWidth: 46 }}><span className="fa-solid fa-square fa-stack-2x text-success-300" data-fa-transform="down-4 rotate--10 left-4" /><span className="fa-solid fa-circle fa-stack-2x stack-circle text-success-100" data-fa-transform="up-4 right-3 grow-2" /><span className="fa-stack-1x fa-solid fa-star text-success " data-fa-transform="shrink-2 up-8 right-6" /></span>
                    <div className="ms-3">
                      <h4 className="mb-0">57 new orders</h4>
                      <p className="text-800 fs--1 mb-0">Awating processing</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-auto">
                  <div className="d-flex align-items-center"><span className="fa-stack" style={{ minHeight: 46, minWidth: 46 }}><span className="fa-solid fa-square fa-stack-2x text-warning-300" data-fa-transform="down-4 rotate--10 left-4" /><span className="fa-solid fa-circle fa-stack-2x stack-circle text-warning-100" data-fa-transform="up-4 right-3 grow-2" /><span className="fa-stack-1x fa-solid fa-pause text-warning " data-fa-transform="shrink-2 up-8 right-6" /></span>
                    <div className="ms-3">
                      <h4 className="mb-0">5 orders</h4>
                      <p className="text-800 fs--1 mb-0">On hold</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-auto">
                  <div className="d-flex align-items-center"><span className="fa-stack" style={{ minHeight: 46, minWidth: 46 }}><span className="fa-solid fa-square fa-stack-2x text-danger-300" data-fa-transform="down-4 rotate--10 left-4" /><span className="fa-solid fa-circle fa-stack-2x stack-circle text-danger-100" data-fa-transform="up-4 right-3 grow-2" /><span className="fa-stack-1x fa-solid fa-xmark text-danger " data-fa-transform="shrink-2 up-8 right-6" /></span>
                    <div className="ms-3">
                      <h4 className="mb-0">15 products</h4>
                      <p className="text-800 fs--1 mb-0">Out of stock</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="bg-200 mb-6 mt-4" />
              <div className="row flex-between-center mb-4 g-3">
                <div className="col-auto">
                  <h3>Total sells</h3>
                  <p className="text-700 lh-sm mb-0">Payment received across all channels</p>
                </div>
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
            <div className="col-12 col-xxl-6">
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5 className="mb-1">Total orders<span className="badge badge-phoenix badge-phoenix-warning rounded-pill fs--1 ms-2"><span className="badge-label">-6.8%</span></span></h5>
                          <h6 className="text-700">Last 7 days</h6>
                        </div>
                        <h4>16,247</h4>
                      </div>
                      <div className="d-flex justify-content-center px-4 py-6">
                        <div className="echart-total-orders" style={{ height: 85, width: 115 }} />
                      </div>
                      <div className="mt-2">
                        <div className="d-flex align-items-center mb-2">
                          <div className="bullet-item bg-primary me-2" />
                          <h6 className="text-900 fw-semi-bold flex-1 mb-0">Completed</h6>
                          <h6 className="text-900 fw-semi-bold mb-0">52%</h6>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="bullet-item bg-primary-100 me-2" />
                          <h6 className="text-900 fw-semi-bold flex-1 mb-0">Pending payment</h6>
                          <h6 className="text-900 fw-semi-bold mb-0">48%</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5 className="mb-1">New customers<span className="badge badge-phoenix badge-phoenix-warning rounded-pill fs--1 ms-2"> <span className="badge-label">+26.5%</span></span></h5>
                          <h6 className="text-700">Last 7 days</h6>
                        </div>
                        <h4>356</h4>
                      </div>
                      <div className="pb-0 pt-4">
                        <div className="echarts-new-customers" style={{ height: 180, width: '100%' }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5 className="mb-2">Top coupons</h5>
                          <h6 className="text-700">Last 7 days</h6>
                        </div>
                      </div>
                      <div className="pb-4 pt-3">
                        <div className="echart-top-coupons" style={{ height: 115, width: '100%' }} />
                      </div>
                      <div>
                        <div className="d-flex align-items-center mb-2">
                          <div className="bullet-item bg-primary me-2" />
                          <h6 className="text-900 fw-semi-bold flex-1 mb-0">Percentage discount</h6>
                          <h6 className="text-900 fw-semi-bold mb-0">72%</h6>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div className="bullet-item bg-primary-200 me-2" />
                          <h6 className="text-900 fw-semi-bold flex-1 mb-0">Fixed card discount</h6>
                          <h6 className="text-900 fw-semi-bold mb-0">18%</h6>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="bullet-item bg-info-500 me-2" />
                          <h6 className="text-900 fw-semi-bold flex-1 mb-0">Fixed product discount</h6>
                          <h6 className="text-900 fw-semi-bold mb-0">10%</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="card h-100">
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5 className="mb-2">Paying vs non paying</h5>
                          <h6 className="text-700">Last 7 days</h6>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center pt-3 flex-1">
                        <div className="echarts-paying-customer-chart" style={{ height: '100%', width: '100%' }} />
                      </div>
                      <div className="mt-3">
                        <div className="d-flex align-items-center mb-2">
                          <div className="bullet-item bg-primary me-2" />
                          <h6 className="text-900 fw-semi-bold flex-1 mb-0">Paying customer</h6>
                          <h6 className="text-900 fw-semi-bold mb-0">30%</h6>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="bullet-item bg-primary-100 me-2" />
                          <h6 className="text-900 fw-semi-bold flex-1 mb-0">Non-paying customer</h6>
                          <h6 className="text-900 fw-semi-bold mb-0">70%</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white pt-7 border-y border-300">
          <div data-list="{&quot;valueNames&quot;:[&quot;product&quot;,&quot;customer&quot;,&quot;rating&quot;,&quot;review&quot;,&quot;time&quot;],&quot;page&quot;:6}">
            <div className="row align-items-end justify-content-between pb-5 g-3">
              <div className="col-auto">
                <h3>Latest reviews</h3>
                <p className="text-700 lh-sm mb-0">Payment received across all channels</p>
              </div>
              <div className="col-12 col-md-auto">
                <div className="row g-2 gy-3">
                  <div className="col-auto flex-1">
                    <div className="search-box">
                      <form className="position-relative" data-bs-toggle="search" data-bs-display="static"><input className="form-control search-input search form-control-sm" type="search" placeholder="Search" aria-label="Search" />
                        <span className="fas fa-search search-box-icon" />
                      </form>
                    </div>
                  </div>
                  <div className="col-auto"><button className="btn btn-sm btn-phoenix-secondary bg-white hover-bg-100 me-2" type="button">All products</button><button className="btn btn-sm btn-phoenix-secondary bg-white hover-bg-100 action-btn" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span className="fas fa-ellipsis-h" data-fa-transform="shrink-2" /></button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li><a className="dropdown-item" href="index.html#">Action</a></li>
                      <li><a className="dropdown-item" href="index.html#">Another action</a></li>
                      <li><a className="dropdown-item" href="index.html#">Something else here</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive mx-n1 px-1 scrollbar">
              <table className="table fs--1 mb-0 border-top border-200">
                <thead>
                  <tr>
                    <th className="white-space-nowrap fs--1 ps-0 align-middle">
                      <div className="form-check mb-0 fs-0"><input className="form-check-input" id="checkbox-bulk-reviews-select" type="checkbox" data-bulk-select="{&quot;body&quot;:&quot;table-latest-review-body&quot;}" /></div>
                    </th>
                    <th className="sort white-space-nowrap align-middle" scope="col" />
                    <th className="sort white-space-nowrap align-middle" scope="col" style={{ minWidth: 360 }} data-sort="product">PRODUCT</th>
                    <th className="sort align-middle" scope="col" data-sort="customer" style={{ minWidth: 200 }}>CUSTOMER</th>
                    <th className="sort align-middle" scope="col" data-sort="rating" style={{ minWidth: 110 }}>RATING</th>
                    <th className="sort align-middle" scope="col" style={{ maxWidth: 350 }} data-sort="review">REVIEW</th>
                    <th className="sort text-start ps-5 align-middle" scope="col" data-sort="status">STATUS</th>
                    <th className="sort text-end align-middle" scope="col" data-sort="time">TIME</th>
                    <th className="sort text-end pe-0 align-middle" scope="col" />
                  </tr>
                </thead>
                <tbody className="list" id="table-latest-review-body">
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0">
                      <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;product&quot;:&quot;Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management & Skin Temperature Trends, Carbon/Graphite, One Size (S & L Bands)&quot;,&quot;productImage&quot;:&quot;/products/60x60/1.png&quot;,&quot;customer&quot;:{&quot;name&quot;:&quot;Richard Dawkins&quot;,&quot;avatar&quot;:&quot;&quot;},&quot;rating&quot;:5,&quot;review&quot;:&quot;This Fitbit is fantastic! I was trying to be in better shape and needed some motivation, so I decided to treat myself to a new Fitbit.&quot;,&quot;status&quot;:{&quot;title&quot;:&quot;Approved&quot;,&quot;badge&quot;:&quot;success&quot;,&quot;icon&quot;:&quot;check&quot;},&quot;time&quot;:&quot;Just now&quot;}" /></div>
                    </td>
                    <td className="align-middle product white-space-nowrap py-0"><a className="d-block rounded-2 border" href="apps/e-commerce/landing/product-details.html"><img src="assets/img/products/60x60/1.png" alt="" width={53} /></a></td>
                    <td className="align-middle product white-space-nowrap"><a className="fw-semi-bold" href="apps/e-commerce/landing/product-details.html">Fitbit Sense Advanced Smartwatch with Tools fo...</a></td>
                    <td className="align-middle customer white-space-nowrap"><a className="d-flex align-items-center text-900" href="apps/e-commerce/landing/profile.html">
                      <div className="avatar avatar-l">
                        <div className="avatar-name rounded-circle"><span>R</span></div>
                      </div>
                      <h6 className="mb-0 ms-3 text-900">Richard Dawkins</h6>
                    </a></td>
                    <td className="align-middle rating white-space-nowrap fs--2"><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /></td>
                    <td className="align-middle review" style={{ minWidth: 350 }}>
                      <p className="fs--1 fw-semi-bold text-1000 mb-0">This Fitbit is fantastic! I was trying to be in better shape and needed some motivation, so I decided to treat myself to a new Fitbit.</p>
                    </td>
                    <td className="align-middle text-start ps-5 status"><span className="badge badge-phoenix fs--2 badge-phoenix-success"><span className="badge-label">Approved</span><span className="ms-1" data-feather="check" style={{ height: '12.8px', width: '12.8px' }} /></span></td>
                    <td className="align-middle text-end time white-space-nowrap">
                      <div className="hover-hide">
                        <h6 className="text-1000 mb-0">Just now</h6>
                      </div>
                    </td>
                    <td className="align-middle white-space-nowrap text-end pe-0">
                      <div className="position-relative">
                        <div className="hover-actions"><button className="btn btn-sm btn-phoenix-secondary me-1 fs--2"><span className="fas fa-check" /></button><button className="btn btn-sm btn-phoenix-secondary fs--2"><span className="fas fa-trash" /></button></div>
                      </div>
                      <div className="font-sans-serif btn-reveal-trigger position-static"><button className="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs--2" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span className="fas fa-ellipsis-h fs--2" /></button>
                        <div className="dropdown-menu dropdown-menu-end py-2"><a className="dropdown-item" href="index.html#!">View</a><a className="dropdown-item" href="index.html#!">Export</a>
                          <div className="dropdown-divider" /><a className="dropdown-item text-danger" href="index.html#!">Remove</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0">
                      <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;product&quot;:&quot;iPhone 13 pro max-Pacific Blue-128GB storage&quot;,&quot;productImage&quot;:&quot;/products/60x60/2.png&quot;,&quot;customer&quot;:{&quot;name&quot;:&quot;Ashley Garrett&quot;,&quot;avatar&quot;:&quot;/team/40x40/59.webp&quot;},&quot;rating&quot;:3,&quot;review&quot;:&quot;The order was delivered ahead of schedule. To give us additional time, you should leave the packaging sealed with plastic.&quot;,&quot;status&quot;:{&quot;title&quot;:&quot;Approved&quot;,&quot;badge&quot;:&quot;success&quot;,&quot;icon&quot;:&quot;check&quot;},&quot;time&quot;:&quot;Just now&quot;}" /></div>
                    </td>
                    <td className="align-middle product white-space-nowrap py-0"><a className="d-block rounded-2 border" href="apps/e-commerce/landing/product-details.html"><img src="assets/img/products/60x60/2.png" alt="" width={53} /></a></td>
                    <td className="align-middle product white-space-nowrap"><a className="fw-semi-bold" href="apps/e-commerce/landing/product-details.html">iPhone 13 pro max-Pacific Blue-128GB storage</a></td>
                    <td className="align-middle customer white-space-nowrap"><a className="d-flex align-items-center text-900" href="apps/e-commerce/landing/profile.html">
                      <div className="avatar avatar-l"><img className="rounded-circle" src="assets/img/team/40x40/59.webp" alt="" /></div>
                      <h6 className="mb-0 ms-3 text-900">Ashley Garrett</h6>
                    </a></td>
                    <td className="align-middle rating white-space-nowrap fs--2"><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa-regular fa-star text-warning-300" /><span className="fa-regular fa-star text-warning-300" /></td>
                    <td className="align-middle review" style={{ minWidth: 350 }}>
                      <p className="fs--1 fw-semi-bold text-1000 mb-0">The order was delivered ahead of schedule. To give us additional time, you should leave the packaging sealed with plastic.</p>
                    </td>
                    <td className="align-middle text-start ps-5 status"><span className="badge badge-phoenix fs--2 badge-phoenix-success"><span className="badge-label">Approved</span><span className="ms-1" data-feather="check" style={{ height: '12.8px', width: '12.8px' }} /></span></td>
                    <td className="align-middle text-end time white-space-nowrap">
                      <div className="hover-hide">
                        <h6 className="text-1000 mb-0">Just now</h6>
                      </div>
                    </td>
                    <td className="align-middle white-space-nowrap text-end pe-0">
                      <div className="position-relative">
                        <div className="hover-actions"><button className="btn btn-sm btn-phoenix-secondary me-1 fs--2"><span className="fas fa-check" /></button><button className="btn btn-sm btn-phoenix-secondary fs--2"><span className="fas fa-trash" /></button></div>
                      </div>
                      <div className="font-sans-serif btn-reveal-trigger position-static"><button className="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs--2" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span className="fas fa-ellipsis-h fs--2" /></button>
                        <div className="dropdown-menu dropdown-menu-end py-2"><a className="dropdown-item" href="index.html#!">View</a><a className="dropdown-item" href="index.html#!">Export</a>
                          <div className="dropdown-divider" /><a className="dropdown-item text-danger" href="index.html#!">Remove</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0">
                      <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;product&quot;:&quot;Apple MacBook Pro 13 inch-M1-8/256GB-space&quot;,&quot;productImage&quot;:&quot;/products/60x60/3.png&quot;,&quot;customer&quot;:{&quot;name&quot;:&quot;Woodrow Burton&quot;,&quot;avatar&quot;:&quot;/team/40x40/58.webp&quot;},&quot;rating&quot;:4.5,&quot;review&quot;:&quot;It's a Mac, after all. Once you've gone Mac, there's no going back. My first Mac lasted over nine years, and this is my second.&quot;,&quot;status&quot;:{&quot;title&quot;:&quot;Pending&quot;,&quot;badge&quot;:&quot;warning&quot;,&quot;icon&quot;:&quot;clock&quot;},&quot;time&quot;:&quot;Just now&quot;}" /></div>
                    </td>
                    <td className="align-middle product white-space-nowrap py-0"><a className="d-block rounded-2 border" href="apps/e-commerce/landing/product-details.html"><img src="assets/img/products/60x60/3.png" alt="" width={53} /></a></td>
                    <td className="align-middle product white-space-nowrap"><a className="fw-semi-bold" href="apps/e-commerce/landing/product-details.html">Apple MacBook Pro 13 inch-M1-8/256GB-space</a></td>
                    <td className="align-middle customer white-space-nowrap"><a className="d-flex align-items-center text-900" href="apps/e-commerce/landing/profile.html">
                      <div className="avatar avatar-l"><img className="rounded-circle" src="assets/img/team/40x40/58.webp" alt="" /></div>
                      <h6 className="mb-0 ms-3 text-900">Woodrow Burton</h6>
                    </a></td>
                    <td className="align-middle rating white-space-nowrap fs--2"><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star-half-star-icon text-warning" /></td>
                    <td className="align-middle review" style={{ minWidth: 350 }}>
                      <p className="fs--1 fw-semi-bold text-1000 mb-0">It's a Mac, after all. Once you've gone Mac, there's no going back. My first Mac lasted over nine years, and this is my second.</p>
                    </td>
                    <td className="align-middle text-start ps-5 status"><span className="badge badge-phoenix fs--2 badge-phoenix-warning"><span className="badge-label">Pending</span><span className="ms-1" data-feather="clock" style={{ height: '12.8px', width: '12.8px' }} /></span></td>
                    <td className="align-middle text-end time white-space-nowrap">
                      <div className="hover-hide">
                        <h6 className="text-1000 mb-0">Just now</h6>
                      </div>
                    </td>
                    <td className="align-middle white-space-nowrap text-end pe-0">
                      <div className="position-relative">
                        <div className="hover-actions"><button className="btn btn-sm btn-phoenix-secondary me-1 fs--2"><span className="fas fa-check" /></button><button className="btn btn-sm btn-phoenix-secondary fs--2"><span className="fas fa-trash" /></button></div>
                      </div>
                      <div className="font-sans-serif btn-reveal-trigger position-static"><button className="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs--2" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span className="fas fa-ellipsis-h fs--2" /></button>
                        <div className="dropdown-menu dropdown-menu-end py-2"><a className="dropdown-item" href="index.html#!">View</a><a className="dropdown-item" href="index.html#!">Export</a>
                          <div className="dropdown-divider" /><a className="dropdown-item text-danger" href="index.html#!">Remove</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0">
                      <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;product&quot;:&quot;Apple iMac 24\&quot; 4K Retina Display M1 8 Core CPU, 7 Core GPU, 256GB SSD, Green (MJV83ZP/A) 2021&quot;,&quot;productImage&quot;:&quot;/products/60x60/4.png&quot;,&quot;customer&quot;:{&quot;name&quot;:&quot;Eric McGee&quot;,&quot;avatar&quot;:&quot;/team/40x40/avatar.webp&quot;,&quot;avatarPlaceholder&quot;:true},&quot;rating&quot;:3,&quot;review&quot;:&quot;Personally, I like the minimalist style, but I wouldn't choose it if I were searching for a computer that I would use frequently. It's not horrible in terms of speed and power, but the&quot;,&quot;status&quot;:{&quot;title&quot;:&quot;Pending&quot;,&quot;badge&quot;:&quot;warning&quot;,&quot;icon&quot;:&quot;clock&quot;},&quot;time&quot;:&quot;Nov 09, 3:23 AM&quot;}" /></div>
                    </td>
                    <td className="align-middle product white-space-nowrap py-0"><a className="d-block rounded-2 border" href="apps/e-commerce/landing/product-details.html"><img src="assets/img/products/60x60/4.png" alt="" width={53} /></a></td>
                    <td className="align-middle product white-space-nowrap"><a className="fw-semi-bold" href="apps/e-commerce/landing/product-details.html">Apple iMac 24" 4K Retina Display M1 8 Core CPU...</a></td>
                    <td className="align-middle customer white-space-nowrap"><a className="d-flex align-items-center text-900" href="apps/e-commerce/landing/profile.html">
                      <div className="avatar avatar-l"><img className="rounded-circle avatar-placeholder" src="assets/img/team/40x40/avatar.webp" alt="" /></div>
                      <h6 className="mb-0 ms-3 text-900">Eric McGee</h6>
                    </a></td>
                    <td className="align-middle rating white-space-nowrap fs--2"><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa-regular fa-star text-warning-300" /><span className="fa-regular fa-star text-warning-300" /></td>
                    <td className="align-middle review" style={{ minWidth: 350 }}>
                      <p className="fs--1 fw-semi-bold text-1000 mb-0">Personally, I like the minimalist style, but I wouldn't choose it if I were searching for a computer that I would use frequently. It's...<a href="index.html#!">See more</a></p>
                    </td>
                    <td className="align-middle text-start ps-5 status"><span className="badge badge-phoenix fs--2 badge-phoenix-warning"><span className="badge-label">Pending</span><span className="ms-1" data-feather="clock" style={{ height: '12.8px', width: '12.8px' }} /></span></td>
                    <td className="align-middle text-end time white-space-nowrap">
                      <div className="hover-hide">
                        <h6 className="text-1000 mb-0">Nov 09, 3:23 AM</h6>
                      </div>
                    </td>
                    <td className="align-middle white-space-nowrap text-end pe-0">
                      <div className="position-relative">
                        <div className="hover-actions"><button className="btn btn-sm btn-phoenix-secondary me-1 fs--2"><span className="fas fa-check" /></button><button className="btn btn-sm btn-phoenix-secondary fs--2"><span className="fas fa-trash" /></button></div>
                      </div>
                      <div className="font-sans-serif btn-reveal-trigger position-static"><button className="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs--2" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span className="fas fa-ellipsis-h fs--2" /></button>
                        <div className="dropdown-menu dropdown-menu-end py-2"><a className="dropdown-item" href="index.html#!">View</a><a className="dropdown-item" href="index.html#!">Export</a>
                          <div className="dropdown-divider" /><a className="dropdown-item text-danger" href="index.html#!">Remove</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0">
                      <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;product&quot;:&quot;Razer Kraken v3 x Wired 7.1 Surroung Sound Gaming headset&quot;,&quot;productImage&quot;:&quot;/products/60x60/5.png&quot;,&quot;customer&quot;:{&quot;name&quot;:&quot;Kim Carroll&quot;,&quot;avatar&quot;:&quot;/team/40x40/avatar.webp&quot;,&quot;avatarPlaceholder&quot;:true},&quot;rating&quot;:4,&quot;review&quot;:&quot;It performs exactly as expected. There are three of these in the family.&quot;,&quot;status&quot;:{&quot;title&quot;:&quot;Pending&quot;,&quot;badge&quot;:&quot;warning&quot;,&quot;icon&quot;:&quot;clock&quot;},&quot;time&quot;:&quot;Nov 09, 2:15 PM&quot;}" /></div>
                    </td>
                    <td className="align-middle product white-space-nowrap py-0"><a className="d-block rounded-2 border" href="apps/e-commerce/landing/product-details.html"><img src="assets/img/products/60x60/5.png" alt="" width={53} /></a></td>
                    <td className="align-middle product white-space-nowrap"><a className="fw-semi-bold" href="apps/e-commerce/landing/product-details.html">Razer Kraken v3 x Wired 7.1 Surroung Sound Gam...</a></td>
                    <td className="align-middle customer white-space-nowrap"><a className="d-flex align-items-center text-900" href="apps/e-commerce/landing/profile.html">
                      <div className="avatar avatar-l"><img className="rounded-circle avatar-placeholder" src="assets/img/team/40x40/avatar.webp" alt="" /></div>
                      <h6 className="mb-0 ms-3 text-900">Kim Carroll</h6>
                    </a></td>
                    <td className="align-middle rating white-space-nowrap fs--2"><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa-regular fa-star text-warning-300" /></td>
                    <td className="align-middle review" style={{ minWidth: 350 }}>
                      <p className="fs--1 fw-semi-bold text-1000 mb-0">It performs exactly as expected. There are three of these in the family.</p>
                    </td>
                    <td className="align-middle text-start ps-5 status"><span className="badge badge-phoenix fs--2 badge-phoenix-warning"><span className="badge-label">Pending</span><span className="ms-1" data-feather="clock" style={{ height: '12.8px', width: '12.8px' }} /></span></td>
                    <td className="align-middle text-end time white-space-nowrap">
                      <div className="hover-hide">
                        <h6 className="text-1000 mb-0">Nov 09, 2:15 PM</h6>
                      </div>
                    </td>
                    <td className="align-middle white-space-nowrap text-end pe-0">
                      <div className="position-relative">
                        <div className="hover-actions"><button className="btn btn-sm btn-phoenix-secondary me-1 fs--2"><span className="fas fa-check" /></button><button className="btn btn-sm btn-phoenix-secondary fs--2"><span className="fas fa-trash" /></button></div>
                      </div>
                      <div className="font-sans-serif btn-reveal-trigger position-static"><button className="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs--2" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span className="fas fa-ellipsis-h fs--2" /></button>
                        <div className="dropdown-menu dropdown-menu-end py-2"><a className="dropdown-item" href="index.html#!">View</a><a className="dropdown-item" href="index.html#!">Export</a>
                          <div className="dropdown-divider" /><a className="dropdown-item text-danger" href="index.html#!">Remove</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0">
                      <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;product&quot;:&quot;PlayStation 5 DualSense Wireless Controller&quot;,&quot;productImage&quot;:&quot;/products/60x60/6.png&quot;,&quot;customer&quot;:{&quot;name&quot;:&quot;Barbara Lucas&quot;,&quot;avatar&quot;:&quot;/team/40x40/57.webp&quot;},&quot;rating&quot;:4,&quot;review&quot;:&quot;The controller is quite comfy for me. Despite its increased size, the controller still fits well in my hands.&quot;,&quot;status&quot;:{&quot;title&quot;:&quot;Approved&quot;,&quot;badge&quot;:&quot;success&quot;,&quot;icon&quot;:&quot;check&quot;},&quot;time&quot;:&quot;Nov 08, 8:53 AM&quot;}" /></div>
                    </td>
                    <td className="align-middle product white-space-nowrap py-0"><a className="d-block rounded-2 border" href="apps/e-commerce/landing/product-details.html"><img src="assets/img/products/60x60/6.png" alt="" width={53} /></a></td>
                    <td className="align-middle product white-space-nowrap"><a className="fw-semi-bold" href="apps/e-commerce/landing/product-details.html">PlayStation 5 DualSense Wireless Controller</a></td>
                    <td className="align-middle customer white-space-nowrap"><a className="d-flex align-items-center text-900" href="apps/e-commerce/landing/profile.html">
                      <div className="avatar avatar-l"><img className="rounded-circle" src="assets/img/team/40x40/57.webp" alt="" /></div>
                      <h6 className="mb-0 ms-3 text-900">Barbara Lucas</h6>
                    </a></td>
                    <td className="align-middle rating white-space-nowrap fs--2"><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa-regular fa-star text-warning-300" /></td>
                    <td className="align-middle review" style={{ minWidth: 350 }}>
                      <p className="fs--1 fw-semi-bold text-1000 mb-0">The controller is quite comfy for me. Despite its increased size, the controller still fits well in my hands.</p>
                    </td>
                    <td className="align-middle text-start ps-5 status"><span className="badge badge-phoenix fs--2 badge-phoenix-success"><span className="badge-label">Approved</span><span className="ms-1" data-feather="check" style={{ height: '12.8px', width: '12.8px' }} /></span></td>
                    <td className="align-middle text-end time white-space-nowrap">
                      <div className="hover-hide">
                        <h6 className="text-1000 mb-0">Nov 08, 8:53 AM</h6>
                      </div>
                    </td>
                    <td className="align-middle white-space-nowrap text-end pe-0">
                      <div className="position-relative">
                        <div className="hover-actions"><button className="btn btn-sm btn-phoenix-secondary me-1 fs--2"><span className="fas fa-check" /></button><button className="btn btn-sm btn-phoenix-secondary fs--2"><span className="fas fa-trash" /></button></div>
                      </div>
                      <div className="font-sans-serif btn-reveal-trigger position-static"><button className="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs--2" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span className="fas fa-ellipsis-h fs--2" /></button>
                        <div className="dropdown-menu dropdown-menu-end py-2"><a className="dropdown-item" href="index.html#!">View</a><a className="dropdown-item" href="index.html#!">Export</a>
                          <div className="dropdown-divider" /><a className="dropdown-item text-danger" href="index.html#!">Remove</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0">
                      <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;product&quot;:&quot;2021 Apple 12.9-inch iPad Pro (Wi‑Fi, 128GB) - Space Gray&quot;,&quot;productImage&quot;:&quot;/products/60x60/7.png&quot;,&quot;customer&quot;:{&quot;name&quot;:&quot;Ansolo Lazinatov&quot;,&quot;avatar&quot;:&quot;/team/40x40/3.webp&quot;},&quot;rating&quot;:4.5,&quot;review&quot;:&quot;The response time and service I received when contacted the designers were Phenomenal!&quot;,&quot;status&quot;:{&quot;title&quot;:&quot;Pending&quot;,&quot;badge&quot;:&quot;warning&quot;,&quot;icon&quot;:&quot;clock&quot;},&quot;time&quot;:&quot;Nov 07, 9:00 PM&quot;}" /></div>
                    </td>
                    <td className="align-middle product white-space-nowrap py-0"><a className="d-block rounded-2 border" href="apps/e-commerce/landing/product-details.html"><img src="assets/img/products/60x60/7.png" alt="" width={53} /></a></td>
                    <td className="align-middle product white-space-nowrap"><a className="fw-semi-bold" href="apps/e-commerce/landing/product-details.html">2021 Apple 12.9-inch iPad Pro (Wi‑Fi, 128GB) -...</a></td>
                    <td className="align-middle customer white-space-nowrap"><a className="d-flex align-items-center text-900" href="apps/e-commerce/landing/profile.html">
                      <div className="avatar avatar-l"><img className="rounded-circle" src="assets/img/team/40x40/3.webp" alt="" /></div>
                      <h6 className="mb-0 ms-3 text-900">Ansolo Lazinatov</h6>
                    </a></td>
                    <td className="align-middle rating white-space-nowrap fs--2"><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star-half-alt star-icon text-warning" /></td>
                    <td className="align-middle review" style={{ minWidth: 350 }}>
                      <p className="fs--1 fw-semi-bold text-1000 mb-0">The response time and service I received when contacted the designers were Phenomenal!</p>
                    </td>
                    <td className="align-middle text-start ps-5 status"><span className="badge badge-phoenix fs--2 badge-phoenix-warning"><span className="badge-label">Pending</span><span className="ms-1" data-feather="clock" style={{ height: '12.8px', width: '12.8px' }} /></span></td>
                    <td className="align-middle text-end time white-space-nowrap">
                      <div className="hover-hide">
                        <h6 className="text-1000 mb-0">Nov 07, 9:00 PM</h6>
                      </div>
                    </td>
                    <td className="align-middle white-space-nowrap text-end pe-0">
                      <div className="position-relative">
                        <div className="hover-actions"><button className="btn btn-sm btn-phoenix-secondary me-1 fs--2"><span className="fas fa-check" /></button><button className="btn btn-sm btn-phoenix-secondary fs--2"><span className="fas fa-trash" /></button></div>
                      </div>
                      <div className="font-sans-serif btn-reveal-trigger position-static"><button className="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs--2" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span className="fas fa-ellipsis-h fs--2" /></button>
                        <div className="dropdown-menu dropdown-menu-end py-2"><a className="dropdown-item" href="index.html#!">View</a><a className="dropdown-item" href="index.html#!">Export</a>
                          <div className="dropdown-divider" /><a className="dropdown-item text-danger" href="index.html#!">Remove</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0">
                      <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;product&quot;:&quot;HORI Racing Wheel Apex for PlayStation 4_3, and PC&quot;,&quot;productImage&quot;:&quot;/products/60x60/12.png&quot;,&quot;customer&quot;:{&quot;name&quot;:&quot;Raymond Mims&quot;,&quot;avatar&quot;:&quot;/team/40x40/avatar.webp&quot;,&quot;avatarPlaceholder&quot;:true},&quot;rating&quot;:4,&quot;review&quot;:&quot;As others mentioned, the team behind this theme is super responsive. I sent a message during the weekend, fully expecting a response after the weekend, but I got one within minutes, and I was unblocked.&quot;,&quot;status&quot;:{&quot;title&quot;:&quot;Approved&quot;,&quot;badge&quot;:&quot;success&quot;,&quot;icon&quot;:&quot;check&quot;},&quot;time&quot;:&quot;Nov 04, 6:53 PM&quot;}" /></div>
                    </td>
                    <td className="align-middle product white-space-nowrap py-0"><a className="d-block rounded-2 border" href="apps/e-commerce/landing/product-details.html"><img src="assets/img/products/60x60/12.png" alt="" width={53} /></a></td>
                    <td className="align-middle product white-space-nowrap"><a className="fw-semi-bold" href="apps/e-commerce/landing/product-details.html">HORI Racing Wheel Apex for PlayStation 4_3, an...</a></td>
                    <td className="align-middle customer white-space-nowrap"><a className="d-flex align-items-center text-900" href="apps/e-commerce/landing/profile.html">
                      <div className="avatar avatar-l"><img className="rounded-circle avatar-placeholder" src="assets/img/team/40x40/avatar.webp" alt="" /></div>
                      <h6 className="mb-0 ms-3 text-900">Raymond Mims</h6>
                    </a></td>
                    <td className="align-middle rating white-space-nowrap fs--2"><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa-regular fa-star text-warning-300" /></td>
                    <td className="align-middle review" style={{ minWidth: 350 }}>
                      <p className="fs--1 fw-semi-bold text-1000 mb-0">As others mentioned, the team behind this theme is super responsive. I sent a message during the weekend, fully expecting a response a...<a href="index.html#!">See more</a></p>
                    </td>
                    <td className="align-middle text-start ps-5 status"><span className="badge badge-phoenix fs--2 badge-phoenix-success"><span className="badge-label">Approved</span><span className="ms-1" data-feather="check" style={{ height: '12.8px', width: '12.8px' }} /></span></td>
                    <td className="align-middle text-end time white-space-nowrap">
                      <div className="hover-hide">
                        <h6 className="text-1000 mb-0">Nov 04, 6:53 PM</h6>
                      </div>
                    </td>
                    <td className="align-middle white-space-nowrap text-end pe-0">
                      <div className="position-relative">
                        <div className="hover-actions"><button className="btn btn-sm btn-phoenix-secondary me-1 fs--2"><span className="fas fa-check" /></button><button className="btn btn-sm btn-phoenix-secondary fs--2"><span className="fas fa-trash" /></button></div>
                      </div>
                      <div className="font-sans-serif btn-reveal-trigger position-static"><button className="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs--2" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span className="fas fa-ellipsis-h fs--2" /></button>
                        <div className="dropdown-menu dropdown-menu-end py-2"><a className="dropdown-item" href="index.html#!">View</a><a className="dropdown-item" href="index.html#!">Export</a>
                          <div className="dropdown-divider" /><a className="dropdown-item text-danger" href="index.html#!">Remove</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0">
                      <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;product&quot;:&quot;Nintendo Switch with Neon Blue and Neon Red Joy‑Con - HAC-001(-01)&quot;,&quot;productImage&quot;:&quot;/products/60x60/13.png&quot;,&quot;customer&quot;:{&quot;name&quot;:&quot;Michael Jenkins&quot;,&quot;avatar&quot;:&quot;/team/40x40/9.webp&quot;},&quot;rating&quot;:5,&quot;review&quot;:&quot;I had a bit of a hard time at first but after I contacted the team they were able to help me set up the theme. It's really good and I highly recommend it to everyone.&quot;,&quot;status&quot;:{&quot;title&quot;:&quot;Pending&quot;,&quot;badge&quot;:&quot;warning&quot;,&quot;icon&quot;:&quot;clock&quot;},&quot;time&quot;:&quot;Nov 04, 12:00 PM&quot;}" /></div>
                    </td>
                    <td className="align-middle product white-space-nowrap py-0"><a className="d-block rounded-2 border" href="apps/e-commerce/landing/product-details.html"><img src="assets/img/products/60x60/13.png" alt="" width={53} /></a></td>
                    <td className="align-middle product white-space-nowrap"><a className="fw-semi-bold" href="apps/e-commerce/landing/product-details.html">Nintendo Switch with Neon Blue and Neon Red Jo...</a></td>
                    <td className="align-middle customer white-space-nowrap"><a className="d-flex align-items-center text-900" href="apps/e-commerce/landing/profile.html">
                      <div className="avatar avatar-l"><img className="rounded-circle" src="assets/img/team/40x40/9.webp" alt="" /></div>
                      <h6 className="mb-0 ms-3 text-900">Michael Jenkins</h6>
                    </a></td>
                    <td className="align-middle rating white-space-nowrap fs--2"><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /></td>
                    <td className="align-middle review" style={{ minWidth: 350 }}>
                      <p className="fs--1 fw-semi-bold text-1000 mb-0">I had a bit of a hard time at first but after I contacted the team they were able to help me set up the theme. It's really good and I ...<a href="index.html#!">See more</a></p>
                    </td>
                    <td className="align-middle text-start ps-5 status"><span className="badge badge-phoenix fs--2 badge-phoenix-warning"><span className="badge-label">Pending</span><span className="ms-1" data-feather="clock" style={{ height: '12.8px', width: '12.8px' }} /></span></td>
                    <td className="align-middle text-end time white-space-nowrap">
                      <div className="hover-hide">
                        <h6 className="text-1000 mb-0">Nov 04, 12:00 PM</h6>
                      </div>
                    </td>
                    <td className="align-middle white-space-nowrap text-end pe-0">
                      <div className="position-relative">
                        <div className="hover-actions"><button className="btn btn-sm btn-phoenix-secondary me-1 fs--2"><span className="fas fa-check" /></button><button className="btn btn-sm btn-phoenix-secondary fs--2"><span className="fas fa-trash" /></button></div>
                      </div>
                      <div className="font-sans-serif btn-reveal-trigger position-static"><button className="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs--2" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span className="fas fa-ellipsis-h fs--2" /></button>
                        <div className="dropdown-menu dropdown-menu-end py-2"><a className="dropdown-item" href="index.html#!">View</a><a className="dropdown-item" href="index.html#!">Export</a>
                          <div className="dropdown-divider" /><a className="dropdown-item text-danger" href="index.html#!">Remove</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0">
                      <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;product&quot;:&quot;Oculus Rift S PC-Powered VR Gaming Headset&quot;,&quot;productImage&quot;:&quot;/products/60x60/14.png&quot;,&quot;customer&quot;:{&quot;name&quot;:&quot;Kristine Cadena&quot;,&quot;avatar&quot;:&quot;/team/40x40/avatar.webp&quot;,&quot;avatarPlaceholder&quot;:true},&quot;rating&quot;:5,&quot;review&quot;:&quot;Excellent. All my doubts were answered by the team quickly. I highly recommend it.&quot;,&quot;status&quot;:{&quot;title&quot;:&quot;Pending&quot;,&quot;badge&quot;:&quot;warning&quot;,&quot;icon&quot;:&quot;clock&quot;},&quot;time&quot;:&quot;Nov 03, 8:53 AM&quot;}" /></div>
                    </td>
                    <td className="align-middle product white-space-nowrap py-0"><a className="d-block rounded-2 border" href="apps/e-commerce/landing/product-details.html"><img src="assets/img/products/60x60/14.png" alt="" width={53} /></a></td>
                    <td className="align-middle product white-space-nowrap"><a className="fw-semi-bold" href="apps/e-commerce/landing/product-details.html">Oculus Rift S PC-Powered VR Gaming Headset</a></td>
                    <td className="align-middle customer white-space-nowrap"><a className="d-flex align-items-center text-900" href="apps/e-commerce/landing/profile.html">
                      <div className="avatar avatar-l"><img className="rounded-circle avatar-placeholder" src="assets/img/team/40x40/avatar.webp" alt="" /></div>
                      <h6 className="mb-0 ms-3 text-900">Kristine Cadena</h6>
                    </a></td>
                    <td className="align-middle rating white-space-nowrap fs--2"><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /></td>
                    <td className="align-middle review" style={{ minWidth: 350 }}>
                      <p className="fs--1 fw-semi-bold text-1000 mb-0">Excellent. All my doubts were answered by the team quickly. I highly recommend it.</p>
                    </td>
                    <td className="align-middle text-start ps-5 status"><span className="badge badge-phoenix fs--2 badge-phoenix-warning"><span className="badge-label">Pending</span><span className="ms-1" data-feather="clock" style={{ height: '12.8px', width: '12.8px' }} /></span></td>
                    <td className="align-middle text-end time white-space-nowrap">
                      <div className="hover-hide">
                        <h6 className="text-1000 mb-0">Nov 03, 8:53 AM</h6>
                      </div>
                    </td>
                    <td className="align-middle white-space-nowrap text-end pe-0">
                      <div className="position-relative">
                        <div className="hover-actions"><button className="btn btn-sm btn-phoenix-secondary me-1 fs--2"><span className="fas fa-check" /></button><button className="btn btn-sm btn-phoenix-secondary fs--2"><span className="fas fa-trash" /></button></div>
                      </div>
                      <div className="font-sans-serif btn-reveal-trigger position-static"><button className="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs--2" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span className="fas fa-ellipsis-h fs--2" /></button>
                        <div className="dropdown-menu dropdown-menu-end py-2"><a className="dropdown-item" href="index.html#!">View</a><a className="dropdown-item" href="index.html#!">Export</a>
                          <div className="dropdown-divider" /><a className="dropdown-item text-danger" href="index.html#!">Remove</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0">
                      <div className="form-check mb-0 fs-0"><input className="form-check-input" type="checkbox" data-bulk-select-row="{&quot;product&quot;:&quot;Sony X85J 75 Inch Sony 4K Ultra HD LED Smart Google TV&quot;,&quot;productImage&quot;:&quot;/products/60x60/15.png&quot;,&quot;customer&quot;:{&quot;name&quot;:&quot;Suzanne Martinez&quot;,&quot;avatar&quot;:&quot;/team/40x40/24.webp&quot;},&quot;rating&quot;:3.5,&quot;review&quot;:&quot;This theme is great. Clean and easy to understand. Perfect for those who don't have time to start everything from scratch. The support is simply phenomenal! Highly recommended!&quot;,&quot;status&quot;:{&quot;title&quot;:&quot;Approved&quot;,&quot;badge&quot;:&quot;success&quot;,&quot;icon&quot;:&quot;check&quot;},&quot;time&quot;:&quot;Nov 03, 10:43 AM&quot;}" /></div>
                    </td>
                    <td className="align-middle product white-space-nowrap py-0"><a className="d-block rounded-2 border" href="apps/e-commerce/landing/product-details.html"><img src="assets/img/products/60x60/15.png" alt="" width={53} /></a></td>
                    <td className="align-middle product white-space-nowrap"><a className="fw-semi-bold" href="apps/e-commerce/landing/product-details.html">Sony X85J 75 Inch Sony 4K Ultra HD LED Smart G...</a></td>
                    <td className="align-middle customer white-space-nowrap"><a className="d-flex align-items-center text-900" href="apps/e-commerce/landing/profile.html">
                      <div className="avatar avatar-l"><img className="rounded-circle" src="assets/img/team/40x40/24.webp" alt="" /></div>
                      <h6 className="mb-0 ms-3 text-900">Suzanne Martinez</h6>
                    </a></td>
                    <td className="align-middle rating white-space-nowrap fs--2"><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star text-warning" /><span className="fa fa-star-half-alt star-icon text-warning" /><span className="fa-regular fa-star text-warning-300" /></td>
                    <td className="align-middle review" style={{ minWidth: 350 }}>
                      <p className="fs--1 fw-semi-bold text-1000 mb-0">This theme is great. Clean and easy to understand. Perfect for those who don't have time to start everything from scratch. The support...<a href="index.html#!">See more</a></p>
                    </td>
                    <td className="align-middle text-start ps-5 status"><span className="badge badge-phoenix fs--2 badge-phoenix-success"><span className="badge-label">Approved</span><span className="ms-1" data-feather="check" style={{ height: '12.8px', width: '12.8px' }} /></span></td>
                    <td className="align-middle text-end time white-space-nowrap">
                      <div className="hover-hide">
                        <h6 className="text-1000 mb-0">Nov 03, 10:43 AM</h6>
                      </div>
                    </td>
                    <td className="align-middle white-space-nowrap text-end pe-0">
                      <div className="position-relative">
                        <div className="hover-actions"><button className="btn btn-sm btn-phoenix-secondary me-1 fs--2"><span className="fas fa-check" /></button><button className="btn btn-sm btn-phoenix-secondary fs--2"><span className="fas fa-trash" /></button></div>
                      </div>
                      <div className="font-sans-serif btn-reveal-trigger position-static"><button className="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs--2" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span className="fas fa-ellipsis-h fs--2" /></button>
                        <div className="dropdown-menu dropdown-menu-end py-2"><a className="dropdown-item" href="index.html#!">View</a><a className="dropdown-item" href="index.html#!">Export</a>
                          <div className="dropdown-divider" /><a className="dropdown-item text-danger" href="index.html#!">Remove</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row align-items-center py-1">
              <div className="pagination d-none" />
              <div className="col d-flex fs--1">
                <p className="mb-0 d-none d-sm-block me-3 fw-semi-bold text-900" data-list-info="data-list-info" /><a className="fw-semi-bold" href="index.html#!" data-list-view="*">View all<span className="fas fa-angle-right ms-1" data-fa-transform="down-1" /></a><a className="fw-semi-bold d-none" href="index.html#!" data-list-view="less">View Less</a>
              </div>
              <div className="col-auto d-flex">
                <button className="btn btn-link px-1 me-1" type="button" title="Previous" data-list-pagination="prev"><span className="fas fa-chevron-left me-2" />Previous</button><button className="btn btn-link px-1 ms-1" type="button" title="Next" data-list-pagination="next">Next<span className="fas fa-chevron-right ms-2" /></button>
              </div>
            </div>
          </div>
        </div>
        <div className="row gx-6 ">
          <div className="col-12 col-xl-10 m-auto">
            <div data-list="{&quot;valueNames&quot;:[&quot;country&quot;,&quot;users&quot;,&quot;transactions&quot;,&quot;revenue&quot;,&quot;conv-rate&quot;],&quot;page&quot;:5}">
              <div className="mb-5 mt-7">
                <h3>Top regions by revenue</h3>
                <p className="text-700">Where you generated most of the revenue</p>
              </div>
              <div className="table-responsive scrollbar">
                <table className="table fs--2 mb-0">
                  <thead>
                    <tr>
                      <th className="sort border-top border-200 ps-0 align-middle" scope="col" data-sort="country" style={{ width: '32%' }}>COUNTRY</th>
                      <th className="sort border-top border-200 align-middle" scope="col" data-sort="users" style={{ width: '17%' }}>USERS</th>
                      <th className="sort border-top border-200 text-end align-middle" scope="col" data-sort="transactions" style={{ width: '16%' }}>TRANSACTIONS</th>
                      <th className="sort border-top border-200 text-end align-middle" scope="col" data-sort="revenue" style={{ width: '20%' }}>REVENUE</th>
                      <th className="sort border-top border-200 text-end pe-0 align-middle" scope="col" data-sort="conv-rate" style={{ width: '17%' }}>CONV. RATE</th>
                    </tr>
                  </thead>
                  <tbody><tr>
                    <td />
                    <td className="align-middle py-4">
                      <h4 className="mb-0 fw-normal">377,620</h4>
                    </td>
                    <td className="align-middle text-end py-4">
                      <h4 className="mb-0 fw-normal">236</h4>
                    </td>
                    <td className="align-middle text-end py-4">
                      <h4 className="mb-0 fw-normal">$15,758</h4>
                    </td>
                    <td className="align-middle text-end py-4 pe-0">
                      <h4 className="mb-0 fw-normal">10.32%</h4>
                    </td>
                  </tr>
                  </tbody><tbody className="list" id="table-regions-by-revenue">
                    <tr>
                      <td className="white-space-nowrap ps-0 country" style={{ width: '32%' }}>
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 me-3">1. </h6><a href="index.html#!">
                            <div className="d-flex align-items-center"><img src="assets/img/country/india.png" alt="" width={24} />
                              <p className="mb-0 ps-3 text-primary fw-bold fs--1">India</p>
                            </div>
                          </a>
                        </div>
                      </td>
                      <td className="align-middle users" style={{ width: '17%' }}>
                        <h6 className="mb-0">92896<span className="text-700 fw-semi-bold ms-2">(41.6%)</span></h6>
                      </td>
                      <td className="align-middle text-end transactions" style={{ width: '17%' }}>
                        <h6 className="mb-0">67<span className="text-700 fw-semi-bold ms-2">(34.3%)</span></h6>
                      </td>
                      <td className="align-middle text-end revenue" style={{ width: '17%' }}>
                        <h6 className="mb-0">$7560<span className="text-700 fw-semi-bold ms-2">(36.9%)</span></h6>
                      </td>
                      <td className="align-middle text-end pe-0 conv-rate" style={{ width: '17%' }}>
                        <h6>14.01%</h6>
                      </td>
                    </tr>
                    <tr>
                      <td className="white-space-nowrap ps-0 country" style={{ width: '32%' }}>
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 me-3">2. </h6><a href="index.html#!">
                            <div className="d-flex align-items-center"><img src="assets/img/country/china.png" alt="" width={24} />
                              <p className="mb-0 ps-3 text-primary fw-bold fs--1">China</p>
                            </div>
                          </a>
                        </div>
                      </td>
                      <td className="align-middle users" style={{ width: '17%' }}>
                        <h6 className="mb-0">50496<span className="text-700 fw-semi-bold ms-2">(32.8%)</span></h6>
                      </td>
                      <td className="align-middle text-end transactions" style={{ width: '17%' }}>
                        <h6 className="mb-0">54<span className="text-700 fw-semi-bold ms-2">(23.8%)</span></h6>
                      </td>
                      <td className="align-middle text-end revenue" style={{ width: '17%' }}>
                        <h6 className="mb-0">$6532<span className="text-700 fw-semi-bold ms-2">(26.5%)</span></h6>
                      </td>
                      <td className="align-middle text-end pe-0 conv-rate" style={{ width: '17%' }}>
                        <h6>23.56%</h6>
                      </td>
                    </tr>
                    <tr>
                      <td className="white-space-nowrap ps-0 country" style={{ width: '32%' }}>
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 me-3">3. </h6><a href="index.html#!">
                            <div className="d-flex align-items-center"><img src="assets/img/country/usa.png" alt="" width={24} />
                              <p className="mb-0 ps-3 text-primary fw-bold fs--1">USA</p>
                            </div>
                          </a>
                        </div>
                      </td>
                      <td className="align-middle users" style={{ width: '17%' }}>
                        <h6 className="mb-0">45679<span className="text-700 fw-semi-bold ms-2">(24.3%)</span></h6>
                      </td>
                      <td className="align-middle text-end transactions" style={{ width: '17%' }}>
                        <h6 className="mb-0">35<span className="text-700 fw-semi-bold ms-2">(19.7%)</span></h6>
                      </td>
                      <td className="align-middle text-end revenue" style={{ width: '17%' }}>
                        <h6 className="mb-0">$5432<span className="text-700 fw-semi-bold ms-2">(16.9%)</span></h6>
                      </td>
                      <td className="align-middle text-end pe-0 conv-rate" style={{ width: '17%' }}>
                        <h6>10.23%</h6>
                      </td>
                    </tr>
                    <tr>
                      <td className="white-space-nowrap ps-0 country" style={{ width: '32%' }}>
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 me-3">4. </h6><a href="index.html#!">
                            <div className="d-flex align-items-center"><img src="assets/img/country/south-korea.png" alt="" width={24} />
                              <p className="mb-0 ps-3 text-primary fw-bold fs--1">South Korea</p>
                            </div>
                          </a>
                        </div>
                      </td>
                      <td className="align-middle users" style={{ width: '17%' }}>
                        <h6 className="mb-0">36453<span className="text-700 fw-semi-bold ms-2">(19.7%)</span></h6>
                      </td>
                      <td className="align-middle text-end transactions" style={{ width: '17%' }}>
                        <h6 className="mb-0">22<span className="text-700 fw-semi-bold ms-2">(9.54%)</span></h6>
                      </td>
                      <td className="align-middle text-end revenue" style={{ width: '17%' }}>
                        <h6 className="mb-0">$4673<span className="text-700 fw-semi-bold ms-2">(11.6%)</span></h6>
                      </td>
                      <td className="align-middle text-end pe-0 conv-rate" style={{ width: '17%' }}>
                        <h6>8.85%</h6>
                      </td>
                    </tr>
                    <tr>
                      <td className="white-space-nowrap ps-0 country" style={{ width: '32%' }}>
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 me-3">5. </h6><a href="index.html#!">
                            <div className="d-flex align-items-center"><img src="assets/img/country/vietnam.png" alt="" width={24} />
                              <p className="mb-0 ps-3 text-primary fw-bold fs--1">Vietnam</p>
                            </div>
                          </a>
                        </div>
                      </td>
                      <td className="align-middle users" style={{ width: '17%' }}>
                        <h6 className="mb-0">15007<span className="text-700 fw-semi-bold ms-2">(11.9%)</span></h6>
                      </td>
                      <td className="align-middle text-end transactions" style={{ width: '17%' }}>
                        <h6 className="mb-0">17<span className="text-700 fw-semi-bold ms-2">(6.91%)</span></h6>
                      </td>
                      <td className="align-middle text-end revenue" style={{ width: '17%' }}>
                        <h6 className="mb-0">$2456<span className="text-700 fw-semi-bold ms-2">(10.2%)</span></h6>
                      </td>
                      <td className="align-middle text-end pe-0 conv-rate" style={{ width: '17%' }}>
                        <h6>6.01%</h6>
                      </td>
                    </tr>
                    <tr>
                      <td className="white-space-nowrap ps-0 country" style={{ width: '32%' }}>
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 me-3">6. </h6><a href="index.html#!">
                            <div className="d-flex align-items-center"><img src="assets/img/country/russia.png" alt="" width={24} />
                              <p className="mb-0 ps-3 text-primary fw-bold fs--1">Russia</p>
                            </div>
                          </a>
                        </div>
                      </td>
                      <td className="align-middle users" style={{ width: '17%' }}>
                        <h6 className="mb-0">54215<span className="text-700 fw-semi-bold ms-2">(32.9%)</span></h6>
                      </td>
                      <td className="align-middle text-end transactions" style={{ width: '17%' }}>
                        <h6 className="mb-0">38<span className="text-700 fw-semi-bold ms-2">(7.91%)</span></h6>
                      </td>
                      <td className="align-middle text-end revenue" style={{ width: '17%' }}>
                        <h6 className="mb-0">$3254<span className="text-700 fw-semi-bold ms-2">(12.4%)</span></h6>
                      </td>
                      <td className="align-middle text-end pe-0 conv-rate" style={{ width: '17%' }}>
                        <h6>6.21%</h6>
                      </td>
                    </tr>
                    <tr>
                      <td className="white-space-nowrap ps-0 country" style={{ width: '32%' }}>
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 me-3">7. </h6><a href="index.html#!">
                            <div className="d-flex align-items-center"><img src="assets/img/country/australia.png" alt="" width={24} />
                              <p className="mb-0 ps-3 text-primary fw-bold fs--1">Australia</p>
                            </div>
                          </a>
                        </div>
                      </td>
                      <td className="align-middle users" style={{ width: '17%' }}>
                        <h6 className="mb-0">54789<span className="text-700 fw-semi-bold ms-2">(12.7%)</span></h6>
                      </td>
                      <td className="align-middle text-end transactions" style={{ width: '17%' }}>
                        <h6 className="mb-0">32<span className="text-700 fw-semi-bold ms-2">(14.0%)</span></h6>
                      </td>
                      <td className="align-middle text-end revenue" style={{ width: '17%' }}>
                        <h6 className="mb-0">$3215<span className="text-700 fw-semi-bold ms-2">(5.72%)</span></h6>
                      </td>
                      <td className="align-middle text-end pe-0 conv-rate" style={{ width: '17%' }}>
                        <h6>12.02%</h6>
                      </td>
                    </tr>
                    <tr>
                      <td className="white-space-nowrap ps-0 country" style={{ width: '32%' }}>
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 me-3">8. </h6><a href="index.html#!">
                            <div className="d-flex align-items-center"><img src="assets/img/country/england.png" alt="" width={24} />
                              <p className="mb-0 ps-3 text-primary fw-bold fs--1">England</p>
                            </div>
                          </a>
                        </div>
                      </td>
                      <td className="align-middle users" style={{ width: '17%' }}>
                        <h6 className="mb-0">14785<span className="text-700 fw-semi-bold ms-2">(12.9%)</span></h6>
                      </td>
                      <td className="align-middle text-end transactions" style={{ width: '17%' }}>
                        <h6 className="mb-0">11<span className="text-700 fw-semi-bold ms-2">(32.91%)</span></h6>
                      </td>
                      <td className="align-middle text-end revenue" style={{ width: '17%' }}>
                        <h6 className="mb-0">$4745<span className="text-700 fw-semi-bold ms-2">(10.2%)</span></h6>
                      </td>
                      <td className="align-middle text-end pe-0 conv-rate" style={{ width: '17%' }}>
                        <h6>8.01%</h6>
                      </td>
                    </tr>
                    <tr>
                      <td className="white-space-nowrap ps-0 country" style={{ width: '32%' }}>
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 me-3">9. </h6><a href="index.html#!">
                            <div className="d-flex align-items-center"><img src="assets/img/country/indonesia.png" alt="" width={24} />
                              <p className="mb-0 ps-3 text-primary fw-bold fs--1">Indonesia</p>
                            </div>
                          </a>
                        </div>
                      </td>
                      <td className="align-middle users" style={{ width: '17%' }}>
                        <h6 className="mb-0">32156<span className="text-700 fw-semi-bold ms-2">(32.2%)</span></h6>
                      </td>
                      <td className="align-middle text-end transactions" style={{ width: '17%' }}>
                        <h6 className="mb-0">89<span className="text-700 fw-semi-bold ms-2">(12.0%)</span></h6>
                      </td>
                      <td className="align-middle text-end revenue" style={{ width: '17%' }}>
                        <h6 className="mb-0">$2456<span className="text-700 fw-semi-bold ms-2">(23.2%)</span></h6>
                      </td>
                      <td className="align-middle text-end pe-0 conv-rate" style={{ width: '17%' }}>
                        <h6>9.07%</h6>
                      </td>
                    </tr>
                    <tr>
                      <td className="white-space-nowrap ps-0 country" style={{ width: '32%' }}>
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 me-3">10. </h6><a href="index.html#!">
                            <div className="d-flex align-items-center"><img src="assets/img/country/japan.png" alt="" width={24} />
                              <p className="mb-0 ps-3 text-primary fw-bold fs--1">Japan</p>
                            </div>
                          </a>
                        </div>
                      </td>
                      <td className="align-middle users" style={{ width: '17%' }}>
                        <h6 className="mb-0">12547<span className="text-700 fw-semi-bold ms-2">(12.7%)</span></h6>
                      </td>
                      <td className="align-middle text-end transactions" style={{ width: '17%' }}>
                        <h6 className="mb-0">21<span className="text-700 fw-semi-bold ms-2">(14.91%)</span></h6>
                      </td>
                      <td className="align-middle text-end revenue" style={{ width: '17%' }}>
                        <h6 className="mb-0">$2541<span className="text-700 fw-semi-bold ms-2">(23.2%)</span></h6>
                      </td>
                      <td className="align-middle text-end pe-0 conv-rate" style={{ width: '17%' }}>
                        <h6>20.01%</h6>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row align-items-center py-1">
                <div className="pagination d-none" />
                <div className="col d-flex fs--1">
                  <p className="mb-0 d-none d-sm-block me-3 fw-semi-bold text-900" data-list-info="data-list-info" />
                </div>
                <div className="col-auto d-flex">
                  <button className="btn btn-link px-1 me-1" type="button" title="Previous" data-list-pagination="prev"><span className="fas fa-chevron-left me-2" />Previous</button><button className="btn btn-link px-1 ms-1" type="button" title="Next" data-list-pagination="next">Next<span className="fas fa-chevron-right ms-2" /></button>
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
    </>
  )
}