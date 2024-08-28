import styled from "styled-components";
import { FormGridWrapper, FormTitle } from "../../styles/form_grid";
import { Container } from "../../styles/styles";
import { staticImages } from "../../utils/images";
import { FormElement, Input } from "../../styles/form";
import { BaseButtonBlack } from "../../styles/button";
import { Link } from "react-router-dom";
import { send } from "process";
import { useState } from "react";
import { ResetpwdRequest } from "../../model/auth/ResetpwdRequest";
import { AuthService } from "../../services/AuthService";
import { toast } from "react-toastify";

const ResetScreenWrapper = styled.section``;

const ResetPassword = () => {
  const [resetPwsRequest, setResetPwsRequest] = useState<ResetpwdRequest>(
    new ResetpwdRequest()
  );
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChangeText = (event: any) => {
    const { name, value } = event.target;
    setResetPwsRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const setResetPasswordState = () => {
    setResetPwsRequest((prev: ResetpwdRequest) => {
      return {
        ...prev,
        email: prev.email || "",
      };
    });
  };
  const chk = () => {
    if (resetPwsRequest.email === undefined || resetPwsRequest.email === "") {
      setResetPasswordState();
      return false;
    }
    return true;
  };
  const send = () => {
    if (!chk()) {
      return;
    }
    setIsLoading(true);
    AuthService.getInstance()
      .resetPass(resetPwsRequest)
      .then((resp: any) => {
        if (resp) {
          // dispatch(setLoading(false))
          toast.success("Đã gửi email reset mật khẩu");
        }
        setIsLoading(false);
      })
      .catch((error: any) => {
        // dispatch(setLoading(false));
        setIsLoading(false);
        toast.error("Không tìm thấy email");
      });
  };
  return (
    <ResetScreenWrapper>
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
                <h3>Đặt lại mật khẩu của bạn</h3>
                <p>
                  Nhập email của bạn và chúng tôi sẽ gửi cho bạn một liên kết để
                  đặt lại mật khẩu.
                </p>
                <p>Vui lòng kiểm tra email.</p>
              </FormTitle>
              {/* form submit */}
              <FormElement>
                <label htmlFor="" className="form-elem-label">
                  Email
                </label>
                <input
                  type="text"
                  value={resetPwsRequest.email}
                  onChange={handleChangeText}
                  placeholder="Nhập email của bạn"
                  name="email"
                  className="form-elem-control"
                />
                <div
                  className={`invalid-feedback ${
                    resetPwsRequest.email?.toString() === "" ? "d-block" : ""
                  }`}
                  style={{ fontSize: "100%", color: "red" }}
                >
                  Email không được để trống
                </div>
              </FormElement>
              {/* <BaseButtonBlack type="submit" className="form-submit-btn"> */}
              <button
                className="form-submit-btn"
                style={{ backgroundColor: "black", color: "white" }}
                onClick={send} disabled={isLoading} 
              >
                {isLoading ? "Đang xử lý..." : "Gửi"}
              </button>
              {/* </BaseButtonBlack>   */}
              <p className="flex flex-wrap account-rel-text">
                <Link to="/login" className="font-medium">
                  Quay lại Đăng nhập
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </ResetScreenWrapper>
  );
};

export default ResetPassword;
