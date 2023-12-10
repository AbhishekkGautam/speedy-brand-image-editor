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
            type="number"
            value={textStyle?.fontSize}
            onChange={e =>
              setTextStyle(prev => ({ ...prev, fontSize: e.target.value }))
            }
            className="w-20 py-2 rounded-md border border-gray-200 text-gray-500 px-2 outline-none"
          />
        </div>
        <div className="flex gap-4 mt-4">
          <div className="flex items-center">
            <label htmlFor="inputX" className="pr-2 text-sm text-gray-500">
              X
            </label>
            <input
              name="inputX"
              type="number"
              className="w-20 py-2 rounded-md border border-gray-200 text-gray-500 px-2 outline-none"
              value={textStyle?.positionX}
              onChange={e =>
                setTextStyle(prev => ({ ...prev, positionX: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="inputY" className="pr-2 text-sm text-gray-500">
              Y
            </label>
            <input
              name="inputY"
              type="number"
              className="w-20 py-2 rounded-md border border-gray-200 text-gray-500 px-2 outline-none"
              value={textStyle?.positionY}
              onChange={e =>
                setTextStyle(prev => ({ ...prev, positionY: e.target.value }))
              }
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
