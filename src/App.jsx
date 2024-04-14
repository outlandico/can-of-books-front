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
      const response = await axios.get('https://can-of-books-backend-13lx.onrender.com/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  async function deleteBook(id) {
    try {
      await axios.delete(`https://can-of-books-backend-13lx.onrender.com/books/${id}`);
      setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  }

  async function addBook(book) {
    console.log(book);
    // try {
    const response = await axios.post('https://can-of-books-backend-13lx.onrender.com/books', book);
    const newBook = response.data;
    setBooks(prevBooks => [...prevBooks, newBook]);
    // } catch (error) {
    //   console.error('Error adding book:', error);
    // }
  }

  async function clearDatabase() {
    try {
      await axios.get('https://can-of-books-backend-13lx.onrender.com/books/nuke');
      // After clearing the database, fetch the updated list of books
      getBooks();
    } catch (error) {
      console.error('Error clearing database:', error);
    }
  }

  return (
    <>
      <Books handleAddBook={addBook} handleDelete={deleteBook} books={books} clearDatabase={clearDatabase} />
    </>
  ); w
}

export default App;
