import React, { useEffect, useState, useRef } from 'react';
import { ReturnDTO } from '../../model/ReturnDTO';
import { format } from 'date-fns';
//import ReturnDetail from './ReturnDetail';
import Pagination from '../../comp/common/Pagination';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../store/hook';
import { setLoading } from '../../reducers/spinnerSlice';
import { ReturnService } from '../../services/return/ReturnService';

const Return = () => {
  const [returns, setReturns] = useState<ReturnDTO[]>([]);
  const [totalReturns, setTotalReturns] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [returnDetailOpen, setReturnDetailOpen] = useState(false);
  const [returnSearchParams, setReturnSearchParams] = useState({ keySearch: '', page: 1, limit: 5, timer: new Date().getTime() });
  const dispatch = useAppDispatch();
  const indexOfLastItem = returnSearchParams.page * returnSearchParams.limit;
  const indexOfFirstItem = indexOfLastItem - returnSearchParams.limit;
  const returnRef = useRef<ReturnDTO | null>(null);

  useEffect(() => {
    fetchReturns();
  }, [returnSearchParams.timer, returnSearchParams.page]);

  const fetchReturns = async () => {
    try {
      const resp = await ReturnService.findAll();
      dispatch(setLoading(false));
      setReturns(resp);
      setTotalReturns(resp.length);
      setTotalPage(Math.ceil(resp.length / returnSearchParams.limit));
    } catch (error) {
      console.error('Error fetching returns', error);
      dispatch(setLoading(false));
    }
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReturnSearchParams({ ...returnSearchParams, [event.target.name]: event.target.value, page: 1 });
  };

  const handleKeyUpSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setReturnSearchParams({ ...returnSearchParams, timer: new Date().getTime() });
    }
  };

  const viewReturnDetail = (returnItem: ReturnDTO) => {
    returnRef.current = returnItem;
    setReturnDetailOpen(true);
  };

  const deleteReturn = (id: number) => {
    Swal.fire({
      title: 'Confirm',
      text: 'Do you want to delete this return?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#89B449',
      cancelButtonColor: '#E68A8C',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.value) {
        dispatch(setLoading(true));
        try {
          //await ReturnService.deleteById(id);
          dispatch(setLoading(false));
          setReturnSearchParams({ ...returnSearchParams, timer: new Date().getTime() });
          toast.success('Return deleted successfully');
        } catch (error) {
          dispatch(setLoading(false));
          toast.error('Error deleting return');
        }
      }
    });
  };

  return (
    <div>
      <div className="mb-9">
        <div className="card mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white">
          <div className="row g-2 mb-4">
            <div className="col-auto">
              <h2 className="mt-4">List Returns</h2>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-auto">
              <div className="search-box d-flex">
                <input
                  className="form-control search-input search"
                  type="search"
                  placeholder="Search returns"
                  name="keySearch"
                  aria-label="Search"
                  value={returnSearchParams.keySearch || ''}
                  onChange={handleChangeSearch}
                  onKeyUp={handleKeyUpSearch}
                />
                <button className="btn btn-primary" onClick={() => setReturnSearchParams({ ...returnSearchParams, timer: new Date().getTime() })}>
                  <span className="fas fa-search" />
                </button>
              </div>
            </div>
          </div>

          <div className="table-responsive scrollbar-overlay mx-n1 px-1 mt-5">
            <table className="table table-bordered fs--1 mb-2">
              <thead>
                <tr>
                  <th className="sort align-middle text-center" scope="col" style={{ width: '3%' }}>#</th>
                  <th className="sort align-middle text-center" scope="col" style={{ width: '20%' }}>Student</th>
                  <th className="sort align-middle text-center" scope="col" style={{ width: '20%' }}>Status</th>
                  <th className="sort align-middle text-center" scope="col" style={{ width: '15%' }}>Return Date</th>
                  <th className="sort align-middle text-center" scope="col" style={{ width: '15%' }}>Update Time</th>
                  <th className="sort align-middle text-center" scope="col" style={{ width: '10%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {returns.map((returnItem, index) => (
                  <tr key={returnItem.id}>
                    <td className="align-middle text-end pe-3">{indexOfFirstItem + index + 1}</td>
                    {/* <td className="align-middle">{returnItem.studentName || 'N/A'}</td> */}
                    <td className="align-middle text-center">{returnItem.status}</td>
                    <td className="align-middle text-center">{format(new Date(returnItem.returnDate), 'dd/MM/yyyy, hh:mm')}</td>
                    {/* <td className="align-middle text-center">{format(new Date(returnItem.updateTime), 'dd/MM/yyyy, hh:mm')}</td> */}
                    <td className="align-middle text-center">
                      <button className="btn btn-info btn-sm" onClick={() => viewReturnDetail(returnItem)}>
                        <span className="fas fa-eye" />
                      </button>
                      <button className="btn btn-danger btn-sm ms-2" onClick={() => deleteReturn(returnItem.id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row align-items-center justify-content-between py-2 pe-0 fs--1">
            <div className="col-auto d-flex">
              <p className="mb-0 d-none d-sm-block me-3 fw-semi-bold text-900" data-list-info="data-list-info" />
              <a className="fw-semi-bold" href="#" data-list-view="*">View all<span className="fas fa-angle-right ms-1" data-fa-transform="down-1" /></a>
              <a className="fw-semi-bold d-none" href="#" data-list-view="less">View Less<span className="fas fa-angle-right ms-1" data-fa-transform="down-1" /></a>
            </div>
            <div className="col-auto d-flex">
              <button className="page-link" data-list-pagination="prev"><span className="fas fa-chevron-left" /></button>
              <ul className="mb-0 pagination" />
              <button className="page-link pe-0" data-list-pagination="next"><span className="fas fa-chevron-right" /></button>
            </div>
          </div>
        </div>
      </div>

      {returnDetailOpen && (
        <div className="modal" tabIndex={-1} role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Return Details</h5>
                <button type="button" className="close" onClick={() => setReturnDetailOpen(false)}>
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
                        <th className="sort align-middle" scope="col" style={{width: '10%'}}>Book Code</th>
                        <th className="sort align-middle" scope="col" style={{width: '30%'}}>Book Title</th>
                        <th className="sort align-middle" scope="col" style={{width: '10%'}}>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {returnRef.current?.details?.map((detail, index) => (
                        <tr key={index}>
                          <td className="align-middle">{detail.bookCode}</td>
                          <td className="align-middle">{detail.bookTitle}</td>
                          <td className="align-middle text-center">{detail.quantity}</td>
                        </tr>
                      ))} */}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setReturnDetailOpen(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    
    </div>
  );
};

export default Return;
