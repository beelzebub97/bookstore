import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function BookCard({ book }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1000);
    return () => clearTimeout(timer);
  }, [added]);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(book);
    setAdded(true);
  };

  const stars = '★'.repeat(Math.round(book.rating)) + '☆'.repeat(5 - Math.round(book.rating));

  return (
    <div style={styles.card}>
      <Link to={`/book/${book.id}`} style={styles.imgLink}>
        <img src={book.cover} alt={book.title} style={styles.cover} />
      </Link>
      <div style={styles.body}>
        <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 style={styles.title}>{book.title}</h3>
        </Link>
        <p style={styles.author}>{book.author}</p>
        <div style={styles.row}>
          <span style={styles.stars}>{stars}</span>
          <span style={styles.rating}>{book.rating}</span>
        </div>
        <div style={styles.footer}>
          <span style={styles.price}>${book.price.toFixed(2)}</span>
          <button
            className="btn btn-primary"
            onClick={handleAdd}
            style={added ? { ...styles.addBtn, background: '#27ae60' } : styles.addBtn}
          >
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#ffffff',
    borderRadius: 10,
    boxShadow: '0 2px 12px rgba(0,0,0,0.09)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  imgLink: {
    display: 'block',
    height: 220,
    overflow: 'hidden',
    background: '#f0f0f0',
  },
  cover: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s',
  },
  body: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    flexGrow: 1,
  },
  title: {
    fontSize: '1rem',
    fontWeight: 700,
    color: '#1a1a2e',
    lineHeight: 1.3,
  },
  author: {
    fontSize: '0.85rem',
    color: '#666',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  stars: {
    color: '#f5a623',
    fontSize: '0.85rem',
  },
  rating: {
    fontSize: '0.8rem',
    color: '#666',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: '0.75rem',
  },
  price: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#e94560',
  },
  addBtn: {
    transition: 'background 0.3s',
  },
};
