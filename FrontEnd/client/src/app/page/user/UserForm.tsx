import React, { useEffect, useState } from 'react'
import { UserDetail } from '../../model/auth/UserDetail';
import defaultPersonImage from "../../../assets/images/imagePerson.png"
import { AuthService } from '../../services/AuthService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function UserForm(props: any) {
  const { closeForm, user, onSave } = props;
  console.log(user);
  const [userSave, setUserSave] = useState<UserDetail>(
    new UserDetail()
  );

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
  const imageSource = image ? image : user.avatar !== null ? `http://localhost:8080/files/${user.avatar}` : defaultPersonImage;

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
      text: "Do you want to update my info",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#89B449",
      cancelButtonColor: "#E68A8C",
      confirmButtonText: `Yes`,
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.value) {
        AuthService.getInstance()
          .update(formData)
          .then((resp: any) => {
            if (resp) {
              setTimeout(() => {
                toast.success(resp.data.message);
                closeForm();
                onSave();
              }, 1000);
            }
          })
          .catch((error: any) => {
            closeForm();
            toast.error(error.response.data.message);
          });
      }
    });
  };

  return (
    <div className='container'>
      <h3>Update Info</h3>
      <div className="row">
        {/* Column 1 */}
        <div className="col-md-6 mb-5">
          <div className="form-group">
            <label>
              Username <span className="text-danger">(*)</span>
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={userSave?.username || ""}
              onChange={handleChangeText}
              placeholder="Enter Username"
              readOnly={user !== null ? true : false}
            />
            <div
              className={`invalid-feedback ${userSave?.username?.toString() === "" ? "d-block" : ""
                }`}
              style={{ fontSize: "100%", color: "red" }}
            >
              Username must not be empty and must be between 3 and 50
              characters.
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
              placeholder="Enter Email"
            />
            <div
              className={`invalid-feedback ${userSave?.email?.toString() === "" ? "d-block" : ""
                }`}
              style={{ fontSize: "100%", color: "red" }}
            >
              Email must not be empty.
            </div>
          </div>

          <div className="form-group">
            <label>
              Full Name <span className="text-danger">(*)</span>
            </label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              value={userSave?.fullName || ""}
              onChange={handleChangeText}
              placeholder="Enter Full Name"
            />
            <div
              className={`invalid-feedback ${userSave?.fullName?.toString() === "" ? "d-block" : ""
                }`}
              style={{ fontSize: "100%", color: "red" }}
            >
              FullName must not be empty.
            </div>
          </div>

          <div className="form-group">
            <label>
              Phone <span className="text-danger">(*)</span>
            </label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={userSave?.phone || ""}
              onChange={handleChangeNumber}
              placeholder="Enter Phone"
            />
            <div
              className={`invalid-feedback ${userSave?.phone?.toString() === "" ? "d-block" : ""
                }`}
              style={{ fontSize: "100%", color: "red" }}
            >
              Phone must not be empty.
            </div>
          </div>
        </div>
        {/* Column 2 */}
        <div className="col-md-6">
          <div className="form-group">
            <label>
              Class Name <span className="text-danger">(*)</span>
            </label>
            <input
              type="text"
              name="className"
              className="form-control"
              value={userSave?.className || ""}
              onChange={handleChangeText}
              placeholder="Enter Full Name"
            />
            <div
              className={`invalid-feedback ${userSave?.className?.toString() === "" ? "d-block" : ""
                }`}
              style={{ fontSize: "100%", color: "red" }}
            >
              ClassName must not be empty.
            </div>
          </div>
          <div className="form-group">
            <label>
              Date of Birth <span className="text-danger">(*)</span>
            </label>
            <input
              type="date"
              name="dob"
              className="form-control"
              value={userSave?.dob || ""}
              onChange={handleChangeText}
            />
            <div
              className={`invalid-feedback ${userSave?.dob?.toString() === "" ? "d-block" : ""
                }`}
              style={{ fontSize: "100%", color: "red" }}
            >
              Dob must not be empty.
            </div>
          </div>

          <div className="form-group">
            <label>
              Address <span className="text-danger">(*)</span>
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={userSave?.address || ""}
              onChange={handleChangeText}
              placeholder="Enter Address"
            />
            <div
              className={`invalid-feedback ${userSave?.address?.toString() === "" ? "d-block" : ""
                }`}
              style={{ fontSize: "100%", color: "red" }}
            >
              Address must not be empty.
            </div>
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
      </div>

      <button type="submit" className="btn btn-primary mb-5" onClick={save}>
        Update Info
      </button>
    </div>
  )
}
