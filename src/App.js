import React, { useState, useEffect } from 'react';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import Drawer from './Drawer';
import './App.css';

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

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    note.id = new Date().getTime();
    note.createdAt = new Date().toISOString(); // Salva come stringa ISO
    note.updatedAt = new Date().toISOString();
    setNotes([...notes, note]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const duplicateNote = (id) => {
    const noteToDuplicate = notes.find((note) => note.id === id);
    if (noteToDuplicate) {
      const duplicatedNote = {
        ...noteToDuplicate,
        id: new Date().getTime(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setNotes([...notes, duplicatedNote]);
    }
  };

  const handleCopy = () => {
    alert('Contenuto copiato negli appunti!');
    // Implementa la logica per copiare il contenuto negli appunti
  };

  const saveNote = (updatedNote) => {
    updatedNote.updatedAt = new Date().toISOString(); // Aggiorna il timestamp
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
    setIsDrawerOpen(false);
    setCurrentNote(null); // Resetta la nota corrente
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    setIsDrawerOpen(true);
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
        <label style={{color:'black'}}>Filtra per categorie: </label>
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <NoteList
        notes={notes}
        onDelete={deleteNote}
        onDuplicate={duplicateNote}
        onCopy={handleCopy}
        onEdit={handleEdit}
        selectedCategory={selectedCategory} // Passa selectedCategory
        sortType={sortType} // Passa sortType
      />
      <Drawer
        isOpen={isDrawerOpen}
        note={currentNote}
        onClose={() => {
          setIsDrawerOpen(false);
          setCurrentNote(null);
        }}
        onSave={saveNote}
      />
    </div>
  );
};

export default App;