import React, { useState, useEffect } from 'react';
import './Drawer.css';

const Drawer = ({ isOpen, note, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#E6E8E6');
  const [category, setCategory] = useState('Lavoro');

  useEffect(() => {
    if (isOpen && note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setColor(note.color || '#E6E8E6');
      setCategory(note.category || 'Lavoro');
    }
    if (!isOpen) {
      setTitle('');
      setContent('');
      setColor('#E6E8E6');
      setCategory('Lavoro');
    }
  }, [isOpen, note]);

  const handleSubmit = () => {
    onSave({ ...note, title, content, color, category });
    onClose();
  };

  if (!note) {
    return null; // Se note è null, non renderizzare il drawer
  }

  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-header">
        <h3 style={{
           'font-family': 'Georgia, serif'
        }}>Modifica Nota</h3>
        <button className="drawer-close" onClick={onClose}>×</button>
      </div>
      <div className="drawer-content">
        <input
          type="text"
          placeholder="Titolo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Contenuto"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <label>Scegli un colore:</label>
        <div className="color-picker">
          {['#E6E8E6', '#FF8800','#00A676', '#3B45CC', '#D52941'].map((col) => (
            <div
              key={col}
              className={`color-swatch ${col === color ? 'selected' : ''}`}
              style={{ backgroundColor: col }}
              onClick={() => setColor(col)}
            />
          ))}
        </div>
        <label>Scegli una categoria:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {['Lavoro', 'Personale', 'Studio', 'Altro'].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit}>Salva Modifiche</button>
      </div>
    </div>
  );
};

export default Drawer;