import React from 'react';
import { motion } from "framer-motion";
import { GraduationCap } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Link } from 'react-router';
import { useGetAcademicBooksQuery } from '../../redux/features/books/bookApi';
const AcademicZoneBanner = () => {

  const {data:books,isLoading } = useGetAcademicBooksQuery(null);
  if (isLoading) return null;
  console.log(books);
    const academicBooks=books?.data || [];

    return (
      <section className="py-16 bg-gradient-to-r from-primary-200 to-primary-100 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <GraduationCap className="h-8 w-8" />
                <h2 className="text-4xl font-bold">Academic Zone</h2>
              </div>
              <p className="text-xl mb-6 opacity-90">
                📘 Find your textbooks, share with juniors, save money.
              </p>
              <p className="text-lg mb-8 opacity-80">
                Access thousands of academic books, connect with students, and build a sustainable learning community.
              </p>
              <Button variant="primary" size="lg" asChild>
                <Link to="/academic">Explore Academic Books</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-0"
            >
              {academicBooks.slice(0, 6).map((book, index) => (
                <Link to={`/books/${book._id}`} key={index} className="block">
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur rounded-lg p-4 "
                >
                  <img
                    src={book?.ImageUrl}
                    alt={book?.Title}
                    className="h-full w-32 object-cover rounded mb-2"
                  />
                  <h4 className="font-semibold text-sm line-clamp-2 flex-wrap w-36">{book?.Title}</h4>
                  <p className="text-xs opacity-75">{book?.Subject}</p>
                </motion.div>  
                
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    );
};

export default AcademicZoneBanner;