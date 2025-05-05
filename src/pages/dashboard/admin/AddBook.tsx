import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Category } from '../../../types';
import { mockAuthors } from '../../../utils/mockData';
import useImageUpload from '../../../hooks/useImageUpload';
import { useAddBookMutation } from '../../../redux/features/books/bookApi';


const AddBook: React.FC = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const { uploadImage, isUploading } = useImageUpload();
  const [addBook,{isLoading,isError}] = useAddBookMutation();
  const [formData, setFormData] = useState({
    Title: '',
    ISBN: '',
    Author: '',
    Category: Category.Fiction,
    Price: '',
    StockQuantity: '',
    PublishedYear: '',
    Description: '',
    ImageUrl: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    let uploadedImageUrl = "";

    if (image) {
      uploadedImageUrl = await uploadImage(image);
    }
    // Convert numeric fields
    const numericFormData = {
      ...formData,
      Price: parseFloat(formData.Price),
      ImageUrl: uploadedImageUrl,
      StockQuantity: parseInt(formData.StockQuantity, 10),
      PublishedYear: parseInt(formData.PublishedYear, 10),
    };
    const result = await addBook(numericFormData).unwrap();
    if (isError) {
      toast.error('Failed to add book. Please try again.');
      return;
    }
    if (isLoading) {
      toast.loading('Adding book...');
    }
    if (result) {
      toast.success('Book added successfully!');
    } else {
      toast.error('Failed to add book. Please try again.');
    }
    // Log the data as requested
    console.log('Add book form submitted with data:', numericFormData);
    
    // Show success toast
    toast.success('Book added successfully!');
    
    // Navigate back to books list
    navigate('/dashboard/books');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
      <Link to="/dashboard/books" className="mr-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray`-500 hover:text-primary-600 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </motion.button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Book</h1>
          <p className="mt-1 text-sm text-gray-500">Add a new book to your inventory</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="Title" className="form-label">Title</label>
            <input
              type="text"
              id="Title"
              name="Title"
              value={formData.Title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ISBN" className="form-label">ISBN</label>
            <input
              type="text"
              id="ISBN"
              name="ISBN"
              value={formData.ISBN}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Author" className="form-label">Author</label>
            <input
              type="text"
              id="Author"
              name="Author"
              value={formData.Author}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Category" className="form-label">Category</label>
            <select
              id="Category"
              name="Category"
              value={formData.Category}
              onChange={handleChange}
              className="form-input"
              required
            >
              {Object.values(Category).map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="Price" className="form-label">Price</label>
            <input
              type="number"
              id="Price"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="StockQuantity" className="form-label">Stock Quantity</label>
            <input
              type="number"
              id="StockQuantity"
              name="StockQuantity"
              value={formData.StockQuantity}
              onChange={handleChange}
              min="0"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="PublishedYear" className="form-label">Published Year</label>
            <input
              type="number"
              id="PublishedYear"
              name="PublishedYear"
              value={formData.PublishedYear}
              onChange={handleChange}
              min="1000"
              max={new Date().getFullYear()}
              className="form-input"
              required
            />
          </div>

            <div className="form-group">
            <label htmlFor="ImageFile" className="form-label">Image File</label>
            <input
              type="file"
              id="ImageFile"
              name="ImageFile"
              accept="image/*"
              onChange={handleImageChange}
              className="form-input"
              required
            />
            </div>
        </div>

        <div className="form-group">
          <label htmlFor="Description" className="form-label">Description</label>
          <textarea
            id="Description"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            rows={4}
            className="form-input"
            required
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4">
          <Link to="/dashboard/books">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="btn btn-secondary"
            >
              Cancel
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn btn-primary"
          >
            Add Book
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;