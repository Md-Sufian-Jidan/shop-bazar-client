import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';
import clsx from 'clsx';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useCart from '../../Hooks/useCart';


const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
];

const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.05 * i },
    }),
};

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const { count } = useCart();
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged out successfully.',
                    timer: 1500,
                    showConfirmButton: false,
                });
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: err.message,
                    timer: 1500,
                    showConfirmButton: false,
                });
            });
    };

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 70 }}
            className="bg-white shadow sticky top-0 z-50"
        >
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/" className="text-2xl font-bold text-[#F97316] flex items-center gap-2">
                        🛒 <span className="tracking-wide">ShobBazaar</span>
                    </Link>
                </motion.div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map(({ name, path }, i) => (
                        <motion.div
                            key={name}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={linkVariants}
                        >
                            <NavLink
                                to={path}
                                className={({ isActive }) =>
                                    clsx(
                                        'relative text-gray-800 font-medium transition hover:text-[#F97316]',
                                        isActive && 'text-[#F97316] font-semibold'
                                    )
                                }
                            >
                                {name}
                            </NavLink>
                        </motion.div>
                    ))}

                    {/* Dashboard / Login */}
                    <motion.div whileHover={{ scale: 1.05 }}>
                        {user ? (
                            <NavLink
                                to="/dashboard"
                                className="text-gray-800 font-medium hover:text-[#1D4ED8] transition"
                            >
                                Dashboard
                            </NavLink>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-[#F97316] text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
                            >
                                Login
                            </Link>
                        )}
                    </motion.div>

                    {/* Cart Icon */}
                    <Link to="/cart" className="relative text-gray-800 hover:text-[#F97316] transition">
                        <ShoppingCart size={24} />
                        <span className="absolute -top-2 -right-2 bg-[#10B981] text-white text-xs rounded-full px-1">
                            {count}
                        </span>
                    </Link>

                    {user && (
                        <motion.button
                            onClick={handleLogout}
                            whileHover={{ scale: 1.05 }}
                            className="bg-[#1D4ED8] text-white px-4 py-1.5 rounded-full hover:bg-blue-800 transition"
                        >
                            Logout
                        </motion.button>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-[#F97316]" onClick={toggleMenu}>
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-white shadow-inner"
                    >
                        <div className="flex flex-col px-6 pb-4 space-y-4">
                            {navLinks.map(({ name, path }, i) => (
                                <motion.div
                                    key={name}
                                    custom={i}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={linkVariants}
                                >
                                    <NavLink
                                        to={path}
                                        onClick={toggleMenu}
                                        className={({ isActive }) =>
                                            clsx(
                                                'text-gray-800 font-medium hover:text-[#F97316] transition',
                                                isActive && 'text-[#F97316] font-semibold'
                                            )
                                        }
                                    >
                                        {name}
                                    </NavLink>
                                </motion.div>
                            ))}

                            <Link
                                to="/cart"
                                onClick={toggleMenu}
                                className="flex items-center gap-2 text-gray-800 hover:text-[#F97316]"
                            >
                                <ShoppingCart size={20} /> Cart ({count})
                            </Link>

                            {user ? (
                                <>
                                    <NavLink
                                        to="/dashboard"
                                        onClick={toggleMenu}
                                        className="text-gray-800 font-medium hover:text-[#1D4ED8] transition"
                                    >
                                        Dashboard
                                    </NavLink>
                                    <button
                                        onClick={() => {
                                            toggleMenu();
                                            handleLogout();
                                        }}
                                        className="text-[#1D4ED8] hover:text-blue-800"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={toggleMenu}
                                    className="bg-[#F97316] text-white px-4 py-2 rounded-full block text-center"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;