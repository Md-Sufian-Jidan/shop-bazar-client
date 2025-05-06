import { useState, } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../../Components/ProductCard/ProductCard';
import SearchBar from '../../Components/SearchBar/SearchBar';
import FilterSidebar from './FilterSidebar';
import useProducts from '../../Hooks/useProducts';

const Shop = () => {
    const { products, isLoading, error } = useProducts();
    const categories = [...new Set(products.map(p => p.category))];

    const [filters, setFilters] = useState({ category: '', rating: 1, maxPrice: 99999 });
    const [query, setQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(8);

    const filteredProducts = products.filter(p =>
        (!filters.category || p.category === filters.category) &&
        (!filters.maxPrice || p.price <= filters.maxPrice) &&
        p.rating >= filters.rating &&
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    if (isLoading) return <p className="text-center">Loading products...</p>;
    if (error) return <p className="text-center text-red-500">Failed to load products.</p>;

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