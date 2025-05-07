import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { FiShoppingCart } from 'react-icons/fi';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useCart from '../../Hooks/useCart';
const ProductCard = ({ product }) => {
    const { refetch } = useCart()
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const handleAddToCart = async () => {
        if (!user) {
            Swal.fire("Please login to add items to cart.");
            return;
        }

        const cartItem = {
            productId: product._id,
            userEmail: user.email,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
        };

        try {
            const res = await axiosSecure.post('/cart', cartItem);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Added to Cart!',
                    text: `${product.name} has been added to your cart.`,
                    timer: 1500,
                    showConfirmButton: false,
                });
                refetch();
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error adding to cart',
                text: err.message,
            });
        }
    };

    return (
        <motion.div
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.03 }}
        >
            <img src={product.image} alt={product.name} className="h-40 w-full object-contain mb-3" />
            <h3 className="text-textColor font-semibold">{product.name}</h3>
            <p className="text-primary font-bold">৳{product.price}</p>
            <div className="flex items-center text-yellow-500">
                {Array(5).fill(0).map((_, i) => (
                    <FiStar key={i} className={i < product.rating ? 'fill-current' : 'opacity-30'} />
                ))}
            </div>
            <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 bg-accent text-white font-medium px-4 py-2 rounded-xl shadow-md hover:bg-blue-800 transition mt-3"
            >
                <FiShoppingCart className="text-xl" />
                Add to Cart
            </motion.button>

        </motion.div>
    )
};

export default ProductCard;