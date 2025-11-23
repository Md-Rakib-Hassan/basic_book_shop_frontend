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
import { Link } from 'react-router';
interface IBookSwiper{
    title: string;
    types: "books" | "freebook" | "academic";
    data: IBook[];

}
const BookSwiper:FC<IBookSwiper> = ({title,types,data:books}) => {
    
    
    
    return (
        <div className='mt-6'>
            <div className='flex items-center justify-between py-6'>
                <p className='font-semibold'>{title}</p>
                <Link to={`/${types}`} className='flex items-center gap-2'>
                <p className='font-medium text-primary text-sm'>View All</p>
                    </Link>
            </div>
            <div>
                <Swiper
                    breakpoints={{
                        360: {
                            slidesPerView: 1,
                        },
                        480: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1270: {
                            slidesPerView: 4,
                        },
                        1281: {
                            slidesPerView: 5,
                        }
                    }}
                    
                        spaceBetween={5}
                        navigation={true}
                        modules={[Navigation]}
                        className="bookSwiper "
                >
                    {books?.map((book:IBook)=><SwiperSlide className='h-auto'  ><div className='h-full'><BookCard book={book}  key={book._id}></BookCard></div></SwiperSlide>)}
            
                </Swiper>
            </div>

            
           
        </div>
    );
};

export default BookSwiper;