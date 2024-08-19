import { useEffect, useState } from "react";
import { CategoryDTO } from "../../model/CategoryDTO";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import { Dialog } from "primereact/dialog";

export default function AddCategory(props: any) {
    const { hideForm, categoryDTO, onSave } = props;
    const [category, setCategory] = useState<CategoryDTO>(new CategoryDTO());
    const currentDate = new Date().toISOString();

    // xử lý nhập ký tự không phải số
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'E' || e.key === 'e' || e.key === '.' || e.key === ',') {
            e.preventDefault();
        }
    }

    //xử lý edit
    useEffect(() => {
        if (categoryDTO != null) {
            setCategory({
                ...categoryDTO,
                updatedDate: new Date().toISOString()
            })
        } else {
            setCategory({
                ...categoryDTO,
                active:true,
                createdDate: new Date().toISOString(),
                updatedDate: new Date().toISOString()
            })
        }
    }, [])

    //lấy dữ liệu từ ô input
    const handleChangeText = (event: any) => {
        setCategory({
            ...category,
            [event.target.name]: event.target.value,
        })
    }

    const handleChangeNumber = (event: any) => {
        const newValue = event.target.value;
        setCategory({
            ...category,
            [event.target.name]: newValue,
        })
    }

    //check input 
    const chk = () => {
        if (category.name === undefined || category.name === '') {
            setCategoryState();
            return false;
        }
        if (category.description === undefined || category.description === '') {
            setCategoryState();
            return false;
        }
        return true;
    }

    const setCategoryState = () => {
        setCategory((prev: CategoryDTO) => {
            return {
                ...prev,
                name: prev.name || '',
                description: prev.description || ''
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
                let url = `http://localhost:8080/category/add`;
                axios.post(url, category).then((resp: any) => {
                    if (resp.data === "success") {
                        hideForm(true);
                        toast.success("Lưu danh mục thành công");
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
                style={{ width: '1150px', backgroundColor: '#f5f5f5' }}
                baseZIndex={1100}>

                <h3>Category</h3>
                <div className="row">
                    <div className="col-md-6 mb-5">
                        <div className="form-group">
                            <label>
                                Name
                            </label>
                            <input type='text'
                                className="form-control"
                                name="name"
                                value={category.name || ""}
                                onChange={handleChangeText}
                                placeholder="Nhập tên danh mục" />
                            <div className={`invalid-feedback ${category.name?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-5">
                        <div className="form-group">
                            <label>
                                Description
                            </label>
                            <input type='text'
                                className="form-control"
                                name="description"
                                value={category.description || ""}
                                onChange={handleChangeText}
                                placeholder="Nhập tên danh mục" />
                            <div className={`invalid-feedback ${category.description?.toString() == '' ? "d-block" : ""}`} style={{ fontSize: "100%" }}>Không được để trống</div>
                        </div>
                    </div>

                </div>

                <div className="text-center mt-3">
                    <button onClick={save} className="btn btn-primary btn-sm me-2">Save</button>
                    <button onClick={cancel} className="btn btn-danger btn-sm">Cancel</button>
                </div>

            </Dialog>
        </div>
    )
}
