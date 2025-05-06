import React from "react";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const FeaturedProducts = () => {
    const axiosPublic = useAxiosPublic();

    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['featured'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products/featured');
            return res.data;
        },
    });
    return (
        <section className="bg-background py-12 px-4 md:px-8">
            <h2 className="text-3xl font-bold text-textColor mb-6">Featured Products</h2>

            <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-6 scrollbar-hide">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        className="min-w-[250px] md:min-w-0 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 p-4 flex flex-col justify-between"
                        whileHover={{ scale: 1.03 }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <div className="flex-grow">
                            <h3 className="text-lg font-semibold text-textColor">{product.name}</h3>
                            <p className="text-secondary text-md font-medium mt-1">৳{product.price}</p>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                            <button className="bg-primary hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1">
                                <FiShoppingCart />
                                Add to Cart
                            </button>
                            <button className="text-accent hover:text-blue-800 text-xl">
                                <FiHeart />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;
