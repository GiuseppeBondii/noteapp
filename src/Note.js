import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

// Funzione per determinare se il testo dovrebbe essere chiaro o scuro
const getContrastingTextColor = (bgColor) => {
  const hexColor = bgColor.replace('#', '');
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 125 ? '#1A1A1A' : '#FFFFFF'; // Usa il nero se è chiaro, altrimenti il bianco
};

const Note = ({ note, onDelete, onDuplicate, onCopy, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewLength = 200;

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const content = typeof note.content === 'string' ? note.content : '';
  const displayContent = isExpanded
    ? content
    : `${content.substring(0, previewLength)}${content.length > previewLength ? '...' : ''}`;

  // Calcola il colore del testo
  const textColor = getContrastingTextColor(note.color);

  return (
    <div className={`note ${note.isDarkBackground ? 'dark-bg' : 'light-bg'}`} style={{ backgroundColor: note.color, color: textColor }}>
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