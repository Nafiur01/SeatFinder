import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import FadeEffect from './FadeEffect'
import ScrollFix from './ScrollFix'

const Layout = ({ children }) => {
  return (
    <>
    <ScrollFix />
    <Navbar />
    <FadeEffect>
    {children}
    </FadeEffect>
    <Footer />
    </>
  )
}

export default Layout
