import { useState, useEffect } from 'react';
import axios from 'axios';

import Books from './Books.jsx';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    try {
      const response = await axios.get('/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  async function deleteBook(id) {
    try {
      await axios.delete(`http://localhost:3000/books/${id}`);
      setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  }

  async function addBook(book) {
    try {
      const response = await axios.post('http://localhost:3000/books', book);
      const newBook = response.data;
      setBooks(prevBooks => [...prevBooks, newBook]);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  }

  return (
    <>
      <Books handleAddBook={addBook} handleDelete={deleteBook} books={books} />
    </>
  );
}

export default App;
