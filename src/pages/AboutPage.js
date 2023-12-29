import React from 'react'
import AboutNavbar from '../components/about/AboutNavbar'
import HomePage from '../components/about/HomePage'
import Parallax from '../components/about/Parallax'
import Contact from '../components/about/Contact'
import '../components/about/styles/about.scss'

const AboutPage = () => {
    return (
        <div className=''>
            <section id="Homepage">
                <AboutNavbar />
                <HomePage />
            </section>
            <section id="Services"><Parallax type="services" /></section>
            {/* <section><Services /></section> */}
            <section id="Portfolio"><Parallax type="portfolio" /></section>
            <section id="Contact">
                <Contact />
            </section>
        </div>
    )
}

export default AboutPage