import { useState } from 'react';

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
      <form onSubmit={handleSubmit}>
        <div><input name="title" type="text" placeholder="Title" onChange={handleChange} /></div>
        <div><input name="description" type="text" placeholder="Description" onChange={handleChange} /></div>
        <button type="submit">Add Book</button>
      </form>
      <section>
        {props.books.map(book =>
          <div key={book._id}>
            <h2>{book.title}</h2>
            <p>Description: {book.description}</p>
            <p>Status: {book.status}</p> {/* Display the status here */}
            <button id={book._id} onClick={deleteTheBook}>Delete</button>
          </div>
        )}
      </section>
    </>
  );

}

export default Books;

