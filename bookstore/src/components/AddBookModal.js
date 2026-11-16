import { useState } from 'react';

const EMPTY_FORM = { title: '', author: '', price: '', description: '', cover: '' };

export default function AddBookModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.author.trim()) e.author = 'Author is required';
    if (!form.price || isNaN(parseFloat(form.price)) || parseFloat(form.price) <= 0)
      e.price = 'Enter a valid price';
    return e;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const newBook = {
      id: Date.now(),
      title: form.title.trim(),
      author: form.author.trim(),
      price: parseFloat(parseFloat(form.price).toFixed(2)),
      rating: 4.0,
      cover: form.cover.trim() || 'https://covers.openlibrary.org/b/id/8091016-L.jpg',
      description: form.description.trim() || 'No description provided.',
    };

    onAdd(newBook);
    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Add New Book</h2>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <Field label="Title *" error={errors.title}>
            <input name="title" value={form.title} onChange={handleChange} style={styles.input} placeholder="Book title" />
          </Field>
          <Field label="Author *" error={errors.author}>
            <input name="author" value={form.author} onChange={handleChange} style={styles.input} placeholder="Author name" />
          </Field>
          <Field label="Price (USD) *" error={errors.price}>
            <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} style={styles.input} placeholder="e.g. 12.99" />
          </Field>
          <Field label="Description">
            <textarea name="description" value={form.description} onChange={handleChange} style={{ ...styles.input, height: 80, resize: 'vertical' }} placeholder="Short description…" />
          </Field>
          <Field label="Cover Image URL">
            <input name="cover" value={form.cover} onChange={handleChange} style={styles.input} placeholder="https://… (optional)" />
          </Field>

          <div style={styles.actions}>
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Book</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={styles.label}>{label}</label>
      {children}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.45)',
    zIndex: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  modal: {
    background: '#fff',
    borderRadius: 12,
    padding: '1.75rem',
    width: '100%',
    maxWidth: 480,
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 800,
    color: '#1a1a2e',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.1rem',
    cursor: 'pointer',
    color: '#888',
    padding: 4,
  },
  label: {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#1a1a2e',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: '0.6rem 0.85rem',
    border: '1.5px solid #e0e0e0',
    borderRadius: 8,
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  },
  error: {
    color: '#e94560',
    fontSize: '0.78rem',
    marginTop: 4,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    marginTop: '1.25rem',
  },
};
