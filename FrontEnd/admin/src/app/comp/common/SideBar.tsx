import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function SideBar() {
    const location = useLocation();

    return (
        <>
            <nav className="navbar navbar-vertical navbar-expand-lg">
                <div className="collapse navbar-collapse" id="navbarVerticalCollapse">
                    {/* scrollbar removed*/}
                    <div className="navbar-vertical-content">
                        <ul className="navbar-nav flex-column" id="navbarVerticalNav">
                            <li className="nav-item">
                                {/* parent pages*/}
                                <div className="nav-item-wrapper">
                                    <div className="parent-wrapper label-1">
                                        <ul className="nav " id="nv-home">  
                                            <li className="nav-item mb-2"><Link className={location.pathname === "/student" ? "nav-link active" : "nav-link"} to="student" >
                                                <div className="d-flex align-items-center"><span className="nav-link-text" style={{fontSize:"16px",paddingLeft:"0"}}><i className="fa-regular fa-user"></i> Manage Student</span></div>
                                            </Link>
                                            </li>
                                            <li className="nav-item mb-2"><Link className={location.pathname === "/category" ? "nav-link active" : "nav-link"} to="category" >
                                                <div className="d-flex align-items-center"><span className="nav-link-text" style={{fontSize:"16px",paddingLeft:"0"}}><i className="fa-solid fa-layer-group"></i> Manage Catgory</span></div>
                                            </Link>
                                            </li>
                                            <li className="nav-item mb-2"><Link className={location.pathname === "/book" ? "nav-link active" : "nav-link"} to="book" >
                                                <div className="d-flex align-items-center"><span className="nav-link-text" style={{fontSize:"16px",paddingLeft:"0"}}><i className="fa-solid fa-book"></i> Manage Book</span></div>
                                            </Link>
                                            </li>
                                            <li className="nav-item mb-2"><Link className={location.pathname === "/order" ? "nav-link active" : "nav-link"} to="order" >
                                                <div className="d-flex align-items-center"><span className="nav-link-text" style={{fontSize:"16px",paddingLeft:"0"}}><i className="fa-brands fa-first-order"></i> Manage Order</span></div>
                                            </Link>
                                            </li>
                                            <li className="nav-item mb-2"><Link className={location.pathname === "/returnbook" ? "nav-link active" : "nav-link"} to="returnbook" >
                                                <div className="d-flex align-items-center"><span className="nav-link-text" style={{fontSize:"16px",paddingLeft:"0"}}>Manage Return Book</span></div>
                                            </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-vertical-footer"><button className="btn navbar-vertical-toggle border-0 fw-semi-bold w-100 white-space-nowrap d-flex align-items-center"><span className="uil uil-left-arrow-to-left fs-0" /><span className="uil uil-arrow-from-right fs-0" /><span className="navbar-vertical-footer-text ms-2">Collapsed View</span></button></div>
            </nav>
        </>
    )
}
