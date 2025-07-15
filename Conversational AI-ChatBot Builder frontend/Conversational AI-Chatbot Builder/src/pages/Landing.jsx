import Features from "../components/LandingPage/Features";
import Hero from "../components/LandingPage/Hero";
import React from 'react'
import HowItWorks from "../components/LandingPage/HowItWorks";
import CTA from "../components/LandingPage/CTA";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <>
     <Navbar/>
     <Hero />
     <Features />
     <HowItWorks />
     <CTA />
     <Footer />
    </>

  )
}

export default Landing