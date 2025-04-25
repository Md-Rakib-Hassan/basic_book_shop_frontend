import React, { useState } from 'react';
import LoadingPage from './LoadingPage';
import { useGetBookQuery } from '../redux/features/books/bookApi';
import BookCard from '../components/BookCard';

const Books = () => {
    const [params, setParams] = useState([]);
    const { isLoading, currentData } = useGetBookQuery(params);
    if (isLoading) return <LoadingPage></LoadingPage>

    return (
        <div className='flex mt-4'>
            <div className='h-screen pl-12'>

                <p>Shop By Category</p>
                <div>
                    <div className='flex flex-col gap-2 text-gray-400 pl-4 py-2'>
                        <p className='cursor-pointer' onClick={()=>setParams([{name:'searchTerm',value:'Fiction'}])}>Fiction</p>
                        <p className='cursor-pointer' onClick={()=>setParams([{name:'searchTerm',value:'Fantasy'}])}>Fantasy</p>
                        <p className='cursor-pointer' onClick={()=>setParams([{name:'searchTerm',value:'Horror'}])}>Horror</p>
                        <p className='cursor-pointer' onClick={()=>setParams([{name:'searchTerm',value:'Mystery'}])}>Mystery</p>
                        <p className='cursor-pointer' onClick={()=>setParams([{name:'searchTerm',value:'Biography'}])}>Biography</p>
                        <p className='cursor-pointer' onClick={()=>setParams([{name:'searchTerm',value:'Technology'}])}>Technology</p>
                    </div>
                </div>

            </div>
<div className='w-[80%] mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
                currentData?.data.map((book) => (
                    <BookCard book={book} types='topRated' ></BookCard>
                ))
            }
        </div>
        </div>
    );
};

export default Books;