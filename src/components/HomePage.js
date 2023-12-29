import { motion } from 'framer-motion';

const HomePage = () => {

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
                duration: 15,
            }
        }
    }
    return (
        <div className='h-[calc(100vh-100px)] overflow-hidden bg-gradient-to-b from-[#0c0c1d] to-[#111132] relative'>
            <div className="max-w-[1366px] mx-auto h-full flex flex-col xl:flex-row">
                <motion.div className="flex flex-col justify-center items-center w-full h-1/2 gap-5 px-6 text-center xl:w-1/2 xl:h-full xl:px-0 xl:items-start xl:text-left" variants={textVariants} initial="initial" animate="animate">
                    <motion.h2 className="text-[30px] text-[rebeccapurple] tracking-[10px] font-semibold mt-6 md:mt-0" variants={textVariants}>MyP Image to GPT</motion.h2>
                    <motion.h1 className="text-[36px] xl:text-[88px] font-bold" variants={textVariants}>The most powerfull tool to solve a text</motion.h1>
                    <motion.div className="flex flex-wrap gap-5 justify-center xl:justify-start" variants={textVariants}>
                        <motion.a href='#Portfolio' className="py-3 px-10 border border-white rounded-[10px] bg-transparent text-white cursor-pointer text-sm xl:py-5 xl:px-20 xl:text-base hover:bg-rgb(223, 245, 245) hover:text-rebeccapurple hover:font-bold hover:border-rebeccapurple" variants={textVariants}>
                            Get Started
                        </motion.a>
                        <motion.a href='#Contact' className="py-3 px-10 border border-white rounded-[10px] bg-transparent text-white cursor-pointer text-sm xl:py-5 xl:px-20 lg:text-base hover:bg-rgb(223, 245, 245) hover:text-rebeccapurple hover:font-bold hover:border-rebeccapurple" variants={textVariants}>
                            Contact
                        </motion.a>
                    </motion.div>
                    <motion.img variants={textVariants} animate="scrollButton" src="/scroll.png" alt="Scroll down icon" className="w-12 h-12 xl:w-[50px] xl:h-[50px]" />
                </motion.div>
                <motion.div className="absolute text-[50vh] bottom-[-120px] whitespace-nowrap text-[#ffffff09] w-1/2 font-bold pointer-events-none" variants={sliderVariants} initial="initial" animate="animate">
                    MyP Image to GPT
                </motion.div>
                <div className="h-1/2 w-full xl:h-full xl:w-1/2 xl:absolute xl:top-0 xl:right-0">
                    <img src="/logo.png" alt="Profile" className="object-contain w-full h-full xl:object-contain xl:w-[80%] xl:h-[80%]" />
                </div>
            </div>
        </div>
    );
}

export default HomePage;