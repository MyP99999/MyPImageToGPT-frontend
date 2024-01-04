import { useRef } from 'react';
import './Technologies.scss'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { items } from '../items/items';

const renderRatingBar = (rating, maxRating = 5) => {
    return (
        <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
            <div className="bg-purple-600 h-4 rounded-full" style={{ width: `${(rating / maxRating) * 100 + 4}%` }}></div>
        </div>
    );
};


const Single = ({ item }) => {
    const ref = useRef();

    const { scrollYProgress } = useScroll({
        target: ref,
    });

    const y = useTransform(scrollYProgress, [0, 1], [-200, 200]);
 
    const trimDescription = (desc, wordLimit) => {
        const words = desc.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return desc;
    };

    return (
        <section >
            <div className="container mx-auto flex items-center justify-center h-full overflow-hidden">
                <div className="wrapper flex max-w-5xl h-full mx-auto gap-12 items-center justify-center">
                    <div className="imageContainer flex-1 flex justify-center items-center h-1/2" ref={ref}>
                        <div className="flex flex-col items-center gap-5">
                            <div className="flex w-full flex-col items-center gap-1.5">
                                <span className="text-orange-500 text-lg">Performance</span>
                                {renderRatingBar(item.performance)}
                            </div>
                            <div className="flex w-full flex-col items-center gap-1.5">
                                <span className="text-orange-500 text-lg">Cost</span>
                                {renderRatingBar(item.cost)}
                            </div>
                            <div className="flex w-full flex-col items-center gap-1.5">
                                <span className="text-orange-500 text-lg">Speed</span>
                                {renderRatingBar(item.speed)}
                            </div>
                        </div>
                    </div>
                    <motion.div className="textContainer flex-1 flex flex-col gap-7" style={{ y }}>
                        <h2 className="text-4xl md:text-9xl">{item.title}</h2>
                        <p className="text-gray-500 text-base md:text-lg">{trimDescription(item.desc, 60)}</p>
                        <p className='font-semibold'>Technologie: {item.tech}</p>
                    </motion.div>
                </div>
            </div>

        </section>
    );
};


const Technologies = () => {
    const ref = useRef()
    const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "start start"] })

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    })

    return (
        <div className='portfolio' ref={ref}>
            <div className="progress">
                <h1>AI & OCR Capabilities</h1>
                <motion.div style={{ scaleX }} className="progressBar"></motion.div>
            </div>
            {
                items.map(item => (
                    <Single item={item} key={item.id} />
                ))
            }
        </div >
    )
}
export default Technologies