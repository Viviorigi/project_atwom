import React, { useEffect, useState } from "react";
import { UserDTORequest } from "../../model/auth/UserDTORequest";
import { useAppDispatch } from "../../store/hook";
import Swal from "sweetalert2";
import { setLoading } from "../../reducers/spinnerSlice";
import { AuthService } from "../../services/auth/AuthService";
import { toast } from "react-toastify";
import defaultPersonImage from "../../../assets/images/imagePerson.png"
import noImageAvailable from "../../../assets/images/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
export default function StudentForm(props: any) {
  const { closeForm, onSave, user } = props;
  const [userSave, setUserSave] = useState<UserDTORequest>(
    new UserDTORequest()
  );
  const dispatch = useAppDispatch();
  console.log(user);

  useEffect(() => {
    if (user) {
      setUserSave({ ...user });
    }
  }, []);

  const handleChangeText = (event: any) => {
    const { name, value } = event.target;
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
  const handleActiveChange = (e: any) => {
    setUserSave({
      ...userSave,
      [e.target.name]: e.target.value,
    });
  };

  const [image, setImage] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);

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

  const setUserState = () => {
    setUserSave((prev: UserDTORequest) => {
      return {
        ...prev,
        username: prev.username || "",
        password: prev.password || "",
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
    if (userSave.username === undefined || userSave.username === "") {
      setUserState();
      return false;
    }
    if (
      (user === null && userSave.password === undefined) ||
      userSave.password === ""
    ) {
      setUserState();
      return false;
    }
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


  const imageSource = image ? image : user.avatar !== null ? `http://localhost:8080/api/auth/getImage?atchFleSeqNm=${user.avatar}` : defaultPersonImage;

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
      text:
        user === null
          ? "Do you want to create a new student?"
          : `Do you want to update the student?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#89B449",
      cancelButtonColor: "#E68A8C",
      confirmButtonText: `Yes`,
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.value) {
        if (user === null) {
          dispatch(setLoading(true));
          AuthService.getInstance()
            .create(formData)
            .then((resp: any) => {
              if (resp) {
                setTimeout(() => {
                  dispatch(setLoading(false));
                  toast.success(resp.data.message);
                  closeForm();
                  onSave();
                }, 1000);
              }
            })
            .catch((error: any) => {
              dispatch(setLoading(false));
              closeForm();
              toast.error(error.message);
            });
        } else {
          dispatch(setLoading(true));
          AuthService.getInstance()
            .update(formData)
            .then((resp: any) => {
              if (resp) {
                setTimeout(() => {
                  dispatch(setLoading(false));
                  toast.success(resp.data.message);
                  closeForm();
                  onSave();
                }, 1000);
              }
            })
            .catch((error: any) => {
              dispatch(setLoading(false));
              closeForm();
              toast.error(error.response.data.message);
            });
        }
      }
    });
  };
  return (
    <div>
      <h3>{user === null ? "Add User" : "Edit User"}</h3>
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
          {user === null && (
            <div className="form-group">
              <label>
                Password <span className="text-danger">(*)</span>
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={userSave?.password || ""}
                onChange={handleChangeText}
                placeholder="Enter Password"
              />
              <div
                className={`invalid-feedback ${userSave?.password?.toString() === "" ? "d-block" : ""
                  }`}
                style={{ fontSize: "100%", color: "red" }}
              >
                Password must not be empty and must be at least 6 characters.
              </div>
            </div>
          )}

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
          {user !== null && (
            <div className="form-group">
              <label>
                Active <span className="text-danger"></span>
              </label>
              <select
                className="form-select"
                value={userSave.isActive ? "true" : "false"}
                onChange={handleActiveChange}
                name="isActive"
              >
                <option value="true">Active</option>
                <option value="false">InActive</option>
              </select>
            </div>
          )}

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
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loop in case fallback image also fails
                    target.src = noImageAvailable; // Set the fallback image
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-5" onClick={save}>
        {user ? "Update" : "Save"}
      </button>
    </div>
  );
}
