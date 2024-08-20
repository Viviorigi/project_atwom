import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Pagination from '../../comp/common/Pagination';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../store/hook';
import { setLoading } from '../../reducers/spinnerSlice';
import { ReturnService } from '../../services/return/ReturnService';
import ReturnDetail from './ReturnDetail';
import { Dialog } from 'primereact/dialog';
import ReturnForm from './ReturnForm'; // Import the ReturnForm component
import { ReturnDTO } from '../../model/ReturnDTO';

const Return = () => {
  const [returns, setReturns] = useState<ReturnDTO[]>([]);
  const [totalReturns, setTotalReturns] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [returnDetailOpen, setReturnDetailOpen] = useState(false);
  const [returnFormOpen, setReturnFormOpen] = useState(false); // State to manage ReturnForm visibility
  const [selectedReturn, setSelectedReturn] = useState<ReturnDTO | null>(null); // State to hold the selected return for editing
  const [selectedReturnId, setSelectedReturnId] = useState<number | null>(null);
  const [returnSearchParams, setReturnSearchParams] = useState({
    keySearch: '',
    page: 1,
    limit: 5,
    timer: new Date().getTime(),
  });
  const dispatch = useAppDispatch();
  const indexOfLastItem = returnSearchParams.page * returnSearchParams.limit;
  const indexOfFirstItem = indexOfLastItem - returnSearchParams.limit;

  useEffect(() => {
    fetchReturns();
  }, [returnSearchParams.timer, returnSearchParams.page]);

  const fetchReturns = async () => {
    try {
      dispatch(setLoading(true));
      const resp = await ReturnService.findAllReturn();
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

  const viewReturnDetail = (returnId: number) => {
    setSelectedReturnId(returnId);
    setReturnDetailOpen(true);
  };

  const editReturn = async (returnId: number) => {
    try {
      const returnData = await ReturnService.findReturnById(returnId);
      setSelectedReturn(returnData);
      setReturnFormOpen(true);
    } catch (error) {
      toast.error('Error fetching return details for editing');
    }
  };

  const handleSave = (updatedReturn: ReturnDTO) => {
    setReturns(returns.map(returnItem => returnItem.id === updatedReturn.id ? updatedReturn : returnItem));
    setReturnFormOpen(false);
    toast.success('Return status updated successfully');
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
      if (result.isConfirmed) {
        dispatch(setLoading(true));
        try {
          await ReturnService.deleteReturnById(id);
          setReturnSearchParams({ ...returnSearchParams, timer: new Date().getTime() });
          toast.success('Return deleted successfully');
        } catch (error) {
          toast.error('Error deleting return');
        } finally {
          dispatch(setLoading(false));
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
                <button
                  className="btn btn-primary"
                  onClick={() => setReturnSearchParams({ ...returnSearchParams, timer: new Date().getTime() })}
                >
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
                  <th className="sort align-middle text-center" scope="col" style={{ width: '20%' }}>Fine</th>
                  <th className="sort align-middle text-center" scope="col" style={{ width: '15%' }}>Return Date</th>
                  <th className="sort align-middle text-center" scope="col" style={{ width: '15%' }}>Update Time</th>
                  <th className="sort align-middle text-center" scope="col" style={{ width: '15%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {returns.map((returnItem, index) => (
                  <tr key={returnItem.id}>
                    <td className="align-middle text-end pe-3">{indexOfFirstItem + index + 1}</td>
                    <td className="align-middle text-center">{returnItem.user.fullName}</td>
                    <td className="align-middle text-center">{returnItem.status}</td>
                    <td className="align-middle text-center">{returnItem.fine}</td>
                    <td className="align-middle text-center">{format(new Date(returnItem.returnDate), 'dd/MM/yyyy, HH:mm')}</td>
                    <td className="align-middle text-center">{format(new Date(returnItem.checkout.endTime), 'dd/MM/yyyy, HH:mm')}</td>
                    <td className="align-middle text-center">
                      <button className="btn btn-info btn-sm" onClick={() => viewReturnDetail(returnItem.id)}>
                        <span className="fas fa-eye" />
                      </button>
                      <button className="btn btn-warning btn-sm ms-2" onClick={() => editReturn(returnItem.id)}>
                        <i className="fa-solid fa-pencil-alt"></i>
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

          <Pagination
            currentPage={returnSearchParams.page}
            totalPage={totalPage}
            onPageChange={(page: number) => setReturnSearchParams({ ...returnSearchParams, page })}
          />
        </div>
      </div>

      {returnDetailOpen && selectedReturnId !== null && (
        <Dialog
          header="Return Details"
          visible={returnDetailOpen}
          onHide={() => setReturnDetailOpen(false)}
          style={{ width: '80vw' }}
        >
          <ReturnDetail returnId={selectedReturnId} onHide={() => setReturnDetailOpen(false)} />
        </Dialog>
      )}

      {returnFormOpen && (
        <ReturnForm
          returnData={selectedReturn}
          onClose={() => setReturnFormOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Return;
