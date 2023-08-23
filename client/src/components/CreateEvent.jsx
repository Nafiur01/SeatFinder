import React from 'react'
import Layout from './Layout'
import '../css/page.css'

function CreateEvent() {
  return (
    <Layout>
        <div className="pcontainer">
            <h2 className='mb-4 mt-3'>Post an Event</h2>
            <input type="text" placeholder="Event Name" className="form-control mb-3" />
        </div>
        
    </Layout>
  )
}

export default CreateEvent
