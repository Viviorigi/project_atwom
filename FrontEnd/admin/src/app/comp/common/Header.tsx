import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {

    return (
        <>
            <nav className="navbar navbar-top fixed-top navbar-expand" id="navbarDefault"  >
                <div className="collapse navbar-collapse justify-content-between">
                    <div className="navbar-logo">
                        <button className="btn navbar-toggler navbar-toggler-humburger-icon hover-bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#navbarVerticalCollapse" aria-controls="navbarVerticalCollapse" aria-expanded="false" aria-label="Toggle Navigation"><span className="navbar-toggle-icon"><span className="toggle-line" /></span></button>
                        <Link className="navbar-brand me-1 me-sm-3" to="/dashboard">
                            <div className="d-flex align-items-center">
                                <div className="d-flex align-items-center"><img src="assets/img/icons/logo.png" alt="phoenix" width={27} />
                                    <p className="logo-text ms-2 d-none d-sm-block">phoenix</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="search-box navbar-top-search-box d-none d-lg-block" data-list="{&quot;valueNames&quot;:[&quot;title&quot;]}" style={{ width: '25rem' }}>
                        <form className="position-relative" data-bs-toggle="search" data-bs-display="static"><input className="form-control search-input fuzzy-search rounded-pill form-control-sm" type="search" placeholder="Search..." aria-label="Search" />
                            <span className="fas fa-search search-box-icon" />
                        </form>
                        <div className="btn-close position-absolute end-0 top-50 translate-middle cursor-pointer shadow-none" data-bs-dismiss="search"><button className="btn btn-link btn-close-falcon p-0" aria-label="Close" /></div>
                        <div className="dropdown-menu border border-300 font-base start-0 py-0 overflow-hidden w-100">
                            <div className="scrollbar-overlay" style={{ maxHeight: '30rem' }}>
                                <div className="list pb-3">
                                    <h6 className="dropdown-header text-1000 fs--2 py-2">24 <span className="text-500">results</span></h6>
                                    <hr className="text-200 my-0" />
                                    <h6 className="dropdown-header text-1000 fs--1 border-bottom border-200 py-2 lh-sm">Recently Searched </h6>
                                    <div className="py-2"><a className="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                                        <div className="d-flex align-items-center">
                                            <div className="fw-normal text-1000 title"><span className="fa-solid fa-clock-rotate-left" data-fa-transform="shrink-2" /> Store Macbook</div>
                                        </div>
                                    </a>
                                        <a className="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                                            <div className="d-flex align-items-center">
                                                <div className="fw-normal text-1000 title"> <span className="fa-solid fa-clock-rotate-left" data-fa-transform="shrink-2" /> MacBook Air - 13″</div>
                                            </div>
                                        </a>
                                    </div>
                                    <hr className="text-200 my-0" />
                                    <h6 className="dropdown-header text-1000 fs--1 border-bottom border-200 py-2 lh-sm">Products</h6>
                                    <div className="py-2"><a className="dropdown-item py-2 d-flex align-items-center" href="apps/e-commerce/landing/product-details.html">
                                        <div className="file-thumbnail me-2"><img className="h-100 w-100 fit-cover rounded-3" src="https://prium.github.io/phoenix/v1.13.0/assets/img/products/60x60/3.png" alt="" /></div>
                                        <div className="flex-1">
                                            <h6 className="mb-0 text-1000 title">MacBook Air - 13″</h6>
                                            <p className="fs--2 mb-0 d-flex text-700"><span className="fw-medium text-600">8GB Memory - 1.6GHz - 128GB Storage</span></p>
                                        </div>
                                    </a>
                                        <a className="dropdown-item py-2 d-flex align-items-center" href="apps/e-commerce/landing/product-details.html">
                                            <div className="file-thumbnail me-2"><img className="img-fluid" src="https://prium.github.io/phoenix/v1.13.0/assets/img/products/60x60/3.png" alt="" /></div>
                                            <div className="flex-1">
                                                <h6 className="mb-0 text-1000 title">MacBook Pro - 13″</h6>
                                                <p className="fs--2 mb-0 d-flex text-700"><span className="fw-medium text-600 ms-2">30 Sep at 12:30 PM</span></p>
                                            </div>
                                        </a>
                                    </div>
                                    <hr className="text-200 my-0" />
                                    <h6 className="dropdown-header text-1000 fs--1 border-bottom border-200 py-2 lh-sm">Quick Links</h6>
                                    <div className="py-2"><a className="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                                        <div className="d-flex align-items-center">
                                            <div className="fw-normal text-1000 title"><span className="fa-solid fa-link text-900" data-fa-transform="shrink-2" /> Support MacBook House</div>
                                        </div>
                                    </a>
                                        <a className="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                                            <div className="d-flex align-items-center">
                                                <div className="fw-normal text-1000 title"> <span className="fa-solid fa-link text-900" data-fa-transform="shrink-2" /> Store MacBook″</div>
                                            </div>
                                        </a>
                                    </div>
                                    <hr className="text-200 my-0" />
                                    <h6 className="dropdown-header text-1000 fs--1 border-bottom border-200 py-2 lh-sm">Files</h6>
                                    <div className="py-2"><a className="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                                        <div className="d-flex align-items-center">
                                            <div className="fw-normal text-1000 title"><span className="fa-solid fa-file-zipper text-900" data-fa-transform="shrink-2" /> Library MacBook folder.rar</div>
                                        </div>
                                    </a>
                                        <a className="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                                            <div className="d-flex align-items-center">
                                                <div className="fw-normal text-1000 title"> <span className="fa-solid fa-file-lines text-900" data-fa-transform="shrink-2" /> Feature MacBook extensions.txt</div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                                            <div className="d-flex align-items-center">
                                                <div className="fw-normal text-1000 title"> <span className="fa-solid fa-image text-900" data-fa-transform="shrink-2" /> MacBook Pro_13.jpg</div>
                                            </div>
                                        </a>
                                    </div>
                                    <hr className="text-200 my-0" />
                                    <h6 className="dropdown-header text-1000 fs--1 border-bottom border-200 py-2 lh-sm">Members</h6>
                                    <div className="py-2"><a className="dropdown-item py-2 d-flex align-items-center" href="pages/members.html">
                                        <div className="avatar avatar-l status-online  me-2 text-900">
                                            <img className="rounded-circle " src="assets/img/team/40x40/10.webp" alt="" />
                                        </div>
                                        <div className="flex-1">
                                            <h6 className="mb-0 text-1000 title">Carry Anna</h6>
                                            <p className="fs--2 mb-0 d-flex text-700">anna@technext.it</p>
                                        </div>
                                    </a>
                                        <a className="dropdown-item py-2 d-flex align-items-center" href="pages/members.html">
                                            <div className="avatar avatar-l  me-2 text-900">
                                                <img className="rounded-circle " src="assets/img/team/40x40/12.webp" alt="" />
                                            </div>
                                            <div className="flex-1">
                                                <h6 className="mb-0 text-1000 title">John Smith</h6>
                                                <p className="fs--2 mb-0 d-flex text-700">smith@technext.it</p>
                                            </div>
                                        </a>
                                    </div>
                                    <hr className="text-200 my-0" />
                                    <h6 className="dropdown-header text-1000 fs--1 border-bottom border-200 py-2 lh-sm">Related Searches</h6>
                                    <div className="py-2"><a className="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                                        <div className="d-flex align-items-center">
                                            <div className="fw-normal text-1000 title"><span className="fa-brands fa-firefox-browser text-900" data-fa-transform="shrink-2" /> Search in the Web MacBook</div>
                                        </div>
                                    </a>
                                        <a className="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                                            <div className="d-flex align-items-center">
                                                <div className="fw-normal text-1000 title"> <span className="fa-brands fa-chrome text-900" data-fa-transform="shrink-2" /> Store MacBook″</div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="fallback fw-bold fs-1 d-none">No Result Found.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="navbar-nav navbar-nav-icons flex-row">
                        <li className="nav-item">
                            <div className="theme-control-toggle fa-icon-wait px-2"><input className="form-check-input ms-0 theme-control-toggle-input" type="checkbox" data-theme-control="phoenixTheme" defaultValue="dark" id="themeControlToggle" /><label className="mb-0 theme-control-toggle-label theme-control-toggle-light" htmlFor="themeControlToggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Switch theme"><span className="icon" data-feather="moon" /></label><label className="mb-0 theme-control-toggle-label theme-control-toggle-dark" htmlFor="themeControlToggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Switch theme"><span className="icon" data-feather="sun" /></label></div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="index.html#" style={{ minWidth: '2.5rem' }} role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-auto-close="outside"><span className="far fa-bell" style={{ height: 20, width: 20 }} /></a>
                            <div className="dropdown-menu dropdown-menu-end notification-dropdown-menu py-0 shadow border border-300 navbar-dropdown-caret" id="navbarDropdownNotfication" aria-labelledby="navbarDropdownNotfication">
                                <div className="card position-relative border-0">
                                    <div className="card-header p-2">
                                        <div className="d-flex justify-content-between">
                                            <h5 className="text-black mb-0">Notificatons</h5><button className="btn btn-link p-0 fs--1 fw-normal" type="button">Mark all as read</button>
                                        </div>
                                    </div>
                                    <div className="card-body p-0">
                                        <div className="scrollbar-overlay" style={{ height: '27rem' }}>
                                            <div className="border-300">
                                                <div className="px-2 px-sm-3 py-3 border-300 notification-card position-relative read border-bottom">
                                                    <div className="d-flex align-items-center justify-content-between position-relative">
                                                        <div className="d-flex">
                                                            <div className="avatar avatar-m status-online me-3"><img className="rounded-circle" src="assets/img/team/40x40/30.webp" alt="" /></div>
                                                            <div className="flex-1 me-sm-3">
                                                                <h4 className="fs--1 text-black">Jessie Samson</h4>
                                                                <p className="fs--1 text-1000 mb-2 mb-sm-3 fw-normal"><span className="me-1 fs--2">💬</span>Mentioned you in a comment.<span className="ms-2 text-400 fw-bold fs--2">10m</span></p>
                                                                <p className="text-800 fs--1 mb-0"><span className="me-1 fas fa-clock" /><span className="fw-bold">10:41 AM </span>August 7,2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="font-sans-serif d-none d-sm-block"><button className="btn fs--2 btn-sm dropdown-toggle dropdown-caret-none transition-none notification-dropdown-toggle" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span className="fas fa-ellipsis-h fs--2 text-900" /></button>
                                                            <div className="dropdown-menu dropdown-menu-end py-2"><a className="dropdown-item" href="index.html#!">Mark as unread</a></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="px-2 px-sm-3 py-3 border-300 notification-card position-relative unread border-bottom">
                                                    <div className="d-flex align-items-center justify-content-between position-relative">
                                                        <div className="d-flex">
                                                            <div className="avatar avatar-m status-online me-3">
                                                                <div className="avatar-name rounded-circle"><span>J</span></div>
                                                            </div>
                                                            <div className="flex-1 me-sm-3">
                                                                <h4 className="fs--1 text-black">Jane Foster</h4>
                                                                <p className="fs--1 text-1000 mb-2 mb-sm-3 fw-normal"><span className="me-1 fs--2">📅</span>Created an event.<span className="ms-2 text-400 fw-bold fs--2">20m</span></p>
                                                                <p className="text-800 fs--1 mb-0"><span className="me-1 fas fa-clock" /><span className="fw-bold">10:20 AM </span>August 7,2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="font-sans-serif d-none d-sm-block"><button className="btn fs--2 btn-sm dropdown-toggle dropdown-caret-none transition-none notification-dropdown-toggle" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span className="fas fa-ellipsis-h fs--2 text-900" /></button>
                                                            <div className="dropdown-menu dropdown-menu-end py-2"><a className="dropdown-item" href="index.html#!">Mark as unread</a></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="px-2 px-sm-3 py-3 border-300 notification-card position-relative unread border-bottom">
                                                    <div className="d-flex align-items-center justify-content-between position-relative">
                                                        <div className="d-flex">
                                                            <div className="avatar avatar-m status-online me-3"><img className="rounded-circle avatar-placeholder" src="assets/img/team/40x40/avatar.webp" alt="" /></div>
                                                            <div className="flex-1 me-sm-3">
                                                                <h4 className="fs--1 text-black">Jessie Samson</h4>
                                                                <p className="fs--1 text-1000 mb-2 mb-sm-3 fw-normal"><span className="me-1 fs--2">👍</span>Liked your comment.<span className="ms-2 text-400 fw-bold fs--2">1h</span></p>
                                                                <p className="text-800 fs--1 mb-0"><span className="me-1 fas fa-clock" /><span className="fw-bold">9:30 AM </span>August 7,2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="font-sans-serif d-none d-sm-block"><button className="btn fs--2 btn-sm dropdown-toggle dropdown-caret-none transition-none notification-dropdown-toggle" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span className="fas fa-ellipsis-h fs--2 text-900" /></button>
                                                            <div className="dropdown-menu dropdown-menu-end py-2"><a className="dropdown-item" href="index.html#!">Mark as unread</a></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-300">
                                                <div className="px-2 px-sm-3 py-3 border-300 notification-card position-relative unread border-bottom">
                                                    <div className="d-flex align-items-center justify-content-between position-relative">
                                                        <div className="d-flex">
                                                            <div className="avatar avatar-m status-online me-3"><img className="rounded-circle" src="assets/img/team/40x40/57.webp" alt="" /></div>
                                                            <div className="flex-1 me-sm-3">
                                                                <h4 className="fs--1 text-black">Kiera Anderson</h4>
                                                                <p className="fs--1 text-1000 mb-2 mb-sm-3 fw-normal"><span className="me-1 fs--2">💬</span>Mentioned you in a comment.<span className="ms-2 text-400 fw-bold fs--2" /></p>
                                                                <p className="text-800 fs--1 mb-0"><span className="me-1 fas fa-clock" /><span className="fw-bold">9:11 AM </span>August 7,2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="font-sans-serif d-none d-sm-block"><button className="btn fs--2 btn-sm dropdown-toggle dropdown-caret-none transition-none notification-dropdown-toggle" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span className="fas fa-ellipsis-h fs--2 text-900" /></button>
                                                            <div className="dropdown-menu dropdown-menu-end py-2"><a className="dropdown-item" href="index.html#!">Mark as unread</a></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="px-2 px-sm-3 py-3 border-300 notification-card position-relative unread border-bottom">
                                                    <div className="d-flex align-items-center justify-content-between position-relative">
                                                        <div className="d-flex">
                                                            <div className="avatar avatar-m status-online me-3"><img className="rounded-circle" src="assets/img/team/40x40/59.webp" alt="" /></div>
                                                            <div className="flex-1 me-sm-3">
                                                                <h4 className="fs--1 text-black">Herman Carter</h4>
                                                                <p className="fs--1 text-1000 mb-2 mb-sm-3 fw-normal"><span className="me-1 fs--2">👤</span>Tagged you in a comment.<span className="ms-2 text-400 fw-bold fs--2" /></p>
                                                                <p className="text-800 fs--1 mb-0"><span className="me-1 fas fa-clock" /><span className="fw-bold">10:58 PM </span>August 7,2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="font-sans-serif d-none d-sm-block"><button className="btn fs--2 btn-sm dropdown-toggle dropdown-caret-none transition-none notification-dropdown-toggle" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span className="fas fa-ellipsis-h fs--2 text-900" /></button>
                                                            <div className="dropdown-menu dropdown-menu-end py-2"><a className="dropdown-item" href="index.html#!">Mark as unread</a></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="px-2 px-sm-3 py-3 border-300 notification-card position-relative read ">
                                                    <div className="d-flex align-items-center justify-content-between position-relative">
                                                        <div className="d-flex">
                                                            <div className="avatar avatar-m status-online me-3"><img className="rounded-circle" src="assets/img/team/40x40/58.webp" alt="" /></div>
                                                            <div className="flex-1 me-sm-3">
                                                                <h4 className="fs--1 text-black">Benjamin Button</h4>
                                                                <p className="fs--1 text-1000 mb-2 mb-sm-3 fw-normal"><span className="me-1 fs--2">👍</span>Liked your comment.<span className="ms-2 text-400 fw-bold fs--2" /></p>
                                                                <p className="text-800 fs--1 mb-0"><span className="me-1 fas fa-clock" /><span className="fw-bold">10:18 AM </span>August 7,2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="font-sans-serif d-none d-sm-block"><button className="btn fs--2 btn-sm dropdown-toggle dropdown-caret-none transition-none notification-dropdown-toggle" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span className="fas fa-ellipsis-h fs--2 text-900" /></button>
                                                            <div className="dropdown-menu dropdown-menu-end py-2"><a className="dropdown-item" href="index.html#!">Mark as unread</a></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer p-0 border-top border-0">
                                        <div className="my-2 text-center fw-bold fs--2 text-600"><a className="fw-bolder" href="pages/notifications.html">Notification history</a></div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" id="navbarDropdownNindeDots" href="index.html#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" data-bs-auto-close="outside" aria-expanded="false"><svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx={2} cy={2} r={2} fill="currentColor" />
                                <circle cx={2} cy={8} r={2} fill="currentColor" />
                                <circle cx={2} cy={14} r={2} fill="currentColor" />
                                <circle cx={8} cy={8} r={2} fill="currentColor" />
                                <circle cx={8} cy={14} r={2} fill="currentColor" />
                                <circle cx={14} cy={8} r={2} fill="currentColor" />
                                <circle cx={14} cy={14} r={2} fill="currentColor" />
                                <circle cx={8} cy={2} r={2} fill="currentColor" />
                                <circle cx={14} cy={2} r={2} fill="currentColor" />
                            </svg></a>
                            <div className="dropdown-menu dropdown-menu-end navbar-dropdown-caret py-0 dropdown-nide-dots shadow border border-300" aria-labelledby="navbarDropdownNindeDots">
                                <div className="card bg-white position-relative border-0">
                                    <div className="card-body pt-3 px-3 pb-0 overflow-auto scrollbar" style={{ height: '20rem' }}>
                                        <div className="row text-center align-items-center gx-0 gy-0">
                                            <div className="col-4"><a className="d-block hover-bg-200 p-2 rounded-3 text-center text-decoration-none mb-3" href="index.html#!"><img src="assets/img/nav-icons/behance.webp" alt="" width={30} />
                                                <p className="mb-0 text-black text-truncate fs--2 mt-1 pt-1">Behance</p>
                                            </a></div>
                                            <div className="col-4"><a className="d-block hover-bg-200 p-2 rounded-3 text-center text-decoration-none mb-3" href="index.html#!"><img src="assets/img/nav-icons/google-cloud.webp" alt="" width={30} />
                                                <p className="mb-0 text-black text-truncate fs--2 mt-1 pt-1">Cloud</p>
                                            </a></div>
                                            <div className="col-4"><a className="d-block hover-bg-200 p-2 rounded-3 text-center text-decoration-none mb-3" href="index.html#!"><img src="assets/img/nav-icons/slack.webp" alt="" width={30} />
                                                <p className="mb-0 text-black text-truncate fs--2 mt-1 pt-1">Slack</p>
                                            </a></div>
                                            <div className="col-4"><a className="d-block hover-bg-200 p-2 rounded-3 text-center text-decoration-none mb-3" href="index.html#!"><img src="assets/img/nav-icons/gitlab.webp" alt="" width={30} />
                                                <p className="mb-0 text-black text-truncate fs--2 mt-1 pt-1">Gitlab</p>
                                            </a></div>
                                            <div className="col-4"><a className="d-block hover-bg-200 p-2 rounded-3 text-center text-decoration-none mb-3" href="index.html#!"><img src="assets/img/nav-icons/bitbucket.webp" alt="" width={30} />
                                                <p className="mb-0 text-black text-truncate fs--2 mt-1 pt-1">BitBucket</p>
                                            </a></div>
                                            <div className="col-4"><a className="d-block hover-bg-200 p-2 rounded-3 text-center text-decoration-none mb-3" href="index.html#!"><img src="assets/img/nav-icons/google-drive.webp" alt="" width={30} />
                                                <p className="mb-0 text-black text-truncate fs--2 mt-1 pt-1">Drive</p>
                                            </a></div>
                                            <div className="col-4"><a className="d-block hover-bg-200 p-2 rounded-3 text-center text-decoration-none mb-3" href="index.html#!"><img src="assets/img/nav-icons/trello.webp" alt="" width={30} />
                                                <p className="mb-0 text-black text-truncate fs--2 mt-1 pt-1">Trello</p>
                                            </a></div>
                                            <div className="col-4"><a className="d-block hover-bg-200 p-2 rounded-3 text-center text-decoration-none mb-3" href="index.html#!"><img src="assets/img/nav-icons/figma.webp" alt="" width={20} />
                                                <p className="mb-0 text-black text-truncate fs--2 mt-1 pt-1">Figma</p>
                                            </a></div>
                                            <div className="col-4"><a className="d-block hover-bg-200 p-2 rounded-3 text-center text-decoration-none mb-3" href="index.html#!"><img src="assets/img/nav-icons/twitter.webp" alt="" width={30} />
                                                <p className="mb-0 text-black text-truncate fs--2 mt-1 pt-1">Twitter</p>
                                            </a></div>
                                            <div className="col-4"><a className="d-block hover-bg-200 p-2 rounded-3 text-center text-decoration-none mb-3" href="index.html#!"><img src="assets/img/nav-icons/pinterest.webp" alt="" width={30} />
                                                <p className="mb-0 text-black text-truncate fs--2 mt-1 pt-1">Pinterest</p>
                                            </a></div>
                                            <div className="col-4"><a className="d-block hover-bg-200 p-2 rounded-3 text-center text-decoration-none mb-3" href="index.html#!"><img src="assets/img/nav-icons/ln.webp" alt="" width={30} />
                                                <p className="mb-0 text-black text-truncate fs--2 mt-1 pt-1">Linkedin</p>
                                            </a></div>
                                            <div className="col-4"><a className="d-block hover-bg-200 p-2 rounded-3 text-center text-decoration-none mb-3" href="index.html#!"><img src="assets/img/nav-icons/google-maps.webp" alt="" width={30} />
                                                <p className="mb-0 text-black text-truncate fs--2 mt-1 pt-1">Maps</p>
                                            </a></div>
                                            <div className="col-4"><a className="d-block hover-bg-200 p-2 rounded-3 text-center text-decoration-none mb-3" href="index.html#!"><img src="assets/img/nav-icons/google-photos.webp" alt="" width={30} />
                                                <p className="mb-0 text-black text-truncate fs--2 mt-1 pt-1">Photos</p>
                                            </a></div>
                                            <div className="col-4"><a className="d-block hover-bg-200 p-2 rounded-3 text-center text-decoration-none mb-3" href="index.html#!"><img src="assets/img/nav-icons/spotify.webp" alt="" width={30} />
                                                <p className="mb-0 text-black text-truncate fs--2 mt-1 pt-1">Spotify</p>
                                            </a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item dropdown"><a className="nav-link lh-1 pe-0" id="navbarDropdownUser" href="index.html#!" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                            <div className="avatar avatar-l ">
                                <img className="rounded-circle " src="assets/img/team/40x40/57.webp" alt="" />
                            </div>
                        </a>
                            <div className="dropdown-menu dropdown-menu-end navbar-dropdown-caret py-0 dropdown-profile shadow border border-300" aria-labelledby="navbarDropdownUser">
                                <div className="card position-relative border-0">
                                    <div className="card-body p-0">
                                        <div className="text-center pt-4 pb-3">
                                            <div className="avatar avatar-xl ">
                                                <img className="rounded-circle " src="assets/img/team/72x72/57.webp" alt="" />
                                            </div>
                                            <h6 className="mt-2 text-black">Jerry Seinfield</h6>
                                        </div>
                                        <div className="mb-3 mx-3"><input className="form-control form-control-sm" id="statusUpdateInput" type="text" placeholder="Update your status" /></div>
                                    </div>
                                    <div className="overflow-auto scrollbar" style={{ height: '10rem' }}>
                                        <ul className="nav d-flex flex-column mb-2 pb-1">
                                            <li className="nav-item"><a className="nav-link px-3" href="index.html#!"> <span className="me-2 text-900" data-feather="user" /><span>Profile</span></a></li>
                                            <li className="nav-item"><a className="nav-link px-3" href="index.html#!"><span className="me-2 text-900" data-feather="pie-chart" />Dashboard</a></li>
                                            <li className="nav-item"><a className="nav-link px-3" href="index.html#!"> <span className="me-2 text-900" data-feather="lock" />Posts &amp; Activity</a></li>
                                            <li className="nav-item"><a className="nav-link px-3" href="index.html#!"> <span className="me-2 text-900" data-feather="settings" />Settings &amp; Privacy </a></li>
                                            <li className="nav-item"><a className="nav-link px-3" href="index.html#!"> <span className="me-2 text-900" data-feather="help-circle" />Help Center</a></li>
                                            <li className="nav-item"><a className="nav-link px-3" href="index.html#!"> <span className="me-2 text-900" data-feather="globe" />Language</a></li>
                                        </ul>
                                    </div>
                                    <div className="card-footer p-0 border-top">
                                        <ul className="nav d-flex flex-column my-3">
                                            <li className="nav-item"><a className="nav-link px-3" href="index.html#!"> <span className="me-2 text-900" data-feather="user-plus" />Add another account</a></li>
                                        </ul>
                                        <hr />
                                        <div className="px-3"> <a className="btn btn-phoenix-secondary d-flex flex-center w-100" href="index.html#!"> <span className="me-2" data-feather="log-out"> </span>Sign out</a></div>
                                        <div className="my-2 text-center fw-bold fs--2 text-600"><a className="text-600 me-1" href="index.html#!">Privacy policy</a>•<a className="text-600 mx-1" href="index.html#!">Terms</a>•<a className="text-600 ms-1" href="index.html#!">Cookies</a></div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
