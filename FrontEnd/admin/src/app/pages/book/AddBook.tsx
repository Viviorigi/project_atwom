import React, { useEffect, useState } from 'react'
import { BookDTO } from '../../model/BookDTO';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { toast, ToastContainer } from 'react-toastify';
import defaultPersonImage from "../../../assets/images/imagePerson.png"
import { log } from 'console';
import { CategoryDTO } from '../../model/CategoryDTO';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import noImageAvailable from "../../../assets/images/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
import JoditEditor, { Jodit } from "jodit-react";
import DOMPurify from 'dompurify';



// import './book-css.scss'


export default function AddBook(props: any) {
    const { hideForm, bookDTO, onSave } = props;
    const [book, setBook] = useState<BookDTO>(new BookDTO());
    const [categoryList, setCategoryList] = useState([]);
    const [categoryEdit, setCategoryEdit] = useState<CategoryDTO>();
    const [categoryEditId, setCategoryListId] = useState(0);

    useEffect(() => {
        let url = `http://localhost:8080/category/list/all`;
        axios.get(url).then((resp: any) => {
            // console.log(resp.data.name);
            if (resp.data) {
                setCategoryList(resp.data);
            }
        }).catch((err: any) => {

        })
    }, [])
    const [image, setImage] = useState<string | undefined>(undefined);
    const [file, setFile] = useState<File | null>(null);
    const [editorContent, setEditorContent] = useState('');

    //xử lý text-editor 
    const handleContentChange = (newContent: any) => {
        setEditorContent(newContent);
        setBook({
            ...book,
            description: newContent,
        });
    };

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

    // Xử lý thay đổi danh mục
    // Thay thế hàm handleActiveChange
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // console.log("đây là cate");
        // console.log(categoryEdit);
        const selectedCategoryId = parseInt(e.target.value, 10);
        const selectedCategory = categoryList.find((cat: any) => cat.id === selectedCategoryId);

        setBook(prev => ({
            ...prev,
            cateId: selectedCategoryId
        }));
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


    // const imageSource = image ? image : bookDTO.image !== null ? `http://localhost:8080/getImage?atchFleSeqNm=${bookDTO.image}` : defaultPersonImage;
    const imageSource = image || (bookDTO && bookDTO.image ? `http://localhost:8080/getImage?atchFleSeqNm=${bookDTO.image}` : defaultPersonImage);

    const [imageSources, setImageSources] = useState<string[]>([]);

    useEffect(() => {
        if (bookDTO && bookDTO.imagebooks.length > 0) {
            setImageSources(bookDTO.imagebooks.map((image:any) => `http://localhost:8080/getImage?atchFleSeqNm=${image.filename}`));
        }
    }, [bookDTO])

    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const handleManyFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files);
            const newImageSources = selectedFiles.map(file => URL.createObjectURL(file));
            setImageSources([...newImageSources]); // Replace with new selections
            setImageFiles([...imageFiles, ...Array.from(event.target.files)]);
        }
    };

    // Xóa hình ảnh khỏi danh sách

    const handleRemoveImage = (index: number) => {
        setImageSources(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    //---------------------------------------------------------------------

    //xử lý edit
    useEffect(() => {
        if (bookDTO != null) {
            setBook({
                ...bookDTO,
                upd_dt: new Date().toISOString()
            })
            setEditorContent(bookDTO.description || '');
            console.log("Edittt");
            console.log(bookDTO);


        } else {
            setBook({
                ...bookDTO,
                description: '',
                active: true,
                cre_dt: new Date().toISOString(),
                upd_dt: new Date().toISOString()
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
                price: prev.price || 0,
                // category: prev.category || undefined
            }
        })
    }

    const save = () => {
        if (!chk()) {
            return;
        }
        const formData = new FormData();
        formData.append('book', JSON.stringify(book));
        // console.log("book trc khi save", book);

        if (file) {
            formData.append('file', file);
        }

        imageFiles.forEach((file) => {
            formData.append('images[]', file);
        });

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
                <h3>{bookDTO === null ? "Add Book" : "Edit Book"}</h3>
                <div className="row">
                    {/* Cột 1 */}
                    <div className="col-md-6 mb-5">
                        <div className="form-group">
                            <label>
                                Title<span className="text-danger">(*)</span>
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
                                Publisher<span className="text-danger">(*)</span>
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

                        <div className='form-group'>
                            <label>
                                Category
                            </label>
                            <select
                                style={{
                                    backgroundColor: '#f0f0f0', /* Màu nền xám sáng */
                                    border: '1px solid #ccc', /* Viền xám sáng */
                                }}
                                className="form-select"
                                onChange={handleCategoryChange}
                                name='cateId'
                            // value={book.cateId || 0}
                            >

                                {bookDTO != null && (
                                    <option value={book?.cateId}>
                                        {book?.cateName}
                                    </option>
                                )}
                                {bookDTO == null && (
                                    <option value={0}>All</option>
                                )}
                                {categoryList.map((u: any, index: number) => (
                                    <option key={u.id} value={u.id}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>
                            {/* <div className={`invalid-feedback ${book.category?.id == null ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div> */}
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
                                Description
                            </label>
                            <JoditEditor
                                value={editorContent}
                                onChange={(newContent) => handleContentChange(newContent)}
                            />
                            <div className={`invalid-feedback ${book.description?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                        </div>

                        {/* Lưu ảnh bìa-------------------------------------------------- */}
                        <div className="form-group">
                            <label>
                                Avatar
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
                                        style={{ width: "100px", height: "100px" }}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null; // Prevent infinite loop in case fallback image also fails
                                            target.src = noImageAvailable; // Set the fallback image
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Lưu ảnh description ---------------------------------------------------------------------- */}

                        <div className="form-group">
                            <label>
                                Description image
                            </label>
                            <br />
                            <input
                                name="multi-file"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleManyFileChange}
                            />
                            {imageSources.length > 0 && (
                                <div className="preview Image" style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                                    {imageSources.map((file, index) => (
                                        <div key={index} style={{ position: 'relative', margin: '5px' }}>
                                            <img src={file} alt={`Preview ${index}`} style={{ width: "100px", height: "100px" }} />
                                        </div>
                                    ))}
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

