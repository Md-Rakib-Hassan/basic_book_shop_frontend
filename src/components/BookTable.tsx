import React from 'react';
import { SpecificBookApiResponse } from '../types';

type TBookProps = {
    bookDetails: SpecificBookApiResponse
}

const BookTable = (props: TBookProps) => {
    const { bookDetails } = props;
    const { Title, Author,  Category,  StockQuantity, ISBN, PublishedYear } = bookDetails?.data ?? {};
    const tdClass = "px-4 py-2 border border-gray-100 w-[70%]";
    const thClass = "px-6 py-2 w-fit  border border-gray-100 font-semibold bg-gray-50";
    return (
        <div className='mt-10 text-gray-500'>
            <table className='border-collapse w-full text-left border border-gray-100  overflow-hidden'>
                
                <tbody>
                    <tr className="hover:bg-gray-50">
                        <th className={`${thClass} `}>Book Title</th>
                        <td className={`${tdClass}`}>{Title}</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                        <th className={`${thClass}`}>Author</th>
                        <td className={`${tdClass}`}>{Author}</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                        <th className={`${thClass}`}>ISBN</th>
                        <td className={`${tdClass}`}>{ISBN}</td>
                    </tr>
                    
                    <tr className="hover:bg-gray-50">
                        <th className={`${thClass}`}>Category</th>
                        <td className={`${tdClass}`}>{Category}</td>
                    </tr>
                    
                    <tr className="hover:bg-gray-50">
                        <th className={`${thClass}`}>Stock Quantity</th>
                        <td className={`${tdClass}`}>{StockQuantity}</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                        <th className={`${thClass}`}>Published Year</th>
                        <td className={`${tdClass}`}>{PublishedYear}</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    );
};

export default BookTable;