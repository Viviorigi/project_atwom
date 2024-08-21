import React from 'react'
import styled from 'styled-components'

const PaginationWrapper = styled.div`
    font-size: 18px;
    padding: 0 8px;
    color: var(#cca27e);
    transition: 0.5s ease;
    margin-left: 80%

    .page-item {
        color: var(#cca27e);
    }
`;
export default function Pagination() {
  return (
    <div className="p-4">
    <div className="container-xxl">
      <div className="row">
        <div className="col-12 align-items-center justify-content-center">
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
  )
}
