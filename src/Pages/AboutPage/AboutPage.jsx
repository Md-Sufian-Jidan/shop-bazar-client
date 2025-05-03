import React from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
    { name: 'John Doe', role: 'CEO & Founder', photo: '/path/to/photo1.jpg' },
    { name: 'Jane Smith', role: 'Marketing Manager', photo: '/path/to/photo2.jpg' },
    { name: 'Ali Khan', role: 'Lead Developer', photo: '/path/to/photo3.jpg' },
];

const AboutPage = () => {
    return (
        <div className="bg-background min-h-screen py-10 px-4">
            {/* Hero Section */}
            <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold text-textColor mb-4">About ShobBazaar</h1>
                <p className="text-lg text-gray-600">
                    ShobBazaar is your go-to online marketplace where you can find everything you need, all under one roof.
                </p>
            </motion.div>

            {/* Our Mission Section */}
            <motion.div
                className="max-w-7xl mx-auto mb-16 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-semibold text-textColor mb-4">Our Mission</h2>
                <p className="text-lg text-gray-600">
                    Our mission is to provide an easy, convenient, and secure online shopping experience for our customers in Bangladesh. We aim to offer a wide variety of products at affordable prices, delivered right to your doorstep.
                </p>
            </motion.div>

            {/* Our Values Section */}
            <motion.div
                className="max-w-7xl mx-auto mb-16 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-semibold text-textColor mb-4">Our Values</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl text-textColor font-semibold mb-2">Customer Satisfaction</h3>
                        <p className="text-gray-600">We always put the customer first and strive to provide exceptional service and quality products.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl text-textColor font-semibold mb-2">Quality Assurance</h3>
                        <p className="text-gray-600">Our products go through a rigorous quality check to ensure that they meet your expectations every time.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl text-textColor font-semibold mb-2">Integrity</h3>
                        <p className="text-gray-600">We are committed to providing honest, transparent, and reliable service to every customer.</p>
                    </div>
                </div>
            </motion.div>

            {/* Why Choose Us Section */}
            <motion.div
                className="max-w-7xl mx-auto mb-16 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-semibold text-textColor mb-4">Why Choose Us</h2>
                <ul className="list-disc pl-5 text-lg text-gray-600">
                    <li>Wide selection of products</li>
                    <li>Competitive prices and discounts</li>
                    <li>Fast and reliable delivery</li>
                    <li>Excellent customer service</li>
                </ul>
            </motion.div>

            {/* Meet the Team Section */}
            <motion.div
                className="max-w-7xl mx-auto mb-16 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-semibold text-textColor mb-4">Meet the Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-lg shadow-md text-center">
                            <img src={member.photo} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-textColor">{member.name}</h3>
                            <p className="text-gray-600">{member.role}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Our Journey Section */}
            <motion.div
                className="max-w-7xl mx-auto mb-16 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-semibold text-textColor mb-4">Our Journey</h2>
                <p className="text-lg text-gray-600">
                    ShobBazaar started in 2020 with a vision to revolutionize online shopping in Bangladesh. Since then, we’ve grown exponentially, offering a variety of products across multiple categories to meet the diverse needs of our customers.
                </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <a href="/shop" className="bg-accent text-white py-3 px-6 rounded-lg text-xl font-semibold hover:bg-blue-700 transition">
                    Explore Products
                </a>
            </motion.div>
        </div>
    );
};

export default AboutPage;
