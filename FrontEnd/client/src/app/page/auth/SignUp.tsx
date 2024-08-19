import styled from "styled-components";
import {
  CheckboxGroup,
  FormGridWrapper,
  FormTitle,
} from "../../styles/form_grid";
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
  const [userRegister, setUserRegister] = useState<UserDTORequest>(
    new UserDTORequest()
  );
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
    if (userRegister.username === undefined || userRegister.username === "") {
      setUserState();
      return false;
    }
    if (
      (userRegister.password === undefined) ||
      userRegister.password === ""
    ) {
      setUserState();
      return false;
    }
    if (userRegister.email === undefined || userRegister.email === "") {
      setUserState();
      return false;
    }
    if (userRegister.fullName === undefined || userRegister.fullName === "") {
      setUserState();
      return false;
    }
    if (userRegister.address === undefined || userRegister.address === "") {
      setUserState();
      return false;
    }
    if (userRegister.dob === undefined || userRegister.dob.toString() === "") {
      setUserState();
      return false;
    }
    if (userRegister.phone === undefined || userRegister.phone.toString() === "") {
      setUserState();
      return false;
    }
    return true;
  };

  const register = () => {
    if (!chk()) {
      return;
    }
    AuthService.getInstance()
    .register(userRegister)
    .then((resp: any) => {
      if (resp) {
        setTimeout(() => {
          // dispatch(setLoading(false));
          toast.success('Register successfully please check email to verify account');
          navigate('/register-success')
        }, 1000);
      }
    })
    .catch((error: any) => {
      // dispatch(setLoading(false));
      toast.error(error.message);
    });
  }

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
                <h3>Sign Up</h3>
                <p className="text-base">
                  Sign up for free to access to in any of our products
                </p>
              </FormTitle>

              <FormElement>
                <label htmlFor="" className="forme-elem-label">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="fullName"
                  value={userRegister?.fullName || ""}
                  onChange={handleChangeText}
                  className="form-elem-control"
                />
                <span className={`invalid-feedback ${userRegister?.fullName?.toString() === "" ? "d-block" : ""}`}>
                  *Please enter FullName.
                </span>
              </FormElement>

              <FormElement>
                <label htmlFor="" className="forme-elem-label">
                  User name
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="username"
                  value={userRegister?.username || ""}
                  onChange={handleChangeText}
                  className="form-elem-control"
                />
                <span className={`invalid-feedback ${userRegister?.username?.toString() === "" ? "d-block" : ""}`}>
                  *Please enter User Name.
                </span>
              </FormElement>

              <FormElement>
                <label htmlFor="" className="forme-elem-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-elem-control"
                  name="password"
                  value={userRegister?.password || ""}
                  onChange={handleChangeText}
                />
                <span className={`invalid-feedback ${userRegister?.password?.toString() === "" ? "d-block" : ""}`}>
                  Use 6 or more characters with a mix of letters, numbers
                </span>
              </FormElement>

              <FormElement>
                <label htmlFor="" className="forme-elem-label">
                  Confirm password
                </label>
                <input
                  type="password"
                  className="form-elem-control"
                  name="confirmpassword"
                  value={userRegister?.confirmpassword || ""}
                  onChange={handleChangeText}
                />
                <span className={`invalid-feedback ${userRegister?.confirmpassword?.toString() === "" ? "d-block" : ""}`}>
                  Use 6 or more characters with a mix of letters, numbers
                </span>
                <span className={`invalid-feedback ${userRegister?.confirmpassword?.toString() !== userRegister?.password?.toString() ? "d-block" : ""}`}>
                  Confirm Password does not match
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
                <span className={`invalid-feedback ${userRegister?.email?.toString() === "" ? "d-block" : ""}`}>
                  Email must not be empty.
                </span>
              </FormElement>

              <FormElement>
                <label htmlFor="" className="forme-elem-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-elem-control"
                  name="dob"
                  value={userRegister?.dob || ""}
                  onChange={handleChangeText}
                />
                <span className={`invalid-feedback ${userRegister?.dob?.toString() === "" ? "d-block" : ""}`}>
                  Date of Birth must not be empty.
                </span>
              </FormElement>

              <FormElement>
                <label htmlFor="" className="forme-elem-label">
                  Class Name
                </label>
                <input
                  type="text"
                  className="form-elem-control"
                  name="className"
                  value={userRegister?.className || ""}
                  onChange={handleChangeText}
                />
                <span className={`invalid-feedback ${userRegister?.className?.toString() === "" ? "d-block" : ""}`}>
                  Class Name  must not be empty.
                </span>
              </FormElement>

              <FormElement>
                <label htmlFor="" className="forme-elem-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="form-elem-control"
                  name="phone"
                  value={userRegister?.phone || ""}
                  onChange={handleChangeNumber}
                />
                <span className={`invalid-feedback ${userRegister?.phone?.toString() === "" ? "d-block" : ""}`}>
                  Phone  must not be empty.
                </span>
              </FormElement>

              <FormElement>
                <label htmlFor="" className="forme-elem-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-elem-control"
                  name="address"
                  value={userRegister?.address || ""}
                  onChange={handleChangeText}
                />
                <span className={`invalid-feedback ${userRegister?.address?.toString() === "" ? "d-block" : ""}`}>
                  Address must not be empty.
                </span>
              </FormElement>

              {/* <CheckboxGroup>
                <li className="flex items-center">
                  <input type="checkbox" aria-label="d" />
                  <span className="text-sm">
                    Agree to our
                    <Link to="/" className="text-underline">
                      Terms of use
                    </Link>
                    <span className="text-space">and</span>
                    <Link to="/" className="text-underline">
                      Privacy Policy
                    </Link>
                  </span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" aria-label="d" />
                  <span className="text-sm">
                    Subscribe to our monthly newsletter
                  </span>
                </li>
              </CheckboxGroup> */}
              {/* <BaseButtonBlack type="submit" className="form-submit-btn"> */}
              <button className="form-submit-btn" style={{ backgroundColor: "black", color: "white" }} onClick={register}>Sign Up</button>
              {/* </BaseButtonBlack> */}

              <p className="flex flex-wrap account-rel-text">
                Already have an account?
                <Link to="/login" className="font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </SignUpScreenWrapper>
  );
};

export default SignUp;
