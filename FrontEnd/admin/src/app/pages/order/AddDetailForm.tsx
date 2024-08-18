import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckoutDetailDTO } from '../../model/CheckoutDetailDTO';

const BASE_URL = 'http://localhost:8080/api/checkoutdt';

interface AddDetailFormProps {
    onSave: (detail: CheckoutDetailDTO) => void;
    detail?: CheckoutDetailDTO | null;
    onClose: () => void;
  }
  
  const AddDetailForm: React.FC<AddDetailFormProps> = ({ onSave, detail, onClose }) => {
    const [categories, setCategories] = useState<any[]>([]);
    const [books, setBooks] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState(detail?.categoryId || '');
    const [selectedBook, setSelectedBook] = useState(detail?.bookId || '');
    const [quantity, setQuantity] = useState(detail?.quantity || 1);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [errors, setErrors] = useState({ category: '', book: '', quantity: '' });
  
    useEffect(() => {
      fetchCategories();
    }, []);
  
    useEffect(() => {
      if (selectedCategory) {
        fetchBooks(String(selectedCategory));
      }
    }, [selectedCategory]);
  
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };
  
    const fetchBooks = async (categoryId: string) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/books`, {
          params: { categoryId },
        });
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books', error);
      }
    };
  
    const validateForm = () => {
      let valid = true;
      let errors = { category: '', book: '', quantity: '' };
  
      if (!selectedCategory) {
        errors.category = 'Please select a category';
        valid = false;
      }
  
      if (!selectedBook) {
        errors.book = 'Please select a book';
        valid = false;
      }
  
      if (!quantity || quantity <= 0) {
        errors.quantity = 'Quantity must be greater than zero';
        valid = false;
      }
  
      setErrors(errors);
      return valid;
    };
  
    const handleSave = () => {
      if (validateForm()) {
        setConfirmVisible(true);
      }
    };

  const handleConfirm = () => {
    const newDetail: CheckoutDetailDTO = {
      id: detail?.id || 0,
      bookId: Number(selectedBook),
      bookTitle: books.find(book => book.id === Number(selectedBook))?.title || '',
      categoryId: Number(selectedCategory),
      categoryName: categories.find(category => category.id === Number(selectedCategory))?.name || '',
      quantity,
      checkoutId: detail?.checkoutId || 0,
    };

    onSave(newDetail);
    setConfirmVisible(false);
    onClose();
  };

  return (
    <div className="container mt-4">
      <h3>{detail ? 'Edit Book' : 'Add New Book'}</h3>
      <form>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-control"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(parseInt(e.target.value, 10))}
          >
            <option value={0}>Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          {errors.category && <div className="text-danger">{errors.category}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Book</label>
          <select
            className="form-control"
            value={selectedBook}
            onChange={(e) => setSelectedBook(parseInt(e.target.value, 10))}
          >
            <option value={0}>Select Book</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>{book.title}</option>
            ))}
          </select>
          {errors.book && <div className="text-danger">{errors.book}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          />
          {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>

      {confirmVisible && (
        <div className="mt-4">
          <h5>Confirm your action</h5>
          <button
            className="btn btn-success"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className="btn btn-danger ms-2"
            onClick={() => setConfirmVisible(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AddDetailForm;
