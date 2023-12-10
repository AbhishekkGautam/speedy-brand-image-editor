'use client';

import ColorPicker from './ColorPicker';
import ImageEffectSelector from './ImageEffectSelector';

const Sidebar = ({
  textInput,
  setTextInput,
  textStyle,
  setTextStyle,
  setImageEffect,
  imageEffect,
}) => {
  const handleColorChange = newColor => {
    setTextStyle(prev => ({ ...prev, color: newColor }));
  };

  const handleTextStyle = e => {
    const value = parseInt(e.target.value, 10);
    setTextStyle(prev => ({
      ...prev,
      [e.target.name]: !isNaN(value) ? value : '',
    }));
  };

  return (
    <div className="w-full p-4">
      <div className="pt-2">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Enter overlay text"
            className="w-full py-2 rounded-md border border-gray-200 text-gray-500 px-2 placeholder:text-sm outline-none"
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
          />
        </div>
        <hr />
        <div className="w-full flex gap-4 mt-8">
          <ColorPicker onColorChange={handleColorChange} />
          <input
            name="fontSize"
            type="number"
            min={0}
            value={textStyle?.fontSize}
            onChange={handleTextStyle}
            className="w-20 py-2 rounded-md border border-gray-200 text-gray-500 px-2 outline-none"
          />
        </div>
        <div className="flex gap-4 mt-4">
          <div className="flex items-center">
            <label htmlFor="positionX" className="pr-2 text-sm text-gray-500">
              X
            </label>
            <input
              name="positionX"
              type="number"
              min={0}
              className="w-20 py-2 rounded-md border border-gray-200 text-gray-500 px-2 outline-none"
              value={textStyle?.positionX}
              onChange={handleTextStyle}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="positionY" className="pr-2 text-sm text-gray-500">
              Y
            </label>
            <input
              name="positionY"
              type="number"
              min={0}
              className="w-20 py-2 rounded-md border border-gray-200 text-gray-500 px-2 outline-none"
              value={textStyle?.positionY}
              onChange={handleTextStyle}
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <ImageEffectSelector
          setImageEffect={setImageEffect}
          imageEffect={imageEffect}
        />
      </div>
    </div>
  );
};

export default Sidebar;
