import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useCart from '../../Hooks/useCart';

const Cart = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { cart, isLoading } = useCart();

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return await axiosSecure.delete(`/cart/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
            Swal.fire({ icon: 'success', title: 'Item removed', timer: 1200, showConfirmButton: false });
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    }

    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (isLoading) return <p className="text-center py-10">Loading...</p>;

    if (cart.length === 0) {
        return (
            <div className="text-center py-20">
                <img src="https://i.ibb.co/0j1Q8vB/empty-cart.png" alt="Empty Cart" className="mx-auto w-48 mb-6" />
                <p className="text-gray-600 text-lg">Your cart is empty</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart List */}
            <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                    {cart.map((item) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white p-4 rounded-md shadow flex items-center gap-4"
                        >
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold">{item.name}</h4>
                                <p className="text-sm text-gray-600">৳{item.price.toFixed(2)}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="text-gray-700">Qty:</span>
                                    <input
                                        type="number"
                                        min="1"
                                        defaultValue={item.quantity}
                                        className="w-16 px-2 py-1 border rounded"
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="text-md font-semibold">৳{(item.price * item.quantity).toFixed(2)}</p>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="text-red-500 text-sm mt-1 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Cart Summary */}
            <div className="bg-white p-6 rounded-md shadow h-fit">
                <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                <p className="text-gray-700 mb-2">Total Items: {cart.length}</p>
                <p className="text-lg font-semibold mb-4">Total: ৳{totalAmount.toFixed(2)}</p>
                <button className="w-full bg-[#F97316] text-white py-2 rounded hover:bg-orange-600 transition">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;