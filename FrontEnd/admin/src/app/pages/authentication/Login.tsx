import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginRequest } from '../../model/auth/LoginRequest'
import { toast } from 'react-toastify';
import { AuthService } from '../../services/AuthService';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setLoading } from '../../reducers/spinnerSlice';
import Cookies from 'universal-cookie';

export default function Login() {
  const [loginRequest, setLoginRequest] = useState<LoginRequest>(new LoginRequest());
  const dispatch = useAppDispatch();
  const [rememberMe, setRememberMe] = useState(false);
  const cookie = new Cookies();
  
  const handleChangeText = (event: any) => {
    const { name, value } = event.target;
    setLoginRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  useEffect(()=>{
    const storedUsername = cookie.get("username");
    if (storedUsername) {
      setLoginRequest(prev => ({
        ...prev,
        username: storedUsername
      }));
    }
  },[])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
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
    dispatch(setLoading(true));
    AuthService.getInstance().login(loginRequest).then((resp:any)=>{
      if(resp){
      
          toast.success("Login successfully");
          cookie.set('access_token',resp.data.jwt)
          if (rememberMe) { 
            cookie.set('username',resp.data.username)
          }else{
            cookie.remove('username')
          };      
      }
    }).catch((error: any) => {
      dispatch(setLoading(false));
      toast.error( "Username or Password wrong");
    });
  }

  return (
    <div>
      <main className="main" id="top">
        <div className="container">
          <div className="row flex-center min-vh-100 py-5">
            <div className="col-sm-10 col-md-8 col-lg-5 col-xl-5 col-xxl-3"><label className="d-flex flex-center text-decoration-none mb-4" >
              <div className="d-flex align-items-center fw-bolder fs-5 d-inline-block"><img src="../../../assets/img/icons/logo.png" alt="phoenix" width={80} /></div>
            </label>
              <div className="text-center mb-7">
                <h3 className="text-1000">Admin Login</h3>
                <p className="text-700">Get access to your account</p>
              </div>
              <div className="mb-3 text-start"><label className="form-label" htmlFor="email">UserName</label>
                <div className="form-icon-container"><input className="form-control form-icon-input" id="email" value={loginRequest.username || ""}
                  onChange={handleChangeText} name='username' type="text" placeholder="Username" /><span className="fas fa-user text-900 fs--1 form-icon" /></div>
                <div
                  className={`invalid-feedback ${loginRequest.username?.toString() === "" ? "d-block" : ""}`}
                  style={{ fontSize: "100%", color: "red" }}
                >
                  Username not empty
                </div>
              </div>
              <div className="mb-3 text-start"><label className="form-label" htmlFor="password">Password</label>
                <div className="form-icon-container"><input className="form-control form-icon-input" id="password" value={loginRequest.password || ""}
                  onChange={handleChangeText} name='password' type="password" placeholder="Password" /><span className="fas fa-key text-900 fs--1 form-icon" /></div>
                <div
                  className={`invalid-feedback ${loginRequest.password?.toString() === "" ? "d-block" : ""}`}
                  style={{ fontSize: "100%", color: "red" }}
                >
                  Password not empty
                </div>
              </div>
              <div className="row flex-between-center mb-7">
                <div className="col-auto">
                  <div className="form-check mb-0"><input className="form-check-input" id="basic-checkbox" type="checkbox"  checked={rememberMe}
                      onChange={handleCheckboxChange} /><label className="form-check-label mb-0" htmlFor="basic-checkbox">Remember me</label></div>
                </div>
                <div className="col-auto"><Link className="fs--1 fw-semi-bold" to={"/forgot-password"}>Forgot Password?</Link></div>
              </div><button className="btn btn-primary w-100 mb-3" onClick={login}>Login In</button>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
