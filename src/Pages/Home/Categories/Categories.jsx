import React from "react";
import { motion } from "framer-motion";

// Fake categories data
const categories = [
    {
        id: 1,
        name: "Electronics",
        image: "https://source.unsplash.com/200x200/?electronics"
    },
    {
        id: 2,
        name: "Fashion",
        image: "https://source.unsplash.com/200x200/?fashion"
    },
    {
        id: 3,
        name: "Groceries",
        image: "https://source.unsplash.com/200x200/?grocery"
    },
    {
        id: 4,
        name: "Mobile",
        image: "https://source.unsplash.com/200x200/?mobile"
    },
    {
        id: 5,
        name: "Home Appliances",
        image: "https://source.unsplash.com/200x200/?home-appliances"
    },
    {
        id: 6,
        name: "Toys",
        image: "https://source.unsplash.com/200x200/?toys"
    }
];

const Categories = () => {
    return (
        <div className="bg-background py-12 px-4 md:px-8">
            <h2 className="text-3xl font-bold text-textColor text-center mb-10">
                Shop by Category
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {categories.map((cat, index) => (
                    <motion.div
                        key={cat.id}
                        className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition-all duration-300 group"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                        <div className="relative w-full h-40 overflow-hidden">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-3 text-center text-textColor font-medium">
                            {cat.name}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
