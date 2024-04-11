import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './BookFormModal';
import EditBookForm from './EditBookForm';

function Books(props) {
  const [bookData, setBookData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editBook, setEditBook] = useState(null);

  //function to handle edit book i think lets look back at this
  const handleEditBook = (book) => {
    setEditBook(book);
    setShowForm(true);
  };

  async function deleteTheBook(event) {
    let id = event.target.id;
    props.handleDelete(id);
  }

  function handleChange(event) {
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setBookData({
      ...bookData,
      [event.target.name]: value
    });
  }

  async function handleSubmit(bookData) {
    try {
      console.log(bookData);
      await props.handleAddBook(bookData);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  }

  return (
    <>
      <h2>Books</h2>
      <div className="mb-3">
        {/* Add Book button */}
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>Add Book</button>
      </div>
      <Carousel>
        {props.books.map(book =>
          <Carousel.Item key={book._id}>
            <img src={'https://st2.depositphotos.com/4215343/6594/i/950/depositphotos_65949691-stock-photo-plain-hardback-book.jpg'} alt='book_image' width="600px"></img>
            <Carousel.Caption>
              <h2>{book.title}</h2>
              <p>Description: {book.description}</p>
              <p>Status: {book.status}</p> {/* Display the status here */}
              <button id={book._id} onClick={deleteTheBook}>Delete</button>
              {/* Add Edit button */}
              <button onClick={() => handleEditBook(book)}>Edit</button>
            </Carousel.Caption>
          </Carousel.Item>
        )}
      </Carousel>
      {/* Render the BookFormModal component */}
      {showForm && <BookFormModal onSubmit={handleSubmit} onClose={() => setShowForm(false)} />}
      {/* Render the EditBookForm component */}
      {editBook && (
        <EditBookForm
          book={editBook}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditBook(null);
          }}
        />
      )}
    </>
  );
}

export default Books;



