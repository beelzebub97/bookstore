import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import books from '../data/books';
import { useCart } from '../context/CartContext';

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const book = books.find((b) => b.id === parseInt(id));

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1000);
    return () => clearTimeout(timer);
  }, [added]);

  if (!book) {
    return (
      <div className="page" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#1a1a2e' }}>Book not found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
          ← Back to Store
        </Link>
      </div>
    );
  }

  const stars = '★'.repeat(Math.round(book.rating)) + '☆'.repeat(5 - Math.round(book.rating));

  return (
    <div className="page">
      <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back</button>

      <div style={styles.container}>
        <div style={styles.imageCol}>
          <img src={book.cover} alt={book.title} style={styles.cover} />
        </div>

        <div style={styles.infoCol}>
          <span style={styles.tag}>Book</span>
          <h1 style={styles.title}>{book.title}</h1>
          <p style={styles.author}>by {book.author}</p>

          <div style={styles.ratingRow}>
            <span style={styles.stars}>{stars}</span>
            <span style={styles.ratingNum}>{book.rating} / 5</span>
          </div>

          <p style={styles.description}>{book.description}</p>

          <div style={styles.priceRow}>
            <span style={styles.price}>${book.price.toFixed(2)}</span>
            <button
              className="btn btn-primary"
              style={{ fontSize: '1rem', padding: '0.7rem 1.8rem', ...(added ? { background: '#27ae60' } : {}) }}
              onClick={() => { addToCart(book); setAdded(true); }}
            >
              {added ? '✓ Added to Cart' : '🛒 Add to Cart'}
            </button>
          </div>

          <Link to="/cart" style={styles.viewCart}>View Cart →</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  backBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#666',
    fontSize: '0.95rem',
    marginBottom: '1.5rem',
    padding: 0,
  },
  container: {
    display: 'flex',
    gap: '2.5rem',
    flexWrap: 'wrap',
    background: '#fff',
    borderRadius: 10,
    padding: '2rem',
    boxShadow: '0 2px 12px rgba(0,0,0,0.09)',
  },
  imageCol: {
    flex: '0 0 260px',
    maxWidth: '100%',
  },
  cover: {
    width: '100%',
    borderRadius: 8,
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  },
  infoCol: {
    flex: 1,
    minWidth: 260,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  tag: {
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#e94560',
    background: '#fef0f3',
    padding: '2px 10px',
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 800,
    color: '#1a1a2e',
    lineHeight: 1.2,
  },
  author: {
    fontSize: '1rem',
    color: '#555',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  stars: {
    color: '#f5a623',
    fontSize: '1.1rem',
  },
  ratingNum: {
    fontSize: '0.9rem',
    color: '#666',
  },
  description: {
    fontSize: '0.95rem',
    color: '#444',
    lineHeight: 1.7,
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '0.5rem',
    flexWrap: 'wrap',
  },
  price: {
    fontSize: '2rem',
    fontWeight: 800,
    color: '#e94560',
  },
  viewCart: {
    color: '#3b82d4',
    fontSize: '0.9rem',
    fontWeight: 600,
    marginTop: '0.25rem',
    alignSelf: 'flex-start',
  },
};
