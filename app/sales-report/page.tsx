"use client"
import { useState, DragEvent } from 'react';

export default function SimpleDropZone() {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // required, or drop won't fire
    setIsOver(true);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    const files = Array.from(e.dataTransfer.files);
    console.log(files);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      style={{
        border: isOver ? '2px solid blue' : '2px dashed gray',
        padding: 40,
        textAlign: 'center',
      }}
    >
      {isOver ? 'Release to drop' : 'Drag a file here'}
    </div>
  );
}