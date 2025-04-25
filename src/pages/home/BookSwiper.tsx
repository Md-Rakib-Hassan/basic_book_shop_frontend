import React, { FC } from 'react';
import BookCard from '../../components/BookCard';
import { IBook } from '../../types/book';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './css/SwiperCustom.css'

// import required modules
import {Navigation } from 'swiper/modules';
interface IBookSwiper{
    title: string;
    types: "bestSeller" | "topRated" | "limitedOffer";
    data: IBook[];

}
const BookSwiper:FC<IBookSwiper> = ({title,types,data:books}) => {
    
    
    return (
        <div className='mt-6'>
            <div className='flex items-center justify-between py-6'>
                <p className='font-semibold'>{title }</p>
                <p className='font-medium text-primary text-sm'>View All</p>
            </div>
            <div>
                <Swiper
                    breakpoints={{
                        360: {
                            slidesPerView: 2,
                        },
                        480: {
                            slidesPerView: 2,
                        },
                        640: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                        1024: {
                            slidesPerView: 6,
                        },
                        1280: {
                            slidesPerView: 6,
                        }
                    }}
                    
                        spaceBetween={5}
                        navigation={true}
                        modules={[Navigation]}
                        className="bookSwiper "
                >
                    {books.map((book:IBook)=><SwiperSlide ><BookCard book={book} types={types} key={book._id}></BookCard></SwiperSlide>)}
            
                </Swiper>
            </div>

            
           
        </div>
    );
};

export default BookSwiper;