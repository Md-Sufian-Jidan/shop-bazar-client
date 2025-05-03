import React from 'react';
import Hero from '../Hero/Hero';
import Categories from '../Categories/Categories';
import FeaturedProducts from '../FeaturedProduct/FeaturedProduct';

const Home = () => {
    return (
        <div>
            <Hero />
            <Categories />
            <FeaturedProducts />
        </div>
    );
};

export default Home;