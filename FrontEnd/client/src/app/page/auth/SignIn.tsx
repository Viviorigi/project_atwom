import styled from "styled-components";
import { FormGridWrapper, FormTitle } from "../../styles/form_grid";
import { Container } from "../../styles/styles";
import { staticImages } from "../../utils/images";
import { FormElement, Input } from "../../styles/form";
import { Link, useNavigate } from "react-router-dom";
import { BaseButtonBlack } from "../../styles/button";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import PasswordInput from "../../comp/auth/PasswordInput";
import AuthOptions from "../../comp/auth/AuthOptions";
import { LoginRequest } from "../../model/auth/LoginRequest";
import { useState } from "react";
import { toast } from "react-toastify";
import { AuthConstant } from "../../constants/authConstant";
import Cookies from "universal-cookie";
import { AuthService } from "../../services/AuthService";

const SignInScreenWrapper = styled.section`
  .form-separator {
    margin: 32px 0;
    column-gap: 18px;

    @media (max-width: ${breakpoints.lg}) {
      margin: 24px 0;
    }

    .separator-text {
      border-radius: 50%;
      min-width: 36px;
      height: 36px;
      background-color: ${defaultTheme.color_purple};
      position: relative;
    }

    .separator-line {
      width: 100%;
      height: 1px;
      background-color: ${defaultTheme.color_platinum};
    }
  }

  .form-elem-text {
    margin-top: -16px;
    display: block;
  }
`;

const SignIn = () => {
  const [loginRequest, setLoginRequest] = useState<LoginRequest>(new LoginRequest());
  const navigate = useNavigate();
  const cookie = new Cookies();
  const handleChangeText = (event: any) => {
    const { name, value } = event.target;
    setLoginRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setLoginState = () => {
    setLoginRequest((prev: LoginRequest) => {
      return {
        ...prev,
        username: prev.username || "",
        password: prev.password || ""
      };
    });
  };
  const chk = () => {
    if (loginRequest.username === undefined || loginRequest.username === "") {
      setLoginState();
      return false;
    }
    if (loginRequest.password === undefined || loginRequest.password === "") {
      setLoginState();
      return false;
    }

    return true;
  };

  const login = () => {
    if (!chk()) {
      return;
    }
    // dispatch(setLoading(true));
    AuthService.getInstance().login(loginRequest).then((resp: any) => {
      if (resp) {
        // dispatch(setLoading(false))
        const expires = new Date();
        expires.setDate(expires.getDate() + AuthConstant.EXPIRES_TOKEN)
        cookie.set(AuthConstant.ACCESS_TOKEN, resp.data.jwt, { path: '/', expires: expires })
        cookie.set('fullName', resp.data.fullName)
        cookie.set('avatar', resp.data.avatar)
        navigate('/')
        // if (rememberMe) {
        //   cookie.set('username', resp.data.username)
        //   cookie.set('password', encryptPassword(loginRequest.password,'1234'), { expires: expires})
        // } else {
        //   cookie.remove('username')
        //   cookie.remove('password')
        // };
      }
    }).catch((error: any) => {
      // dispatch(setLoading(false));
      toast.error("Username or Password wrong");
    });
  }

  return (
    <SignInScreenWrapper>
      <FormGridWrapper>
        <Container>
          <div className="form-grid-content">
            <div className="form-grid-left">
              <img src={staticImages.book_form} className="object-fit-cover" alt="" />
            </div>
            <div className="form-grid-right">
              <FormTitle>
                <h3 className="mt-3">Sign In</h3>
              </FormTitle>
              <FormElement>
                <label htmlFor="" className="form-elem-label">
                  User name
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  onChange={handleChangeText}
                  value={loginRequest.username || ""}
                  className="form-elem-control"
                />
                <div
                  className={`invalid-feedback ${loginRequest.username?.toString() === "" ? "d-block" : "d-none"}`}
                  style={{ fontSize: "100%", color: "red" }}
                >
                  Username not empty
                </div>
              </FormElement>
              <FormElement>
                <input type="password"
                  className="form-elem-control"
                  placeholder="Enter password"
                  name="password"
                  onChange={handleChangeText}
                  value={loginRequest.password || ""} />
                <div
                  className={`invalid-feedback ${loginRequest.password?.toString() === "" ? "d-block" : "d-none"}`}
                  style={{ fontSize: "100%", color: "red" }}
                >
                  Password not empty
                </div>
              </FormElement>
              <Link
                to="/forgot-password"
                className="form-elem-text text-end font-medium"
              >
                Forgot your password?
              </Link>
              {/* <BaseButtonBlack type="button" className="form-submit-btn" > */}
                <button className="form-submit-btn" style={{backgroundColor:"black",color:"white"}} onClick={login}>Sign in</button>
              {/* </BaseButtonBlack> */}
              <p className="flex flex-wrap account-rel-text">
                Don&apos;t have a account?
                <Link to="/register" className="font-medium">
                  Sign Up
                </Link>
                `
              </p>
            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </SignInScreenWrapper>
  );
};

export default SignIn;
