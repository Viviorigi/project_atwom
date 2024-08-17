import React, { useEffect, useState } from "react";
import { UserDTORequest } from "../../model/auth/UserDTORequest";
import { useAppDispatch } from "../../store/hook";
import Swal from "sweetalert2";
import { setLoading } from "../../reducers/spinnerSlice";
import { AuthService } from "../../services/auth/AuthService";
import { toast } from "react-toastify";
import defaultPersonImage from "../../../assets/images/imagePerson.png"
import { BannerDTO } from "../../model/BannerDTO";
import { BannerService } from "../../services/banner/BannerService";
export default function BannerForm(props: any) {
  const { closeForm, onSave, banner } = props;
  const [bannerSave, setBannerSave] = useState<BannerDTO>(
    new BannerDTO()
  );
  const dispatch = useAppDispatch();
  console.log(banner);

  useEffect(() => {
    if (banner) {
        setBannerSave({ ...banner });
    }
  }, []);

  const handleChangeText = (event: any) => {
    const { name, value } = event.target;
    setBannerSave((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    setBannerSave((prev: BannerDTO) => {
      return {
        ...prev,
        title: prev.title || "",
        description: prev.description || "",
        cre_dt: prev.cre_dt || "",
        upd_dt: prev.upd_dt || "",
      };
    });
  };

  const chk = () => {
    if (bannerSave.title === undefined || bannerSave.description === "") {
      setUserState();
      return false;
    }
    if (
      (banner === null && bannerSave.image === undefined) ||
      bannerSave.image === ""
    ) 
    return true;
  };


  const imageSource = image? image : banner!==null ? `http://localhost:8080/files/${banner.avatar}`: defaultPersonImage;

  const save = () => {

    if (!chk()) {
      return;
    }
    const formData = new FormData();

    formData.append("bannerDTO", JSON.stringify(bannerSave));
    if (file) {
      formData.append("file", file);
    }
    Swal.fire({
      title: `Confirm`,
      text:
        banner === null
          ? "Do you want to create a new banner?"
          : `Do you want to update the banner?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#89B449",
      cancelButtonColor: "#E68A8C",
      confirmButtonText: `Yes`,
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.value) {
        if (banner === null) {
          dispatch(setLoading(true));
          BannerService.getInstance()
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
          BannerService.getInstance()
            .update(formData,bannerSave.id)
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
        }
      }
    });
  };
  return (
    <div>
      <h3>{banner === null ? "Add User" : "Edit User"}</h3>
      <div className="row">
        {/* Column 1 */}
        <div className="col-md-6 mb-5">
          <div className="form-group">
            <label>
              Title <span className="text-danger">(*)</span>
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={bannerSave?.title || ""}
              onChange={handleChangeText}
              placeholder="Enter title"
              readOnly={banner !== null ? true : false}
            />
            <div
              className={`invalid-feedback ${bannerSave?.title?.toString() === "" ? "d-block" : ""
                }`}
              style={{ fontSize: "100%", color: "red" }}
            >
              Banner must not be empty and must be between 3 and 50
              characters.
            </div>
          </div>
            <div className="form-group">
              <label>
                Description <span className="text-danger">(*)</span>
              </label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={bannerSave?.description || ""}
                onChange={handleChangeText}
                placeholder="Enter description"
              />
              <div
                className={`invalid-feedback ${bannerSave?.description?.toString() === "" ? "d-block" : ""
                  }`}
                style={{ fontSize: "100%", color: "red" }}
              >
                Description must not be empty and must be at least 6 characters.
              </div>
            </div>

        </div>
        {/* Column 2 */}
        <div className="col-md-6">
          <div className="form-group">
            <label>
              Banner Image <span className="text-danger">(*)</span>
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

      <button type="submit" className="btn btn-primary mt-5" onClick={save}>
        {banner ? "Update" : "Save"}
      </button>
    </div>
  );
}
