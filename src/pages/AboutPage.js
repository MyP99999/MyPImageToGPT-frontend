import React from 'react'
import '../components/styles/about.css'
import HomePage from '../components/HomePage'
import AboutNavbar from '../components/AboutNavbar'
import Parallax from '../components/Parallax'

const AboutPage = () => {
    return (
        <>
            <section id="Homepage">
                <AboutNavbar />
                <HomePage />
            </section>
            <section id="Services"><Parallax type="services" /></section>
            {/* <section><Services /></section> */}
            <section id="Portfolio"><Parallax type="portfolio" /></section>
            <section>
                <h1>sdadas</h1>
            </section>
        </>
    )
}

export default AboutPage