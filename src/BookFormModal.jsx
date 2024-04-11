import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function BookFormModal({ onSubmit, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    try {
      // Send a POST request to the server's /books endpoint
      const response = await axios.post('https://can-of-books-backend-13lx.onrender.com/books', {
        title,
        description
      });
      console.log('New book added:', response.data); // Log the new book data returned from the server
      // Call the onSubmit prop with the new book data returned from the server
      onSubmit(response.data);
      // Clear the input fields
      setTitle('');
      setDescription('');
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error adding book:', error);
      // You can handle errors here, e.g., display an error message to the user
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Book</Modal.Title>
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
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default BookFormModal;
