import React from 'react'
import AboutNavbar from '../components/about/AboutNavbar'
import HomePage from '../components/about/HomePage'
import Parallax from '../components/about/Parallax'
import Contact from '../components/about/Contact'
import '../components/about/styles/about.scss'
import Technologies from '../components/about/technologies/Technologies'

const AboutPage = () => {
    return (
        <div className=''>
            <section id="Homepage">
                <AboutNavbar />
                <HomePage />
            </section>
            <section id="Capabilities"><Parallax type="services" /></section>
            <Technologies />
            <section id="Contact">
                <Contact />
            </section>
        </div>
    )
}

export default AboutPage