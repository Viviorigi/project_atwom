import styled from "styled-components";
import { CheckboxGroup, FormGridWrapper, FormTitle } from "../../styles/form_grid";
import { Container } from "../../styles/styles";
import { staticImages } from "../../utils/images";
import { FormElement, Input } from "../../styles/form";
import { Link, useNavigate } from "react-router-dom";
import { BaseButtonBlack } from "../../styles/button";
import AuthOptions from "../../comp/auth/AuthOptions";
import PasswordInput from "../../comp/auth/PasswordInput";
import { useState } from "react";
import { UserDTORequest } from "../../model/auth/UserDTORequest";
import { AuthService } from "../../services/AuthService";
import { toast } from "react-toastify";

const SignUpScreenWrapper = styled.section`
  form {
    margin-top: 40px;
    .form-elem-text {
      margin-top: -16px;
      display: block;
    }
  }

  .text-space {
    margin: 0 4px;
  }
`;

const SignUp = () => {
  const [userRegister, setUserRegister] = useState<UserDTORequest>(new UserDTORequest());
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChangeText = (event: any) => {
    const { name, value } = event.target;
    setUserRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeNumber = (event: any) => {
    const { name, value } = event.target;
    setUserRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setUserState = () => {
    setUserRegister((prev: UserDTORequest) => {
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
    if (!userRegister.username || !userRegister.password || !userRegister.email ||
        !userRegister.fullName || !userRegister.address || !userRegister.dob ||
        !userRegister.phone) {
      setUserState();
      return false;
    }
    return true;
  };

  const register = () => {
    if (!chk()) {
      return;
    }
    setIsLoading(true); // Start loading
    AuthService.getInstance()
      .register(userRegister)
      .then((resp: any) => {
        if (resp) {
          setTimeout(() => {
            toast.success("Đăng ký thành công vui lòng kiểm tra email xác thực tài khoản");
            setIsLoading(false); // Stop loading
            navigate("/register-success");
          }, 1000);
        }
      })
      .catch((error: any) => {
        setIsLoading(false); // Stop loading
        toast.error(error.response.data.message);
      });
  };

  return (
    <SignUpScreenWrapper>
      <FormGridWrapper>
        <Container>
          <div className="form-grid-content">
            <div className="form-grid-left">
              <img
                src={staticImages.book_form}
                className="object-fit-cover"
                alt=""
              />
            </div>
            <div className="form-grid-right">
              <FormTitle>
                <h3>Đăng ký</h3>
                <p className="text-base">
                  Đăng ký tài khoản để mượn sách thư viện
                </p>
              </FormTitle>

              <FormElement>
                <label htmlFor="" className="forme-elem-label">
                  Họ và tên
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="fullName"
                  value={userRegister?.fullName || ""}
                  onChange={handleChangeText}
                  className="form-elem-control"
                />
                <span
                  className={`invalid-feedback ${
                    userRegister?.fullName?.toString() === "" ? "d-block" : ""
                  }`}
                >
                  *Vui lòng nhập họ và tên.
                </span>
              </FormElement>

              <FormElement>
                <label htmlFor="" className="forme-elem-label">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="username"
                  value={userRegister?.username || ""}
                  onChange={handleChangeText}
                  className="form-elem-control"
                />
                <span
                  className={`invalid-feedback ${
                    userRegister?.username?.toString() === "" ? "d-block" : ""
                  }`}
                >
                  *Vui lòng nhập tên đăng nhập.
                </span>
              </FormElement>

              <FormElement>
                <label htmlFor="" className="forme-elem-label">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="form-elem-control"
                  name="password"
                  value={userRegister?.password || ""}
                  onChange={handleChangeText}
                />
                <span
                  className={`invalid-feedback ${
                    userRegister?.password?.toString() === "" ? "d-block" : ""
                  }`}
                >
                  Sử dụng 6 ký tự trở lên với sự kết hợp của chữ cái và số.
                </span>
              </FormElement>

              <FormElement>
                <label htmlFor="" className="forme-elem-label">
                  Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  className="form-elem-control"
                  name="confirmpassword"
                  value={userRegister?.confirmpassword || ""}
                  onChange={handleChangeText}
                />
                <span
                  className={`invalid-feedback ${
                    userRegister?.confirmpassword?.toString() === ""
                      ? "d-block"
                      : ""
                  }`}
                >
                  Sử dụng 6 ký tự trở lên với sự kết hợp của chữ cái và số.
                </span>
                <span
                  className={`invalid-feedback ${
                    userRegister?.confirmpassword?.toString() !==
                    userRegister?.password?.toString()
                      ? "d-block"
                      : ""
                  }`}
                >
                  Xác nhận mật khẩu không khớp.
                </span>
              </FormElement>

              <FormElement>
                <label htmlFor="" className="forme-elem-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-elem-control"
                  name="email"
                  value={userRegister?.email || ""}
                  onChange={handleChangeText}
                />
                <span
                  className={`invalid-feedback ${
                    userRegister?.email?.toString() === "" ? "d-block" : ""
                  }`}
                >
                  Email không được để trống.
                </span>
              </FormElement>

              <FormElement>
                <label htmlFor="" className="forme-elem-label">
                  Ngày sinh
                </label>
                <input
                  type="date"
                  className="form-elem-control"
                  name="dob"
                  value={userRegister?.dob || ""}
                  onChange={handleChangeText}
                />
                <span
                  className={`invalid-feedback ${
                    userRegister?.dob?.toString() === "" ? "d-block" : ""
                  }`}
                >
                  Ngày sinh không được để trống.
                </span>
              </FormElement>

              <FormElement>
                <label htmlFor="" className="forme-elem-label">
                  Lớp
                </label>
                <input
                  type="text"
                  className="form-elem-control"
                  name="className"
                  value={userRegister?.className || ""}
                  onChange={handleChangeText}
                />
                <span
                  className={`invalid-feedback ${
                    userRegister?.className?.toString() === "" ? "d-block" : ""
                  }`}
                >
                  Tên lớp không được để trống.
                </span>
              </FormElement>

              <FormElement>
                <label htmlFor="" className="forme-elem-label">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  className="form-elem-control"
                  name="phone"
                  value={userRegister?.phone || ""}
                  onChange={handleChangeNumber}
                />
                <span
                  className={`invalid-feedback ${
                    userRegister?.phone?.toString() === "" ? "d-block" : ""
                  }`}
                >
                  Số điện thoại không được để trống.
                </span>
              </FormElement>

              <FormElement>
                <label htmlFor="" className="forme-elem-label">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  className="form-elem-control"
                  name="address"
                  value={userRegister?.address || ""}
                  onChange={handleChangeText}
                />
                <span
                  className={`invalid-feedback ${
                    userRegister?.address?.toString() === "" ? "d-block" : ""
                  }`}
                >
                  Địa chỉ không được để trống.
                </span>
              </FormElement>

              <button
                className="form-submit-btn"
                style={{ backgroundColor: "black", color: "white" }}
                onClick={register} disabled={isLoading} 
              >
                {isLoading ? "Đang xử lý..." : "Đăng ký"}
              </button>

              <div className="text-center mt-3">
                <Link to={"/login"}>
                  Bạn đã có tài khoản? Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </SignUpScreenWrapper>
  );
};

export default SignUp;
