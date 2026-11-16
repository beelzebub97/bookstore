import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="page" style={styles.empty}>
        <div style={styles.emptyIcon}>🛒</div>
        <h2 style={styles.emptyTitle}>Your cart is empty</h2>
        <p style={styles.emptyText}>Looks like you haven't added any books yet.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1.25rem', display: 'inline-block' }}>
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 style={styles.heading}>Shopping Cart</h1>

      <div style={styles.layout}>
        {/* Cart Items */}
        <div style={styles.itemsCol}>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.row}>
              <img src={item.cover} alt={item.title} style={styles.thumb} />
              <div style={styles.info}>
                <h3 style={styles.itemTitle}>{item.title}</h3>
                <p style={styles.itemAuthor}>{item.author}</p>
                <p style={styles.itemPrice}>${item.price.toFixed(2)} each</p>
              </div>
              <div style={styles.controls}>
                <div style={styles.qtyRow}>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >−</button>
                  <span style={styles.qty}>{item.quantity}</span>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >+</button>
                </div>
                <span style={styles.lineTotal}>${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  style={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                  title="Remove"
                >✕</button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={styles.summaryCol}>
          <div style={styles.summary}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>
            <div style={styles.summaryRow}>
              <span>Items ({itemCount})</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <span style={{ color: '#27ae60' }}>Free</span>
            </div>
            <div style={styles.divider} />
            <div style={{ ...styles.summaryRow, fontWeight: 700, fontSize: '1.1rem' }}>
              <span>Total</span>
              <span style={{ color: '#e94560' }}>${subtotal.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary" style={styles.checkoutBtn}>
              Proceed to Checkout
            </button>
            <Link to="/" style={styles.continueShopping}>← Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  heading: {
    fontSize: '1.75rem',
    fontWeight: 800,
    color: '#1a1a2e',
    marginBottom: '1.5rem',
  },
  layout: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  itemsCol: {
    flex: 2,
    minWidth: 280,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  row: {
    display: 'flex',
    gap: '1rem',
    background: '#fff',
    borderRadius: 10,
    padding: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  thumb: {
    width: 70,
    height: 95,
    objectFit: 'cover',
    borderRadius: 6,
    flexShrink: 0,
  },
  info: {
    flex: 1,
    minWidth: 140,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  itemTitle: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: '#1a1a2e',
  },
  itemAuthor: {
    fontSize: '0.8rem',
    color: '#777',
  },
  itemPrice: {
    fontSize: '0.85rem',
    color: '#555',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flexShrink: 0,
    flexWrap: 'wrap',
  },
  qtyRow: {
    display: 'flex',
    alignItems: 'center',
    border: '1.5px solid #e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  qtyBtn: {
    background: '#f7f7f7',
    border: 'none',
    padding: '4px 10px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#1a1a2e',
    transition: 'background 0.15s',
  },
  qty: {
    padding: '4px 12px',
    fontWeight: 700,
    fontSize: '0.9rem',
    minWidth: 32,
    textAlign: 'center',
  },
  lineTotal: {
    fontWeight: 700,
    fontSize: '1rem',
    color: '#1a1a2e',
    minWidth: 60,
    textAlign: 'right',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#bbb',
    fontSize: '1rem',
    padding: '4px',
    transition: 'color 0.2s',
  },
  summaryCol: {
    flex: 1,
    minWidth: 240,
  },
  summary: {
    background: '#fff',
    borderRadius: 10,
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
  },
  summaryTitle: {
    fontSize: '1.15rem',
    fontWeight: 800,
    color: '#1a1a2e',
    marginBottom: '0.25rem',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.95rem',
    color: '#444',
  },
  divider: {
    borderTop: '1px solid #e0e0e0',
  },
  checkoutBtn: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    marginTop: '0.5rem',
  },
  continueShopping: {
    textAlign: 'center',
    color: '#3b82d4',
    fontSize: '0.88rem',
    fontWeight: 600,
  },
  empty: {
    textAlign: 'center',
    paddingTop: '5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  emptyTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#1a1a2e',
  },
  emptyText: {
    color: '#666',
    marginTop: '0.5rem',
  },
};
