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
  const [resetPwsRequest, setResetPwsRequest] = useState<ResetpwdRequest>(new ResetpwdRequest());

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

    AuthService.getInstance().resetPass(resetPwsRequest).then((resp: any) => {
      if (resp) {
        // dispatch(setLoading(false))
        toast.success(resp.data.message)
      }
    }).catch((error: any) => {
      // dispatch(setLoading(false));
      toast.error("Email not found");
    });
    
  }
  return (
    <ResetScreenWrapper>
      <FormGridWrapper>
        <Container>
          <div className="form-grid-content">
            <div className="form-grid-left">
              <img src={staticImages.book_form} className="object-fit-cover" alt="" />
            </div>
            <div className="form-grid-right">
              <FormTitle>
                <h3>Reset Your Password</h3>
                <p>
                  Enter your email and we &apos;ll send you a link to reset your
                  password.
                </p>
                <p>Please check it.</p>
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
                  placeholder="Enter your email"
                  name="email"
                  className="form-elem-control"
                />
                <div
                  className={`invalid-feedback ${resetPwsRequest.email?.toString() === "" ? "d-block" : ""}`}
                  style={{ fontSize: "100%", color: "red" }}
                >
                  Email not empty
                </div>
              </FormElement>
              {/* <BaseButtonBlack type="submit" className="form-submit-btn"> */}
              <button className="form-submit-btn" style={{ backgroundColor: "black", color: "white" }} onClick={send}>Send</button>
              {/* </BaseButtonBlack>   */}
              <p className="flex flex-wrap account-rel-text">
                <Link to="/login" className="font-medium">
                  Back to Login
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
