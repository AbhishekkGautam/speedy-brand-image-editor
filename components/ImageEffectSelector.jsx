import { IMAGE_EFFECTS_OPTIONS } from '@/enums/enums';

const ImageEffectSelector = ({ setImageEffect, imageEffect }) => {
  const effects = Object.values(IMAGE_EFFECTS_OPTIONS);

  return (
    <>
      <p className="text-sm text-gray-400">Filter Effects</p>
      <div className="pt-4">
        <div className="grid grid-cols-2 gap-2">
          {effects.map(effect => {
            const activeBtnStyle =
              imageEffect === effect
                ? 'border-gray-800 text-gray-800'
                : 'border-gray-300 text-gray-500';
            return (
              <button
                key={effect}
                onClick={() => setImageEffect(effect)}
                className={`py-3 px-4 border rounded-md text-sm hover:text-gray-800 ${activeBtnStyle}`}
              >
                {effect}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ImageEffectSelector;
