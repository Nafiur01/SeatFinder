import React from 'react'
import Navbar from './Navbar'

function RegPage() {
  return (
    <>
        <Navbar />
        <div className='pcontainer'>

            <h1 className=' mb-4 mt-3'>Registration</h1>
            <form>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone
                        else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control"
                        id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control"
                        id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        
        </div>

    </>
  )
}

export default RegPage
