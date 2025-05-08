import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";

const CartItems = () => {
    const { cart } = useCart();
    const [cartItems, setCartItems] = useState(cart);
    const axiosSecure = useAxiosSecure();

    const handleRemove = async (id) => {
        try {
            await axiosSecure.delete(`/cart/${id}`);
            setCartItems((prev) => prev.filter((item) => item._id !== id));
            Swal.fire("Removed!", "Item has been removed.", "success");
        } catch (err) {
            Swal.fire("Error!", "Failed to remove item.", "error");
        }
    };

    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-5xl mx-auto p-4 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">🛒 Your Cart</h2>

            {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-16 text-xl">
                    Your cart is empty 🛍️
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <motion.div
                                key={item._id}
                                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold">{item.name}</h4>
                                        <p className="text-gray-500">
                                            Quantity: {item.quantity} | Price: ৳{item.price}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemove(item._id)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Remove item"
                                >
                                    <FaTrashAlt />
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Total and Checkout */}
                    <div className="mt-6 text-right">
                        <h3 className="text-xl font-semibold text-gray-800">
                            Total: ৳{total.toFixed(2)}
                        </h3>
                        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartItems;