import { motion } from "framer-motion";

const variants = {
    open: {
        transition: {
            staggerChildren: 0.3,
        },
    },
    closed: {
        transition: {
            staggerChildren: 0.1,
            staggerDirection: -1,
        },
    },
};
const itemVariants = {
    open: {
        y: 0,
        opacity: 1,
    },
    closed: {
        y: 50,
        opacity: 0,
    },
};

export const Links = () => {
    const items = ["Homepage", "Capabilities", "Contact"];

    return (
        <motion.div className="absolute w-full h-full flex flex-col justify-center items-center gap-5" variants={variants}>
            {items.map((item) => (
                <motion.a
                    href={`/about/#${item}`}
                    key={item}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-4xl"
                >
                    {item}
                </motion.a>
            ))}
        </motion.div>
    );
};
