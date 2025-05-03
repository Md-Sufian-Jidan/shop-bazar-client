import React from 'react';
import Hero from '../Hero/Hero';
import Categories from '../Categories/Categories';
import FeaturedProducts from '../FeaturedProduct/FeaturedProduct';
import CustomerTestimonials from '../CustomerTestimonials/CustomerTestimonials';

const Home = () => {
    return (
        <div>
            <Hero />
            <Categories />
            <FeaturedProducts />
            <CustomerTestimonials />
        </div>
    );
};

export default Home;