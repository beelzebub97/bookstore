import { useState } from 'react';
import booksData from '../data/books.js';
import BookCard from '../components/BookCard';
import AddBookModal from '../components/AddBookModal';

export default function BookList() {
  const [books, setBooks] = useState(booksData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBook = (newBook) => {
    setBooks((prev) => [...prev, newBook]);
  };

  return (
    <div className="page">
      <div style={styles.header}>
        <div>
          <h1 style={styles.heading}>Our Collection</h1>
          <p style={styles.sub}>{books.length} books available</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
          style={styles.addBtn}
        >
          ＋ Add Book
        </button>
      </div>

      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <AddBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddBook}
      />
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '1.75rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  heading: {
    fontSize: '1.75rem',
    fontWeight: 800,
    color: '#1a1a2e',
  },
  sub: {
    color: '#666',
    fontSize: '0.9rem',
    marginTop: 2,
  },
  addBtn: {
    flexShrink: 0,
  },
};
