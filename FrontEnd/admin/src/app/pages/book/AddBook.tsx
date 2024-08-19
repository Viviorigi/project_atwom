import React, { useEffect, useState } from 'react'
import { BookDTO } from '../../model/BookDTO';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { toast, ToastContainer } from 'react-toastify';
import defaultPersonImage from "../../../assets/images/imagePerson.png"
// import './book-css.scss'


export default function AddBook(props: any) {
    const { hideForm, bookDTO, onSave } = props;
    const [book, setBook] = useState<BookDTO>(new BookDTO());
    const [image, setImage] = useState<string | undefined>(undefined);
    const [file, setFile] = useState<File | null>(null);

    // xử lý nhập ký tự không phải số
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'E' || e.key === 'e' || e.key === '.' || e.key === ',') {
            e.preventDefault();
        }
    }

    //xử lý active
    const handleActiveChange = (e: any) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value,
        });
    };

    //Xử lý đọc đường dẫn ảnh
    const handleFileChange = (event: any) => {
        const filePreview = event.target.files[0];
        setFile(filePreview);
        if (filePreview && filePreview.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(filePreview);
        } else {
            alert("Please select a valid image file.");
        }
    };
    const imageSource = image ? image : bookDTO !== null ? `http://localhost:8080/files/${bookDTO.image}` : defaultPersonImage;
    //---------------------------------------------------------------------

    //xử lý edit
    useEffect(() => {
        if (bookDTO != null) {
            setBook({
                ...bookDTO,
                updatedDate: new Date().toISOString()
            })
        } else {
            setBook({
                ...bookDTO,
                active:true,
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
        if (book.publisher === undefined || book.publisher === '') {
            setBookState();
            return false;
        }


        if (book.quantity === undefined || book.quantity.toString() === '') {
            setBookState();
            return false;
        }
        if (book.price === undefined || book.price.toString() === '') {
            setBookState();
            return false;
        }
        return true;
    }

    const setBookState = () => {
        setBook((prev: BookDTO) => {
            return {
                ...prev,
                title: prev.title || '',
                publisher: prev.publisher || '',
                publicationYear: prev.publicationYear || 0,
                quantity: prev.quantity || 0,
                price: prev.price || 0
            }
        })
    }

    //Xử lý sự kiện save
    const save = () => {
        if (!chk()) {
            return;
        }
        // setVisible(false);
        // hideForm(true);
        const formData = new FormData();
        formData.append('book', JSON.stringify(book));
        if (file) {
            formData.append('file', file);
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
                axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((resp: any) => {
                    if (resp.data === "success") {
                        hideForm(true);
                        toast.success("Lưu sách thành công");
                        onSave()
                    }
                }).catch((err: any) => {
                    console.log(err);
                    toast.error("Không thể lưu sách");
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
                style={{ width: '1150px', backgroundColor: '#f5f5f5' }}
                baseZIndex={1100}>
                <h3>Book</h3>
                <div className="row">
                    {/* Cột 1 */}
                    <div className="col-md-6 mb-5">
                        <div className="form-group">
                            <label>
                                Title
                            </label>
                            <input type='text'
                                className="form-control"
                                name="title"
                                value={book.title || ""}
                                onChange={handleChangeText}
                                placeholder="Nhập tên sách" />
                            <div className={`invalid-feedback ${book.title?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                        </div>

                        <div className='form-group'>
                            <label>
                                Publisher
                            </label>
                            <input type='text'
                                className="form-control"
                                name="publisher"
                                value={book.publisher || ""}
                                onChange={handleChangeText}
                                placeholder="Nhập tên tác giả" />
                            <div className={`invalid-feedback ${book.publisher?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                        </div>

                        <div className='form-group'>
                            <label>
                                Publish year
                            </label>
                            <input type='number'
                                name="publicationYear"
                                className="form-control"
                                value={book.publicationYear == undefined ? '' : book.publicationYear}
                                onKeyDown={handleKeyPress}
                                onChange={handleChangeNumber}
                                placeholder="Nhập năm xuất bản" />
                            <div className={`invalid-feedback ${book.publicationYear?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                        </div>

                        <div className='form-group'>
                            <label>
                                Quantity
                            </label>
                            <input type='number'
                                className="form-control"
                                name="quantity"
                                value={book.quantity == undefined ? '' : book.quantity}
                                onKeyDown={handleKeyPress}
                                onChange={handleChangeNumber}
                                placeholder="Số lượng sách" />
                            <div className={`invalid-feedback ${book.quantity?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                        </div>

                        <div className='form-group'>
                            <label>
                                Price
                            </label>
                            <input type='number'
                                className="form-control"
                                name="price"
                                value={book.price == undefined ? '' : book.price}
                                onKeyDown={handleKeyPress}
                                onChange={handleChangeNumber}
                                placeholder="Giá" />
                            <div className={`invalid-feedback ${book.price?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                        </div>

                    </div>

                    {/* Cột 2------------------------- */}
                    <div className="col-md-6 mb-5">
                        {bookDTO !== null && (
                            <div className="form-group">
                                <label>
                                    Active <span className="text-danger"></span>
                                </label>
                                <select
                                    className="form-select"
                                    value={book.active ? "true" : "false"}
                                    onChange={handleActiveChange}
                                    name="active"
                                >
                                    <option value="true">Active</option>
                                    <option value="false">InActive</option>
                                </select>
                            </div>
                        )}

                        <div className='form-group'>
                            <label>
                                Placed
                            </label>
                            <textarea
                                name="description"
                                rows={3}
                                className="form-control"
                                value={book.description || ''}
                                onChange={handleChangeNumber}
                                placeholder="Description" />
                            <div className={`invalid-feedback ${book.description?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                        </div>

                        <div className="form-group">
                            <label>
                                Avatar <span className="text-danger">(*)</span>
                            </label>
                            <br />
                            <input
                                name="file"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {imageSource && (
                                <div
                                    className="preview Image"
                                    style={{
                                        marginTop: "10px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src={imageSource}
                                        alt="Preview"
                                        style={{ width: "200px", height: "200px" }}
                                    />
                                </div>
                            )}
                        </div>

                    </div>
                    {/* Hết form--------------------------------------------------------------- */}

                    <div className="text-center mt-3">
                        <button onClick={save} className="btn btn-primary btn-sm me-2">Save</button>
                        <button onClick={cancel} className="btn btn-danger btn-sm">Cancel</button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
