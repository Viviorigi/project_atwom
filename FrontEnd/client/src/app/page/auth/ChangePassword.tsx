import styled from "styled-components";
import { FormGridWrapper, FormTitle } from "../../styles/form_grid";
import { Container } from "../../styles/styles";
import { staticImages } from "../../utils/images";
import { BaseButtonBlack } from "../../styles/button";
import PasswordInput from "../../comp/auth/PasswordInput";
import { useState } from "react";
import { ChangePasswordRequest } from "../../model/auth/ChangePasswordRequest";
import { FormElement } from "../../styles/form";
import { AuthService } from "../../services/AuthService";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { AuthConstant } from "../../constants/authConstant";
import { useNavigate } from "react-router-dom";

const ChangePwdScreenWrapper = styled.section``;

const ChangePassword = () => {
  const [pass, setPass] = useState<ChangePasswordRequest>(new ChangePasswordRequest());
  const cookie = new Cookies();
  const navigate = useNavigate()
  const handleChangeText = (event: any) => {
    const { name, value } = event.target;
    setPass((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const setChangePassState = () => {
    setPass((prev: ChangePasswordRequest) => {
      return {
        ...prev,
        currentPassword: prev.currentPassword || "",
        newPassword: prev.newPassword || "",
        confirmPassword: prev.confirmPassword || ""

      };
    });
  };
  const chk = () => {
    if (pass.newPassword === undefined || pass.newPassword === "") {
      setChangePassState();
      return false;
    }
    if (pass.confirmPassword === undefined || pass.confirmPassword === "") {
      setChangePassState();
      return false;
    }

    return true;
  };
  const changePassword = () => {
    if (!chk()) {
      return;
    }
    AuthService.getInstance().changePassword(pass)
      .then((resp: any) => {
        if (resp) {
          cookie.remove(AuthConstant.ACCESS_TOKEN);
          cookie.remove("fullName")
          cookie.remove("avatar")
          cookie.remove('username')
          cookie.remove('password')
          toast.success(resp.data.message + " Please login back");
          navigate("/login")
        }
      })
      .catch((error: any) => {
        // dispatch(setLoading(false));
        toast.error("Change password error");
      });
  }

  return (
    <ChangePwdScreenWrapper>
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
                <h3>Đổi mật khẩu</h3>
                
              </FormTitle>

              <FormElement>
                <label htmlFor="" className="form-elem-label">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu hiện tại"
                  name="currentPassword"
                  onChange={handleChangeText}
                  value={pass.currentPassword || ""}
                  className="form-elem-control"
                />
                <div
                  className={`invalid-feedback ${pass.currentPassword?.toString() === "" ? "d-block" : ""}`}
                  style={{ fontSize: "100%", color: "red" }}
                >
                  Mật khẩu hiện tại không để trống
                </div>
              </FormElement>

              <FormElement>
                <label htmlFor="" className="form-elem-label">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  name="newPassword"
                  onChange={handleChangeText}
                  value={pass.newPassword || ""}
                  className="form-elem-control"
                />
                <div
                  className={`invalid-feedback ${pass.newPassword?.toString() === "" ? "d-block" : ""}`}
                  style={{ fontSize: "100%", color: "red" }}
                >
                  Mật khẩu mới không để trống
                </div>
              </FormElement>
              <FormElement>
                <label htmlFor="" className="form-elem-label">
                  Nhập lại mật khẩu
                </label>
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  name="confirmPassword"
                  onChange={handleChangeText}
                  value={pass.confirmPassword || ""}
                  className="form-elem-control"
                />
                <div
                  className={`invalid-feedback ${pass.confirmPassword?.toString() === "" ? "d-block" : ""}`}
                  style={{ fontSize: "100%", color: "red" }}
                >
                  Nhập lại mật khẩu không được trống
                </div>
                <div className={`invalid-feedback ${pass?.confirmPassword?.toString() !== pass?.newPassword?.toString() ? "d-block" : ""}`}
                  style={{ fontSize: "100%", color: "red" }}>
                  Nhập lại mật khẩu không chính xác
                </div>
              </FormElement>

              <button className="form-submit-btn" style={{ backgroundColor: "black", color: "white" }} onClick={changePassword}>Đổi Mật Khẩu</button>

            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </ChangePwdScreenWrapper>
  );
};

export default ChangePassword;
