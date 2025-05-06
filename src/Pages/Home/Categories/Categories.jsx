import React from "react";
import { motion } from "framer-motion";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Categories = () => {
    const axiosPublic = useAxiosPublic();

    const { data: categories = [], isLoading, error } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/categories');
            return res.data;
        },
    });

    return (
        <div className="bg-background py-12 px-4 md:px-8">
            <h2 className="text-3xl font-bold text-textColor text-center mb-10">
                Shop by Category
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {categories.map((cat, index) => (
                    <Link to={`/products/category/${cat?.name}`}>
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
                        </motion.div></Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
