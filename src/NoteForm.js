import React, { useState } from 'react';

const NoteForm = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#E6E8E6');
  const [category, setCategory] = useState('Lavoro');

  const colors = [ '#E6E8E6', '#FF8800','#00A676', '#3B45CC', '#D52941'];
  const categories = ['Lavoro', 'Personale', 'Studio', 'Altro'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, content, color, category });
    setTitle('');
    setContent('');
    setColor('#E6E8E6'); 
    setCategory('Lavoro');
  };

  return (
    <form  onSubmit={handleSubmit}>
      <div  id='TODOLISTBTN' >
        <input
          type="text"
          placeholder="Titolo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="note-input"
        /> 
        <button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample1"  aria-controls="offcanvasExample" id='but1' >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
            </svg>
       </button>
         {/*
         <button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample2"  aria-controls="offcanvasExample" >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16">
        <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/>
        <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"/>
      </svg>
      </button>
        */}
      

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