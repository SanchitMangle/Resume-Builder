import React from 'react'
import Banner from '../components/Home/Banner'
import HeroSection from '../components/Home/HeroSection'
import Testimonials from '../components/Home/Testimonials'
import Features from '../components/Home/Features'
import CallToAction from '../components/Home/CallToAction'
import Footer from '../components/Home/Footer'


const Home = () => {
    return (
        <div>
            <Banner />
            <HeroSection />
            <Features />
            <Testimonials />
            <CallToAction />
            <Footer />
        </div>
    )
}

export default Home
