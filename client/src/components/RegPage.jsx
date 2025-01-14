import React, {useState} from 'react'
import Navbar from './Navbar'
import '../css/page.css';
import '../css/style.css';
import '../css/LoginPage.css';
import Layout from './Layout';
import { Link } from 'react-router-dom';


function RegPage() {
    const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    // if(isChecked){
    //     console.log("unchecked");
    // }
    // else
    //     console.log("checked");
  };
  return (
    <>
        <Layout>
    <div className='container mt-3 mb-3 login-pc-block'>
        <div className="row">
            <div className="col-md-5 col-12">
                <img className='danceImg' src="/assets/images/reg-banner.png" alt="" width="500"/>
            </div>
            <div className="col-md-5 col-12 pcontainer login-pc-v">
                <form className="login-form">
                    {/* <div class="info-box" role="alert">
                        Welcome back! Please enter your credentials to log in.
                    </div> */}

                    <input type="email" className="login-field" placeholder="Email" />
                    <input type="text" className="login-field" placeholder="Username" />
                    <input type="text" className="login-field" placeholder="Phone Number" />
                    <input type="password" className="login-field" placeholder="Password" />
                    <div className="text-start mt-3 mb-3">
                    <input checked={isChecked} onChange={handleCheckboxChange} type="checkbox" name="" id=""/> <i className='mx-2'>I am aware of the <Link className='text-white' to="/terms"> Terms and Conditions</Link></i>
                    </div>
                    <button type="submit" className="login-button" disabled={!isChecked}>Sign up</button>
                </form>
                <div className="text-white mt-4">
                    Already have an Account? <Link className='text-white' to="/login">Sign in</Link>
                </div>
            </div>
        </div>
      
    </div>

    <div className='mbl-container login-mbl-block'>

        <div className="pcontainer login-pc-v">
            <form className="login-form">
                <div class="info-box" role="alert">
                    Welcome back! Please enter your credentials to log in.
                </div>
                <input type="email" className="login-field" placeholder="Email" />
                    <input type="text" className="login-field" placeholder="Username" />
                    <input type="text" className="login-field" placeholder="Phone Number" />
                    <input type="password" className="login-field" placeholder="Password" />
                    <div className="text-start mt-3 mb-3 ">
                    <input type="checkbox" name="" id="" className='mr-5'/> <i className='mx-2'>I am aware of the <Link className='text-white' to="/terms"> Terms and Conditions</Link></i>
                    </div>
                    <button type="submit" className="login-button">Sign up</button>
            </form>
            <div className="text-white mt-4">
                Already have an Account? <Link className='text-white' to="/login">Sign in</Link>
            </div>
        </div>

    </div>
    </Layout>
    
    </>
  )
}

export default RegPage