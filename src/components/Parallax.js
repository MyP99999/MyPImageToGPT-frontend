import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Parallax = ({ type }) => {
    const ref = useRef()
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    })

    const yText = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", "500%"]
    )

    const yBg = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", "100%"]
    )

    return (
        <div ref={ref} className='w-full h-full relative flex items-center justify-center overflow-hidden' style={{
            background: type === "services"
                ? "linear-gradient(180deg, #111132, #0c0c1d)"
                : "linear-gradient(180deg, #111132, #505064)"
        }}>
            <motion.h1 className='text-[72px] text-center xl:text-[100px]' style={{ y: yText }}>{type === "services" ? "What I Do?" : "What I Did"}</motion.h1>
            <motion.div className="bg-no-repeat bg-contain xl:bg-cover w-full h-full absolute z-3 bg-bottom" style={{ backgroundImage: 'url("/mountains.png")' }}></motion.div>
            <motion.div
                className="xl:bg-cover bg-bottom w-full h-full absolute z-2 bg-contain bg-no-repeat"
                style={{
                    y: yBg,
                    backgroundImage: `url(${type === "services" ? "/planets.png" : "/sun.png"
                        })`,
                }}
            >
            </motion.div>
            <motion.div style={{ x: yBg, backgroundImage: 'url("/stars.png")' }} className="bg-cover bg-bottom w-full h-full absolute z-1" ></motion.div>
        </div>
    )
}

export default Parallax