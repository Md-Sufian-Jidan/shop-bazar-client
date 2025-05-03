// CategoriesPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiSmartphone, FiShoppingBag, FiTv, FiWatch, FiHome, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const categories = [
    {
        name: 'Mobile Phones',
        slug: 'mobile-phones',
        icon: <FiSmartphone className="text-4xl text-accent" />,
        productCount: 34
    },
    {
        name: 'Grocery',
        slug: 'grocery',
        icon: <FiShoppingBag className="text-4xl text-accent" />,
        productCount: 58
    },
    {
        name: 'Electronics',
        slug: 'electronics',
        icon: <FiTv className="text-4xl text-accent" />,
        productCount: 22
    },
    {
        name: 'Fashion',
        slug: 'fashion',
        icon: <FiWatch className="text-4xl text-accent" />,
        productCount: 40
    },
    {
        name: 'Home Essentials',
        slug: 'home-essentials',
        icon: <FiHome className="text-4xl text-accent" />,
        productCount: 19
    },
    {
        name: 'Beauty & Care',
        slug: 'beauty-care',
        icon: <FiHeart className="text-4xl text-accent" />,
        productCount: 27
    }
];

const CategoryCard = ({ name, slug, icon, productCount }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-3 hover:shadow-lg transition"
    >
        <Link to={`/category/${slug}`} className="flex flex-col items-center">
            {icon}
            <h3 className="text-textColor text-lg font-semibold mt-2">{name}</h3>
            <span className="text-sm text-gray-500">{productCount} Products</span>
        </Link>
    </motion.div>
);

const CategoriesPage = () => {
    return (
        <div className="bg-background min-h-screen py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-textColor mb-8 text-center">Shop by Category</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((cat, idx) => (
                        <CategoryCard key={idx} {...cat} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoriesPage;