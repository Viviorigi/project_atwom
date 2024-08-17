import React, { useEffect, useState } from 'react'
import { BookDTO } from '../../model/BookDTO';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { toast, ToastContainer } from 'react-toastify';
// import './book-css.scss'


export default function AddBook(props: any) {
    const { hideForm, bookDTO,onSave } = props;
    const [book, setBook] = useState<BookDTO>(new BookDTO());

    // xử lý nhập ký tự không phải số
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'E' || e.key === 'e' || e.key === '.' || e.key === ',') {
            e.preventDefault();
        }
    }

    //xử lý edit
    useEffect(() => {
        if (bookDTO != null) {
            setBook({
                ...bookDTO,
                updatedDate: new Date().toISOString() 
            })
        }else{
            setBook({
                ...bookDTO,
                createdDate: new Date().toISOString(),
                updatedDate: new Date().toISOString()
            })
        }
    }, [])

    //lấy dữ liệu từ ô input
    const handleChangeText = (event: any) => {
        setBook({
            ...book,
            [event.target.name]: event.target.value,
        })
    }

    const handleChangeNumber = (event: any) => {
        const newValue = event.target.value;
        setBook({
            ...book,
            [event.target.name]: newValue,
        })
    }

    //check input 
    const chk = () => {
        if (book.title === undefined || book.title === '') {
            setBookState();
            return false;
        }
        if (book.quantity === undefined || book.quantity.toString() === '') {
            setBookState();
            return false;
        }
        if (book.publisher === undefined || book.publisher === '') {
            setBookState();
            return false;
        }
        return true;
    }

    const setBookState = () => {
        setBook((prev: BookDTO) => {
            return {
                ...prev,
                dob: prev.quantity || 0,
                fullName: prev.title || '',
                address: prev.publisher || ''
            }
        })
    }

    //Xử lý sự kiện save
    const save = () => {
        if (!chk()) {
            return;
        }
        // setVisible(false);
        hideForm(true);

        Swal.fire({
            title: `Xác nhận`,
            text: `Bạn có muốn thực hiện ...`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#89B449',
            cancelButtonColor: '#E68A8C',
            confirmButtonText: `Yes`,
            cancelButtonText: `No`
        }).then((result) => {
            if (result.value) {
                // logic
                let url = `http://localhost:8080/book/add`;
                axios.post(url, book).then((resp: any) => {
                    if (resp.data === "success") {
                        // hideForm(true);
                        toast.success("Lưu sách thành công");
                        onSave()
                    }
                }).catch((err: any) => {
                    console.log(err);
                    
                })
            }
        })
    }

    const cancel = () => {
        hideForm(false);
    }
    const [visible, setVisible] = useState(true);
    const showDialog = () => {
        setVisible(true);
    }

    // Close dialog
    const hideDialog = () => {
        setVisible(false);
        // hideForm(true);
    }

    return (
        <div>
            {/* <Button label="Show Form" icon="pi pi-plus" onClick={showDialog} /> */}
            <Dialog
                visible={visible}
                // onHide={hideDialog}
                onHide={() => hideForm(true)}
                style={{ width: '850px', height: '500px', backgroundColor: '#f5f5f5' }}
                baseZIndex={1100}>
                <div className="container form-group">
                    <div className="row mb-3">
                        <div className="col-2">
                            Title
                        </div>
                        <div className="col-9">
                            <input type='text'
                                className="form-control"
                                name="title"
                                value={book.title || ""}
                                onChange={handleChangeText}
                                placeholder="Nhập tên sách" />
                            <div className={`invalid-feedback ${book.title?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-2'>
                            Publisher
                        </div>
                        <div className='col-9'>
                            <input type='text'
                                className="form-control"
                                name="publisher"
                                value={book.publisher || ""}
                                onChange={handleChangeText}
                                placeholder="Nhập tên tác giả" />
                            <div className={`invalid-feedback ${book.publisher?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-2'>
                            Publish year
                        </div>
                        <div className='col-9'>
                            <input type='number'
                                name="publicationYear"
                                className="form-control"
                                value={book.publicationYear == undefined ? '' : book.publicationYear}
                                onKeyDown={handleKeyPress}
                                onChange={handleChangeNumber}
                                placeholder="Nhập năm xuất bản" />
                            <div className={`invalid-feedback ${book.publicationYear?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-2'>
                            Placed
                        </div>
                        <div className='col-9'>
                            <input type='number'
                                name="quantityPlaced"
                                className="form-control"
                                value={book.quantityPlaced == undefined ? '' : book.quantityPlaced}
                                onKeyDown={handleKeyPress}
                                onChange={handleChangeNumber}
                                placeholder="Số sách đã đặt" />
                            <div className={`invalid-feedback ${book.quantityPlaced?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-2'>
                            Quantity
                        </div>
                        <div className='col-9'>
                            <input type='text'
                                className="form-control"
                                name="quantity"
                                value={book.quantity == undefined ? '' : book.quantity}
                                onChange={handleChangeText}
                                placeholder="Số lượng sách" />
                            <div className={`invalid-feedback ${book.quantity?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-2'>
                            Price
                        </div>
                        <div className='col-9'>
                            <input type='text'
                                className="form-control"
                                name="price"
                                value={book.price == undefined ? '' : book.price}
                                onChange={handleChangeText}
                                placeholder="Giá" />
                            <div className={`invalid-feedback ${book.price?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                        </div>
                    </div>
                    {/* <div className='row mb-3'>
                        <div className='col-2'>
                            Active
                        </div>
                        <div className='col-9'>
                            <input type='text'
                                name="deleted"
                                className="form-control"
                                value={book.deleted == undefined ? '' : book.deleted}
                                onChange={handleChangeText}
                                placeholder="Trạng thái" />
                            <div className={`invalid-feedback ${book.deleted?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                        </div>
                    </div> */}
                    {/* <div>
                    <span style={{ color: "red" }}>Date create</span>
                    <input type='text'
                        name="publisher"
                        value={book.publisher || ""}
                        onChange={handleChangeText}
                        placeholder="Nhập address" />
                    <div className={`invalid-feedback ${book.publisher?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                </div>
                <div>
                    <span style={{ color: "red" }}>Date update</span>
                    <input type='text'
                        name="publisher"
                        value={book.publisher || ""}
                        onChange={handleChangeText}
                        placeholder="Nhập address" />
                    <div className={`invalid-feedback ${book.publisher?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                </div> */}
                    {/* <div>
                    <span style={{ color: "red" }}>Image</span>
                    <input type='text'
                        name="publisher"
                        value={book.publisher || ""}
                        onChange={handleChangeText}
                        placeholder="Nhập address" />
                    <div className={`invalid-feedback ${book.publisher?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                </div> */}
                    <div className="text-center mt-3">
                        <button onClick={save} className="btn btn-primary btn-sm me-2">Save</button>
                        {/* <button onClick={cancel} className="btn btn-danger btn-sm">Cancel</button> */}
                        <button onClick={cancel} className="btn btn-danger btn-sm">Cancel</button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
