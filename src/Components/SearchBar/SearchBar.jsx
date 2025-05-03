import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

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

export default SearchBar;