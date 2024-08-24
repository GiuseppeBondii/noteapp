// Note.js
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Note = ({ note, onDelete, onDuplicate, onCopy, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewLength = 200;

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const content = typeof note.content === 'string' ? note.content : '';

  const displayContent = isExpanded
    ? content
    : `${content.substring(0, previewLength)}${
        content.length > previewLength ? '...' : ''
      }`;

  return (
    <div className="note" style={{ backgroundColor: note.color }}>
      <h3>{note.title}</h3>
      <div className="note-content">
        <ReactMarkdown>{displayContent}</ReactMarkdown>
      </div>
      {content.length > previewLength && (
        <button onClick={handleExpand}>
          {isExpanded ? 'Mostra meno' : 'Mostra di più'}
        </button>
      )}
      <button onClick={() => onCopy(content)}>Copia</button>
      <button onClick={() => onDuplicate(note.id)}>Duplica</button>
      <button onClick={() => onDelete(note.id)}>Elimina</button>
      <button onClick={() => onEdit(note)}>Modifica</button>
    </div>
  );
};

export default Note;