// App.js
import React, { useState, useEffect } from 'react';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import Drawer from './Drawer';
import './App.css';
import ToDoList from './ToDoList';

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [sortType, setSortType] = useState('date');
  const [selectedCategory, setSelectedCategory] = useState('Tutte');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const categories = ['Tutte', 'Lavoro', 'Personale', 'Studio', 'Altro'];

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Handle adding a new note
  const addNote = (note) => {
    const newNote = {
      ...note,
      id: new Date().getTime(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  // Handle deleting a note by ID
  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  // Handle duplicating a note by ID
  const duplicateNote = (id) => {
    const noteToDuplicate = notes.find((note) => note.id === id);
    if (noteToDuplicate) {
      const duplicatedNote = {
        ...noteToDuplicate,
        id: new Date().getTime(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setNotes((prevNotes) => [...prevNotes, duplicatedNote]);
    }
  };

  // Handle copying the content of a note
  const handleCopy = (content) => {
    navigator.clipboard.writeText(content)
      .then(() => alert('Contenuto copiato negli appunti!'))
      .catch((err) => alert('Errore nella copia del contenuto:', err));
  };

  // Handle saving updates to an existing note
  const saveNote = (updatedNote) => {
    updatedNote.updatedAt = new Date().toISOString();
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      )
    );
    closeDrawer();
  };

  // Handle opening the drawer for editing a note
  const handleEdit = (note) => {
    setCurrentNote(note);
    setIsDrawerOpen(true);
  };

  // Handle closing the drawer and resetting the current note
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setCurrentNote(null);
  };
  

  return (
    <div className="App">
      <NoteForm onSave={addNote} />
      <div className="PosizioneFiltro">
        <div className="sort-buttons">
          <button onClick={() => setSortType('title')}>Ordina per Titolo</button>
          <button onClick={() => setSortType('date')}>Ordina per Data</button>
          <button onClick={() => setSortType('length')}>Ordina per Lunghezza</button>
        </div>
        <label style={{ color: 'black' }}>Filtra per categorie: </label>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <NoteList
        notes={notes}
        onDelete={deleteNote}
        onDuplicate={duplicateNote}
        onCopy={handleCopy}
        onEdit={handleEdit}
        selectedCategory={selectedCategory}
        sortType={sortType}
      />
      <Drawer
        isOpen={isDrawerOpen}
        note={currentNote}
        onClose={closeDrawer}
        onSave={saveNote}
      />
      <div>
        <div style={{
          width:'80vw'
        }} class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div class="offcanvas-header">
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
              <ToDoList/>
          </div>
        </div>
    </div>
    </div>
  );
};

export default App;