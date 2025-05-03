import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <motion.div
                className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                {/* About */}
                <div>
                    <h3 className="text-xl font-semibold text-primary mb-4">ShobBazaar</h3>
                    <p className="text-gray-300 text-sm">
                        সবকিছু এক ছাদের নিচে – your one-stop shop for electronics, groceries,
                        fashion, and more. Trusted by thousands across Bangladesh.
                    </p>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-lg font-semibold text-primary mb-3">Contact</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                        <li>Email: support@shobbazaar.com</li>
                        <li>Phone: +880 1234 567 890</li>
                        <li>Address: Dhaka, Bangladesh</li>
                    </ul>
                </div>

                {/* Terms & Links */}
                <div>
                    <h4 className="text-lg font-semibold text-primary mb-3">Quick Links</h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                        <li><a href="/about" className="hover:text-primary">About Us</a></li>
                        <li><a href="/terms" className="hover:text-primary">Terms & Conditions</a></li>
                        <li><a href="/privacy" className="hover:text-primary">Privacy Policy</a></li>
                        <li><a href="/contact" className="hover:text-primary">Contact Us</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h4 className="text-lg font-semibold text-primary mb-3">Follow Us</h4>
                    <div className="flex gap-4 text-2xl text-white">
                        <a href="#" className="hover:text-primary"><FaFacebookF /></a>
                        <a href="#" className="hover:text-primary"><FaInstagram /></a>
                        <a href="#" className="hover:text-primary"><FaTwitter /></a>
                        <a href="#" className="hover:text-primary"><FaYoutube /></a>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Bar */}
            <div className="bg-gray-900 text-center text-gray-400 text-sm py-4">
                © {new Date().getFullYear()} ShobBazaar. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
