import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBar() {
    return (
        <div>
            <nav className="navbar navbar-vertical navbar-expand-lg">
            <div className="collapse navbar-collapse" id="navbarVerticalCollapse">
                {/* scrollbar removed*/}
                <div className="navbar-vertical-content">
                    <ul className="navbar-nav flex-column" id="navbarVerticalNav">
                        <li className="nav-item">
                            {/* parent pages*/}
                            <div className="nav-item-wrapper"><a className="nav-link dropdown-indicator label-1" href="index.html#nv-home" role="button" data-bs-toggle="collapse" aria-expanded="true" aria-controls="nv-home">
                                <div className="d-flex align-items-center">
                                    <div className="dropdown-indicator-icon"><span className="fas fa-caret-right" /></div><span className="nav-link-icon"><span data-feather="pie-chart" /></span><span className="nav-link-text">Home</span>
                                </div>
                            </a>
                                <div className="parent-wrapper label-1">
                                    <ul className="nav collapse parent show" data-bs-parent="#navbarVerticalCollapse" id="nv-home">
                                        <li className="collapsed-nav-item-title d-none">Home</li>
                                        <li className="nav-item"><Link className="nav-link active" to="student" data-bs-toggle aria-expanded="false">
                                            <div className="d-flex align-items-center"><span className="nav-link-text">Manage Student</span></div>
                                        </Link>
                                        </li>
                                        <li className="nav-item"><Link className="nav-link" to="category" data-bs-toggle aria-expanded="false">
                                            <div className="d-flex align-items-center"><span className="nav-link-text">Manage Catgory</span></div>
                                        </Link>
                                        </li>
                                        <li className="nav-item"><Link className="nav-link" to="book" data-bs-toggle aria-expanded="false">
                                            <div className="d-flex align-items-center"><span className="nav-link-text">Manage Book</span></div>
                                        </Link>
                                        </li>
                                        <li className="nav-item"><Link className="nav-link" to="order" data-bs-toggle aria-expanded="false">
                                            <div className="d-flex align-items-center"><span className="nav-link-text">Manage Order</span></div>
                                        </Link>
                                        </li>
                                        <li className="nav-item"><Link className="nav-link" to="returnbook" data-bs-toggle aria-expanded="false">
                                            <div className="d-flex align-items-center"><span className="nav-link-text">Manage Return Book</span></div>
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
        </div>
    )
}
