import React, { useState } from "react";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = ["Shop", "Categories", "About", "Login"];

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to={'/'} className="text-2xl font-bold text-primary flex items-center gap-2">
          <FiShoppingCart className="text-primary text-2xl" />
          <span>ShobBazaar</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {links.map((link) => (
            <a
              key={link}
              href={`/${link.toLowerCase().replace(" ", "")}`}
              className="text-gray-800 hover:text-primary font-medium transition"
            >
              {link}
            </a>
          ))}

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Cart Icon */}
          <div className="relative">
            <FiShoppingCart className="text-2xl text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white px-4 pb-4"
          >
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link}
                  href={`/${link.toLowerCase().replace(" ", "")}`}
                  className="text-gray-700 hover:text-primary font-medium"
                >
                  {link}
                </a>
              ))}
              <div className="flex items-center gap-2 mt-2">
                <FiShoppingCart className="text-xl text-gray-700" />
                <span className="text-sm">Cart (2)</span>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
