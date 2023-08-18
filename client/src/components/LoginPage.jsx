import React from 'react'
import Navbar from './Navbar'
import '../css/page.css';
import '../css/LoginPage.css';


function LoginPage() {
  return (
    <>
        <Navbar />
    <div className='container mt-5 login-pc-block'>
        <div className="row">
            <div className="col-md-5 col-12">
                <img src="/assets/images/login-banner.png" alt="" width="500"/>
            </div>
            <div className="col-md-5 col-12 pcontainer login-pc-v">
                <form className="login-form">
                    <div class="info-box" role="alert">
                        Welcome back! Please enter your credentials to log in.
                    </div>
                    <input type="text" className="login-field" placeholder="Username" />
                    <input type="password" className="login-field" placeholder="Password" />
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
      
    </div>

    <div className='login-mbl-block'>

        <div className="col-md-5 col-12 pcontainer login-pc-v">
            <form className="login-form">
                <div class="info-box" role="alert">
                    Welcome back! Please enter your credentials to log in.
                </div>
                <input type="text" className="login-field" placeholder="Username" />
                <input type="password" className="login-field" placeholder="Password" />
                <button type="submit" className="login-button">Login</button>
            </form>
            <div className="text-white mt-4">
                New to SeatFinder? <a className='text-white' href="/signup">Create an account</a>
            </div>
        </div>

    </div>
    
    </>
  )
}

export default LoginPage
