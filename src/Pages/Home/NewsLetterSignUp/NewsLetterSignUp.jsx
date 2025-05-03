import React from "react";
import { motion } from "framer-motion";

const NewsletterSignup = () => {
    return (
        <section className="bg-background py-12 px-4 md:px-8">
            <motion.div
                className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-2xl md:text-3xl font-bold text-textColor mb-4">
                    Subscribe to Our Newsletter
                </h2>
                <p className="text-gray-600 mb-6 text-sm md:text-base">
                    Stay updated with our latest deals, product launches, and news from ShobBazaar!
                </p>
                <form className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full sm:w-2/3 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        type="submit"
                        className="bg-primary hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors duration-300"
                    >
                        Subscribe
                    </button>
                </form>
            </motion.div>
        </section>
    );
};

export default NewsletterSignup;
