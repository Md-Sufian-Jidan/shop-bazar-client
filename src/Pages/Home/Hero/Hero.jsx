import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div
            className="bg-cover bg-center min-h-[70vh] flex items-center justify-center"
            style={{ backgroundImage: `url('https://source.unsplash.com/1600x900/?shopping,store')` }}
        >
            <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0 z-0" />

            <motion.div
                className="relative z-10 text-center text-white px-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.h1
                    className="text-4xl md:text-5xl font-extrabold mb-6"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    সবকিছু এক ছাদের নিচে – <span className="text-orange-400">ShobBazaar!</span>
                </motion.h1>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <Link
                        to="/shop"
                        className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-lg rounded-full shadow-lg transition-all duration-300"
                    >
                        Shop Now
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Hero;
