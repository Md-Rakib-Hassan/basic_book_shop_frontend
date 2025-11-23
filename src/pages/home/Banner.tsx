import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import { useGetBookQuery } from '../../redux/features/books/bookApi';
import { Link } from 'react-router';


const Banner = () => {

  const { currentData, isLoading, isError, error } = useGetBookQuery(undefined);
  if (isLoading) {
    return <div></div>;
  }
  
    return (
      <div>
        <div>
          
        </div>
             <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="h-[450px] banner"
            >
                
                    {
                      currentData?.data.map(book => (
                        <SwiperSlide key={`slide-${book._id}`}>
                            <div
                            className="h-full pl-10 flex md:items-center md:justify-start  relative z-0 "
                            style={{
                              backgroundImage: `url(${book?.ImageUrl})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                            >
                            <div
                              className="absolute inset-0"
                              style={{
                              backdropFilter: 'blur(100px)',
                              zIndex: 1,
                              }}
                            ></div>
                            <div className="h-full w-[85%]  mx-auto z-10    flex items-center flex-col md:flex-row my-auto pt-8 md:pt-0">
                            <img 
                              src={book?.ImageUrl} 
                              className='md:h-3/4 h-1/2 shadow-[0px_0px_50px_rgba(0,0,0,1)]' 
                              style={{ filter: 'brightness(1.2)' }} 
                              />                              <div className='pl-8 text-white flex flex-col md:gap-2 gap-1'>
                                <h1 className='md:text-3xl text-xl font-bold '>{book?.Title}</h1>
                                <p className='md:text-lg text-base '>৳ {book?.Price}</p> 
                                <p className='md:text-lg text-base'>Author: {book?.Author}</p>
                                <Link to={`/books/${book._id}`} className='bg-white p-2 text-black rounded-3xl px-6 w-fit shadow-lg' >View Details</Link>
                              </div>
                            </div>
                            </div>
                        </SwiperSlide>
                      ))
                    }
                    
        
        
      </Swiper>
            
        </div>
    );
};

export default Banner;