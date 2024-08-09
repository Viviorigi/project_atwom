import React from 'react'

export default function ForgotPassword() {
  return (
    <div>
      <main className="main" id="top">
        <div className="container">
          <div className="row flex-center min-vh-100 py-5">
            <div className="col-sm-10 col-md-8 col-lg-5 col-xxl-4"><label className="d-flex flex-center text-decoration-none mb-4" >
              <div className="d-flex align-items-center fw-bolder fs-5 d-inline-block"><img src="../../../assets/img/icons/logo.png" alt="phoenix" width={120} /></div>
            </label>
              <div className="px-xxl-5">
                <div className="text-center mb-6">
                  <h4 className="text-1000">Forgot your password?</h4>
                  <p className="text-700 mb-5">Enter your email below and we will send <br className="d-sm-none" />you a reset link</p>
                  <form className="d-flex align-items-center mb-5"><input className="form-control flex-1" id="email" type="email" placeholder="Email" /><button className="btn btn-primary ms-2">Send<span className="fas fa-chevron-right ms-2" /></button></form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
