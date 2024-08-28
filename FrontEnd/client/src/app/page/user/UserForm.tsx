import React, { useEffect, useState } from "react";
import { UserDetail } from "../../model/auth/UserDetail";
import defaultPersonImage from "../../../assets/images/imagePerson.png";
import { AuthService } from "../../services/AuthService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function UserForm(props: any) {
  const { closeForm, user, onSave } = props;
  console.log(user);
  const [userSave, setUserSave] = useState<UserDetail>(new UserDetail());

  useEffect(() => {
    if (user) {
      setUserSave({ ...user });
    }
  }, []);

  const [image, setImage] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);

  const handleChangeText = (event: any) => {
    const { name, value, onSave } = event.target;
    setUserSave((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChangeNumber = (event: any) => {
    const { name, value } = event.target;
    setUserSave((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setUserState = () => {
    setUserSave((prev: UserDetail) => {
      return {
        ...prev,
        email: prev.email || "",
        fullName: prev.fullName || "",
        address: prev.address || "",
        className: prev.className || "",
        dob: prev.dob || "",
        phone: prev.phone || "",
      };
    });
  };

  const chk = () => {
    if (userSave.email === undefined || userSave.email === "") {
      setUserState();
      return false;
    }
    if (userSave.fullName === undefined || userSave.fullName === "") {
      setUserState();
      return false;
    }
    if (userSave.address === undefined || userSave.address === "") {
      setUserState();
      return false;
    }
    if (userSave.dob === undefined || userSave.dob.toString() === "") {
      setUserState();
      return false;
    }
    if (userSave.phone === undefined || userSave.phone.toString() === "") {
      setUserState();
      return false;
    }
    return true;
  };
  const imageSource = image
    ? image
    : user.avatar !== null
    ? `${process.env.REACT_APP_API_URL}/files/${user.avatar}`
    : defaultPersonImage;

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

  const save = () => {
    if (!chk()) {
      return;
    }
    const formData = new FormData();

    formData.append("userDTO", JSON.stringify(userSave));
    if (file) {
      formData.append("file", file);
    }
    Swal.fire({
      title: `Confirm`,
      text: "Bạn có muốn cập nhật thông tin cá nhân",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#89B449",
      cancelButtonColor: "#E68A8C",
      confirmButtonText: `Có`,
      cancelButtonText: `Không`,
    }).then((result) => {
      if (result.value) {
        AuthService.getInstance()
          .update(formData)
          .then((resp: any) => {
            if (resp) {
              toast.success("Cập nhật thành công");
              closeForm();
              onSave();
            }
          })
          .catch((error: any) => {
            closeForm();
            toast.error("Cập nhật thất bại");
          });
      }
    });
  };

  return (
    <div className="container">
      <h3>Cập nhật thông tin</h3>
      <div className="row">
        {/* Cột 1 */}
        <div className="col-md-6 mb-5">
          <div className="form-group">
            <label>
              Tên đăng nhập <span className="text-danger">(*)</span>
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={userSave?.username || ""}
              onChange={handleChangeText}
              placeholder="Nhập tên đăng nhập"
              readOnly={user !== null ? true : false}
            />
            <div
              className={`invalid-feedback ${
                userSave?.username?.toString() === "" ? "d-block" : ""
              }`}
              style={{ fontSize: "100%", color: "red" }}
            >
              Tên đăng nhập không được để trống và phải từ 3 đến 50 ký tự.
            </div>
          </div>

          <div className="form-group">
            <label>
              Email <span className="text-danger">(*)</span>
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={userSave?.email || ""}
              onChange={handleChangeText}
              placeholder="Nhập email"
            />
            <div
              className={`invalid-feedback ${
                userSave?.email?.toString() === "" ? "d-block" : ""
              }`}
              style={{ fontSize: "100%", color: "red" }}
            >
              Email không được để trống.
            </div>
          </div>

          <div className="form-group">
            <label>
              Họ và tên <span className="text-danger">(*)</span>
            </label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              value={userSave?.fullName || ""}
              onChange={handleChangeText}
              placeholder="Nhập họ và tên"
            />
            <div
              className={`invalid-feedback ${
                userSave?.fullName?.toString() === "" ? "d-block" : ""
              }`}
              style={{ fontSize: "100%", color: "red" }}
            >
              Họ và tên không được để trống.
            </div>
          </div>

          <div className="form-group">
            <label>
              Số điện thoại <span className="text-danger">(*)</span>
            </label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={userSave?.phone || ""}
              onChange={handleChangeNumber}
              placeholder="Nhập số điện thoại"
            />
            <div
              className={`invalid-feedback ${
                userSave?.phone?.toString() === "" ? "d-block" : ""
              }`}
              style={{ fontSize: "100%", color: "red" }}
            >
              Số điện thoại không được để trống.
            </div>
          </div>
        </div>
        {/* Cột 2 */}
        <div className="col-md-6">
          <div className="form-group">
            <label>
              Tên lớp <span className="text-danger">(*)</span>
            </label>
            <input
              type="text"
              name="className"
              className="form-control"
              value={userSave?.className || ""}
              onChange={handleChangeText}
              placeholder="Nhập tên lớp"
            />
            <div
              className={`invalid-feedback ${
                userSave?.className?.toString() === "" ? "d-block" : ""
              }`}
              style={{ fontSize: "100%", color: "red" }}
            >
              Tên lớp không được để trống.
            </div>
          </div>
          <div className="form-group">
            <label>
              Ngày sinh <span className="text-danger">(*)</span>
            </label>
            <input
              type="date"
              name="dob"
              className="form-control"
              value={userSave?.dob || ""}
              onChange={handleChangeText}
            />
            <div
              className={`invalid-feedback ${
                userSave?.dob?.toString() === "" ? "d-block" : ""
              }`}
              style={{ fontSize: "100%", color: "red" }}
            >
              Ngày sinh không được để trống.
            </div>
          </div>

          <div className="form-group">
            <label>
              Địa chỉ <span className="text-danger">(*)</span>
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={userSave?.address || ""}
              onChange={handleChangeText}
              placeholder="Nhập địa chỉ"
            />
            <div
              className={`invalid-feedback ${
                userSave?.address?.toString() === "" ? "d-block" : ""
              }`}
              style={{ fontSize: "100%", color: "red" }}
            >
              Địa chỉ không được để trống.
            </div>
          </div>

          <div className="form-group">
            <label>
              Ảnh đại diện <span className="text-danger">(*)</span>
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
      </div>

      <button type="submit" className="btn btn-primary mb-5" onClick={save}>
        Cập nhật thông tin
      </button>
    </div>
  );
}
