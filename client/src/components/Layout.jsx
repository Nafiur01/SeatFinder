import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import FadeEffect from './FadeEffect'

const Layout = ({ children }) => {
  return (
    <>
    <Navbar />
    <FadeEffect>
    {children}
    </FadeEffect>
    <Footer />
    </>
  )
}

export default Layout
