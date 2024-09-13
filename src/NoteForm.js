import React, { useState } from 'react';

const NoteForm = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#E6E8E6');
  const [category, setCategory] = useState('Lavoro');

  const colors = [ '#080708', '#3772FF','#DF2935', '#FDCA40', '#E6E8E6'];
  const categories = ['Lavoro', 'Personale', 'Studio', 'Altro'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, content, color, category });
    setTitle('');
    setContent('');
    setColor('#ffffff'); 
    setCategory('Lavoro');
  };

  return (
    <form  onSubmit={handleSubmit}>
      <div  id='TODOLISTBTN' >
        <button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"  aria-controls="offcanvasExample" >
          ToDoList
        </button>
        <input
          type="text"
          placeholder="Titolo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="note-input"

        /> 
      </div>

      <textarea
        placeholder="Contenuto"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="note-input"
      />
      <label>Scegli un colore:</label>
      <div className="color-picker">
        {colors.map((col) => (
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
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button type="submit">Salva Nota</button>
    </form>
  );
};

export default NoteForm;