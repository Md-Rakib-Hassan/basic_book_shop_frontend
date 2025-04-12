import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import 'swiper/css/grid'


const Testimonial = () => {


 

    return (
        <div className='mt-10 px-2 bg-gray-100'>

<h1 className='text-center font-bold  md:text-2xl text-xl pt-8 pb-4 '>Testimonials</h1>
            <p className='text-center lg:w-2/3 mx-auto mb-4 text-justify '>Our customers love sharing their experiences with our bookshop. From discovering rare literary treasures to enjoying seamless delivery services, their feedback highlights our commitment to providing exceptional service. Explore what our happy readers have to say about their journey with us.</p>

            <Swiper 
            
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
                breakpoints={
                    {
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10,

                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20,

                        },
                        1024:{
                            slidesPerView: 4,
                            spaceBetween: 20,

                        }

                    }
                }
            >
{/* 
                {reviews.map(review => <SwiperSlide className='my-8' key={review._id}><Review info={review}></Review></SwiperSlide>)} */}

            </Swiper>

        </div >
    );
};

export default Testimonial;