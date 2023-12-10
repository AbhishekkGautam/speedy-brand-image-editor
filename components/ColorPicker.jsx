'use client';
import { useState } from 'react';

const ColorPicker = ({ onColorChange }) => {
  const [color, setColor] = useState('#000000');

  const handleChange = newColor => {
    setColor(newColor);
    onColorChange(newColor);
  };

  return (
    <div className="w-2/3 flex items-center gap-2 rounded-md border border-gray-200 text-gray-500 py-1 px-2">
      <input
        type="color"
        value={color}
        onChange={e => handleChange(e.target.value)}
        className="w-12 h-10 cursor-pointer"
      />
      <span className="text-sm text-gray-500">{color}</span>
    </div>
  );
};

export default ColorPicker;
