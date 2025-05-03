import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiStar } from 'react-icons/fi';

const productData = [
    {
        id: 1,
        name: 'Samsung Galaxy A14',
        price: 18000,
        category: 'Mobile Phones',
        rating: 4,
        image: 'https://images.samsung.com/is/image/samsung/p6pim/bd/galaxy-a14/gallery/bd-galaxy-a14-5g-sm-a146bzkgxme-thumb-535845946?$344_344_PNG$'
    },
    {
        id: 2,
        name: 'Fresh Atta 2kg',
        price: 120,
        category: 'Grocery',
        rating: 5,
        image: 'https://chaldn.com/_mpimage/fresh-atta-2-kg.jpg'
    },
    {
        id: 3,
        name: 'Panasonic Rice Cooker',
        price: 3200,
        category: 'Kitchen',
        rating: 4,
        image: 'https://www.panasonic.com/content/dam/pim/bd/en/rice_cooker/sr/sr-wa22hn/ws10008445.jpg'
    },
    // Add 17 more fake products here with different categories, prices, and images...
];

const categories = [...new Set(productData.map(p => p.category))];

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
    </motion.div>
);

const FilterSidebar = ({ filters, setFilters }) => (
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

const SearchBar = ({ query, setQuery }) => {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (query.length > 1) {
            const matches = productData
                .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
                .map(p => p.name);
            setSuggestions(matches);
        } else {
            setSuggestions([]);
        }
    }, [query]);

    return (
        <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white">
                <FiSearch className="text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full focus:outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            {suggestions.length > 0 && (
                <ul className="absolute bg-white border rounded-md w-full mt-1 z-10 shadow">
                    {suggestions.map((s, idx) => (
                        <li
                            key={idx}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => setQuery(s)}
                        >
                            {s}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const Shop = () => {
    const [filters, setFilters] = useState({ category: '', rating: 1, maxPrice: 99999 });
    const [query, setQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(8);

    const filteredProducts = productData.filter(p =>
        (!filters.category || p.category === filters.category) &&
        (!filters.maxPrice || p.price <= filters.maxPrice) &&
        p.rating >= filters.rating &&
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="bg-background min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <SearchBar query={query} setQuery={setQuery} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Filters Sidebar */}
                    <div className="md:col-span-1">
                        <FilterSidebar filters={filters} setFilters={setFilters} />
                    </div>
                    {/* Product Grid */}
                    <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.slice(0, visibleCount).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                        {
                            filteredProducts.length === 0 && (
                                <p className='md:col-span-4 text-xl text-center font-semibold'>No Data Found</p>
                            )
                        }
                    </div>
                </div>
                {visibleCount < filteredProducts.length && (
                    <div className="text-center mt-8">
                        <button
                            onClick={() => setVisibleCount(prev => prev + 8)}
                            className="bg-accent text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;