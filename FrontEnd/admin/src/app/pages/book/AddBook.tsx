import React, { useEffect, useState } from 'react'
import { BookDTO } from '../../model/BookDTO';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


export default function AddBook(props: any) {
    const { hideForm, bookDTO } = props;
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
                ...bookDTO
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
                        hideForm(true);
                    }
                }).catch((err: any) => {

                })
            }
        })
    }

    const cancel = () => {
        hideForm(false);
    }
    const [visible, setVisible] = useState(true);
    const showDialog = () => setVisible(true);

    // Close dialog
    const hideDialog = () => setVisible(false);

    return (
        <div>
            {/* <Button label="Show Form" icon="pi pi-plus" onClick={showDialog} /> */}
            <Dialog
                visible={visible}
                onHide={hideDialog}
                style={{ width: '800px', backgroundColor: '#f5f5f5'}}
                baseZIndex={1100}>
                <div className="container form-group">
                    <div className="row">
                        <div className="col-2">
                            <span style={{ color: "red", width: "100px", height: "100px" }}>Title</span>
                        </div>
                        <div className="col-9">
                            <input type='text'
                                className="form-control"
                                name="title"
                                value={book.title || ""}
                                onChange={handleChangeText}
                                placeholder="Nhập fullName" />
                            <div className={`invalid-feedback ${book.title?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                        </div>
                    </div>
                    <div>
                        <span style={{ color: "red" }}>Publisher</span>
                        <input type='text'
                            name="publisher"
                            value={book.publisher || ""}
                            onChange={handleChangeText}
                            placeholder="Nhập fullName" />
                        <div className={`invalid-feedback ${book.publisher?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                    </div>
                    <div>
                        <span style={{ color: "red" }}>Publish year</span>
                        <input type='number'
                            name="publicationYear"
                            value={book.publicationYear == undefined ? '' : book.publicationYear}
                            onKeyDown={handleKeyPress}
                            onChange={handleChangeNumber}
                            placeholder="Nhập năm sinh" />
                        <div className={`invalid-feedback ${book.publicationYear?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                    </div>
                    <div>
                        <span style={{ color: "red" }}>Placed</span>
                        <input type='number'
                            name="quantityPlaced"
                            value={book.quantityPlaced == undefined ? '' : book.quantity}
                            onKeyDown={handleKeyPress}
                            onChange={handleChangeNumber}
                            placeholder="Nhập năm sinh" />
                        <div className={`invalid-feedback ${book.quantityPlaced?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                    </div>
                    <div>
                        <span style={{ color: "red" }}>Quantity</span>
                        <input type='text'
                            name="quantity"
                            value={book.quantity || ""}
                            onChange={handleChangeText}
                            placeholder="Nhập address" />
                        <div className={`invalid-feedback ${book.quantity?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                    </div>
                    <div>
                        <span style={{ color: "red" }}>Price</span>
                        <input type='text'
                            name="price"
                            value={book.price || ""}
                            onChange={handleChangeText}
                            placeholder="Nhập address" />
                        <div className={`invalid-feedback ${book.price?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                    </div>
                    <div>
                        <span style={{ color: "red" }}>Active</span>
                        <input type='text'
                            name="deleted"
                            value={book.deleted || ""}
                            onChange={handleChangeText}
                            placeholder="Nhập address" />
                        <div className={`invalid-feedback ${book.deleted?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                    </div>
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
                    <div>
                        <button onClick={save}>Save</button>
                        <button onClick={cancel}>Cancel</button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
