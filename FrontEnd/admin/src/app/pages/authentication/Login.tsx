import React from 'react'

export default function Login() {
  return (
    <div>
       <main className="main" id="top">
  <div className="container">
    <div className="row flex-center min-vh-100 py-5">
      <div className="col-sm-10 col-md-8 col-lg-5 col-xl-5 col-xxl-3"><a className="d-flex flex-center text-decoration-none mb-4" href="../../../index.html">
          <div className="d-flex align-items-center fw-bolder fs-5 d-inline-block"><img src="../../../assets/img/icons/logo.png" alt="phoenix" width={58} /></div>
        </a>
        <div className="text-center mb-7">
          <h3 className="text-1000">Sign In</h3>
          <p className="text-700">Get access to your account</p>
        </div><button className="btn btn-phoenix-secondary w-100 mb-3"><span className="fab fa-google text-danger me-2 fs--1" />Sign in with google</button><button className="btn btn-phoenix-secondary w-100"><span className="fab fa-facebook text-primary me-2 fs--1" />Sign in with facebook</button>
        <div className="position-relative">
          <hr className="bg-200 mt-5 mb-4" />
          <div className="divider-content-center">or use email</div>
        </div>
        <div className="mb-3 text-start"><label className="form-label" htmlFor="email">Email address</label>
          <div className="form-icon-container"><input className="form-control form-icon-input" id="email" type="email" placeholder="name@example.com" /><span className="fas fa-user text-900 fs--1 form-icon" /></div>
        </div>
        <div className="mb-3 text-start"><label className="form-label" htmlFor="password">Password</label>
          <div className="form-icon-container"><input className="form-control form-icon-input" id="password" type="password" placeholder="Password" /><span className="fas fa-key text-900 fs--1 form-icon" /></div>
        </div>
        <div className="row flex-between-center mb-7">
          <div className="col-auto">
            <div className="form-check mb-0"><input className="form-check-input" id="basic-checkbox" type="checkbox"  /><label className="form-check-label mb-0" htmlFor="basic-checkbox">Remember me</label></div>
          </div>
          <div className="col-auto"><a className="fs--1 fw-semi-bold" href="forgot-password.html">Forgot Password?</a></div>
        </div><button className="btn btn-primary w-100 mb-3">Sign In</button>
        <div className="text-center"><a className="fs--1 fw-bold" href="sign-up.html">Create an account</a></div>
      </div>
    </div>
  </div>
</main>

    </div>
  )
}
