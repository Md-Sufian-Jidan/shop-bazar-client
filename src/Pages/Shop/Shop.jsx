import { useState, } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../../Components/ProductCard/ProductCard';
import SearchBar from '../../Components/SearchBar/SearchBar';
import FilterSidebar from './FilterSidebar';

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
                        <FilterSidebar categories={categories} filters={filters} setFilters={setFilters} />
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
                            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-800 transition"
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