import { motion } from 'framer-motion';
import './styles/hero.scss'

const textVariants = {
    initial: {
        x: -500,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.1,
        }
    },
    scrollButton: {
        opacity: 0,
        y: 10,
        transition: {
            duration: 2,
            repeat: Infinity,
        }
    }
}

const sliderVariants = {
    initial: {
        x: 0,
    },
    animate: {
        x: "-300%",
        transition: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: 20,
        }
    }
}

const HomePage = () => {
    return (
        <div className='hero'>
            <div className="wrapper">
                <motion.div className="textContainer" variants={textVariants} initial="initial" animate="animate">
                    <motion.h2 variants={textVariants}>MyP Image to GPT</motion.h2>
                    <motion.h1 variants={textVariants}>The Best OCR Solver APP</motion.h1>
                    <motion.div variants={textVariants} className="buttons">
                        <motion.a href='/login' variants={textVariants}>
                            Get Started
                        </motion.a>
                        <motion.a href='#Contact' variants={textVariants}>
                            Contact
                        </motion.a>
                    </motion.div>
                    <motion.img variants={textVariants} animate="scrollButton" src="/scroll.png" alt="" />
                </motion.div>
                <motion.div className="slidingTextContainer" variants={sliderVariants} initial="initial" animate="animate">
                    MyP Image to GPT
                </motion.div>
                <div className="imageContainer">
                    <img src="/logo.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default HomePage;