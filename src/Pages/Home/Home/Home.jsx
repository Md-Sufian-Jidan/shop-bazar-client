import React from 'react';
import Hero from '../Hero/Hero';
import Categories from '../Categories/Categories';
import FeaturedProducts from '../FeaturedProduct/FeaturedProduct';
import CustomerTestimonials from '../CustomerTestimonials/CustomerTestimonials';
import NewsletterSignup from '../NewsLetterSignUp/NewsLetterSignUp';

const Home = () => {
    return (
        <div>
            <Hero />
            <Categories />
            <FeaturedProducts />
            <CustomerTestimonials />
            <NewsletterSignup />
        </div>
    );
};

export default Home;