import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { FiShoppingCart } from 'react-icons/fi';
const ProductCard = ({ product }) => (
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-accent text-white font-medium px-4 py-2 rounded-xl shadow-md hover:bg-blue-800 transition mt-3"
        >
            <FiShoppingCart className="text-xl" />
            Add to Cart
        </motion.button>
    </motion.div>
);

export default ProductCard;