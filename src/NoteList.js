import React from 'react';
import Note from './Note';

const NoteList = ({ notes, onDelete, onDuplicate, onCopy, onEdit, selectedCategory, sortType }) => {

  const filteredNotes = selectedCategory === 'Tutte'
    ? notes
    : notes.filter((note) => note.category === selectedCategory);

  const sortedNotes = filteredNotes.sort((a, b) => {
    if (sortType === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortType === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortType === 'length') {
      return b.content.length - a.content.length;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <div className="note-list">
        {sortedNotes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
            onCopy={onCopy}
            onEdit={onEdit} // Passa il metodo onEdit a Note
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;