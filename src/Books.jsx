import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Books(props) {

  const [bookData, setBookData] = useState({});

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

  function handleSubmit(event) {
    event.preventDefault();
    console.log(bookData)
    props.handleAddBook(bookData);
  }

  return (
    <>
      <h2>Books</h2>
     
      <Carousel>
        {props.books.map(book =>
        <Carousel.Item key={book._id}>
          <img src={'https://st2.depositphotos.com/4215343/6594/i/950/depositphotos_65949691-stock-photo-plain-hardback-book.jpg'} alt='book_image' width="600px"></img>
          <Carousel.Caption>
            
            <h2>{book.title}</h2>
            <p>Description: {book.description}</p>
            <p>Status: {book.status}</p> {/* Display the status here */}
            <button id={book._id} onClick={deleteTheBook}>Delete</button>
            </Carousel.Caption>
          </Carousel.Item>
        )}
      </Carousel>
      <form onSubmit={handleSubmit}>
        <div><input name="title" type="text" placeholder="Title" onChange={handleChange} /></div>
        <div><input name="description" type="text" placeholder="Description" onChange={handleChange} /></div>
        <button type="submit">Add Book</button>
      </form>
    </>
  );

}

export default Books;




