import React, { useState } from 'react';

const Note = ({ note, onDelete, onDuplicate, onCopy, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewLength = 200;

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const displayContent = isExpanded
    ? note.content
    : `${note.content.substring(0, previewLength)}${
        note.content.length > previewLength ? '...' : ''
      }`;

  return (
    <div className="note" style={{ backgroundColor: note.color }}>
      <h3>{note.title}</h3>
      <p>{displayContent}</p>
      {note.content.length > previewLength && (
        <button onClick={handleExpand}>
          {isExpanded ? 'Mostra meno' : 'Mostra di più'}
        </button>
      )}
      <button onClick={() => onCopy(note.content)}>Copia</button>
      <button onClick={() => onDuplicate(note.id)}>Duplica</button>
      <button onClick={() => onDelete(note.id)}>Elimina</button>
      <button onClick={() => onEdit(note)}>Modifica</button>
    </div>
  );
};

export default Note;