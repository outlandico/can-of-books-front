// EditBookForm.jsx
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function EditBookForm({ book, onSubmit, onClose }) {
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);

  const handleSubmit = async () => {
    try {
      // Send a PUT request to update the book details
      const response = await axios.put(`https://can-of-books-backend-13lx.onrender.com/books/${book._id}`, {
        title,
        description
      });
      console.log('Book updated:', response.data); // Log the updated book data returned from the server
      // Call the onSubmit prop with the updated book data returned from the server
      onSubmit(response.data);
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error updating book:', error);
      // You can handle errors here, e.g., display an error message to the user
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditBookForm;
