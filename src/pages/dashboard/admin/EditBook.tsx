import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ArrowLeft, Pencil } from 'lucide-react';
import { SpecificBookApiResponse } from '../../../types';
import LoadingPage from '../../LoadingPage';
import { useGetSpecificBookQuery, useUpdateBookMutation } from '../../../redux/features/books/bookApi';
import { useFullUser } from '../../../redux/hooks/useUserByEmail';

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoading, currentData } = useGetSpecificBookQuery(id);
  const [updateBook] = useUpdateBookMutation();
  const user = useFullUser();
  const apiResponse = currentData as SpecificBookApiResponse;

  const [formData, setFormData] = useState({
    Title: '',
    ISBN: '',
    Author: '',
    Price: '',
    StockQuantity: '',
    PublishedYear: '',
    Description: ''
  });

  const [editableFields, setEditableFields] = useState<{ [key: string]: boolean }>({});
  const [editedFields, setEditedFields] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (apiResponse?.data) {
      const {
        Title,
        ISBN,
        Author,
        Price,
        StockQuantity,
        PublishedYear,
        Description
      } = apiResponse.data;

      setFormData({
        Title,
        ISBN,
        Author,
        Price: Price.toString(),
        StockQuantity: StockQuantity.toString(),
        PublishedYear: PublishedYear.toString(),
        Description
      });

      setEditableFields({
        Title: false,
        ISBN: false,
        Author: false,
        Price: false,
        StockQuantity: false,
        PublishedYear: false,
        Description: false
      });
    }
  }, [apiResponse]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setEditedFields(prev => ({ ...prev, [name]: true }));
  };

  const handleEnableField = (field: string) => {
    setEditableFields(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const updatedData: any = {};

    Object.entries(editedFields).forEach(([field, wasEdited]) => {
      if (wasEdited) {
        if (['Price', 'StockQuantity', 'PublishedYear'].includes(field)) {
          updatedData[field] = Number(formData[field]);
        } else {
          updatedData[field] = formData[field];
        }
      }
    });

    console.log('Submitting only edited fields:', updatedData);
    try {
      toast.loading('Updating book...');
      const res = await updateBook({ id, ...updatedData }).unwrap();
      toast.dismiss(); // dismiss loading toast
      toast.success('Book updated successfully!');
      navigate(`/dashboard/${user?.user?.UserType}/books`);
      console.log(res);
    }
    catch (err) {
      toast.dismiss(); // dismiss loading toast
      const errorMessage = isError ? 'Failed to update book. Please try again.' : 'Book updated successfully!';
      toast.error(errorMessage);
      console.error('Update book error:', err);
      return;
    }
    
  
  };

  if (isLoading) return <LoadingPage />;

  const renderField = (label: string, name: string, type = 'text') => (
    <div className="form-group">
      <label htmlFor={name} className="form-label">{label}</label>
      <div className="flex items-center">
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name as keyof typeof formData]}
          onChange={handleChange}
          className={`form-input flex-1 ${
            editableFields[name] ? 'border-gray-300' : 'bg-gray-300 cursor-not-allowed'}`}
          disabled={!editableFields[name]}
        />
        {!editableFields[name] && (
          <button
            type="button"
            onClick={() => handleEnableField(name)}
            className="ml-2 text-gray-500 hover:text-primary-600"
          >
            <Pencil size={16} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link to={`/dashboard/${user?.user?.UserType}/books`} className="mr-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-500 hover:text-primary-600 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </motion.button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Book</h1>
          <p className="mt-1 text-sm text-gray-500">Update book information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField('Title', 'Title')}
          {renderField('ISBN', 'ISBN')}
          {renderField('Author', 'Author')}
          {renderField('Price', 'Price', 'number')}
          {renderField('Stock Quantity', 'StockQuantity', 'number')}
          {renderField('Published Year', 'PublishedYear', 'number')}
        </div>

        <div className="form-group">
          <label htmlFor="Description" className="form-label">Description</label>
          <div className="flex items-center">
            <textarea
              id="Description"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              rows={4}
              className={`form-input flex-1 ${
            editableFields.Description ? 'border-gray-300' : 'bg-gray-300 cursor-not-allowed'}`}
              disabled={!editableFields.Description}
            />
            {!editableFields.Description && (
              <button
                type="button"
                onClick={() => handleEnableField('Description')}
                className="ml-2 text-gray-500 hover:text-primary-600"
              >
                <Pencil size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Link to={`/dashboard/${user?.user?.UserType}/books`}>
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
            Update Book
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
