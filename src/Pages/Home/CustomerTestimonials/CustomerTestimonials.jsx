import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

// Swiper core
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const CustomerTestimonials = () => {
    const axiosPublic = useAxiosPublic();

    const { data: testimonials = [], isLoading, error } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const res = await axiosPublic.get('/testimonials');
            return res.data;
        },
    });

    return (
        <section className="bg-white py-12 px-4 md:px-8">
            <h2 className="text-3xl font-bold text-textColor text-center mb-10">
                What Our Customers Say
            </h2>

            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={20}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={testimonial.id}>
                        <motion.div
                            className="bg-background rounded-xl shadow p-6 flex flex-col items-center text-center h-full"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src={testimonial.photo}
                                alt={testimonial.name}
                                className="w-20 h-20 rounded-full mb-4 object-cover"
                            />
                            <h3 className="text-xl font-semibold text-textColor mb-1">
                                {testimonial.name}
                            </h3>
                            <div className="flex justify-center mb-3 text-primary">
                                {Array(testimonial.rating)
                                    .fill()
                                    .map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                            </div>
                            <p className="text-gray-600 text-sm">{testimonial.message}</p>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default CustomerTestimonials;
