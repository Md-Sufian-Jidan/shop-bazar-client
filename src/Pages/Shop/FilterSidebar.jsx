import { motion } from 'framer-motion';

const FilterSidebar = ({ filters, setFilters , categories}) => (
    <motion.div
        className="bg-white p-4 rounded-xl shadow space-y-4"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <div>
            <label className="block text-textColor font-medium mb-1">Category</label>
            <select
                className="w-full border border-gray-300 rounded-md p-2"
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            >
                <option value="">All</option>
                {categories.map(cat => <option key={cat}>{cat}</option>)}
            </select>
        </div>
        <div>
            <label className="block text-textColor font-medium mb-1">Minimum Rating</label>
            <select
                className="w-full border border-gray-300 rounded-md p-2"
                value={filters.rating}
                onChange={(e) => setFilters(prev => ({ ...prev, rating: Number(e.target.value) }))}
            >
                {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} Stars & Up</option>)}
            </select>
        </div>
        <div>
            <label className="block text-textColor font-medium mb-1">Price Below (৳)</label>
            <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
            />
        </div>
    </motion.div>
);

export default FilterSidebar;