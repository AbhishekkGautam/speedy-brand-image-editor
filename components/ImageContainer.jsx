'use client';

import { getFilterStyle } from '@/utils/getFilterStyle';
import * as htmlToImage from 'html-to-image';
import Image from 'next/image';
import { useRef, useState } from 'react';

const ImageContainer = ({
  textInput,
  textStyle,
  imageEffect,
  selectedImage,
  setSelectedImage,
  resetAllImageStates,
}) => {
  const [error, setError] = useState(null);
  const imageInputRef = useRef(null);

  const { color, fontSize, positionX, positionY } = textStyle;

  const handleImageUpload = e => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const maxSize = 2 * 1024 * 1024;
      if (imageFile.size > maxSize) {
        setError('File size exceeds the limit of 2 MB.');
        return;
      }
      setError(null);
      setSelectedImage(imageFile);
    }
  };

  const downloadImage = () => {
    const imageEl = document.querySelector('#image-div');
    htmlToImage
      .toPng(imageEl)
      .then(dataUrl => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        setError('oops, something went wrong!', error);
      });
  };

  const removeImageBtnHandler = () => {
    imageInputRef.current.value = '';
    resetAllImageStates();
  };

  const imageStyle = {
    filter: getFilterStyle(imageEffect),
  };

  return (
    <section className="">
      <div
        className={`w-[640px] h-[480px] ${
          !selectedImage && 'border-4 border-gray-200 border-dashed rounded-md'
        }`}
      >
        <input
          type="file"
          ref={imageInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        {selectedImage ? (
          <div
            id="image-div"
            className="flex justify-center items-center h-full relative overflow-hidden"
          >
            <Image
              src={selectedImage ? URL.createObjectURL(selectedImage) : ''}
              fill
              alt="preview"
              className="object-cover overflow-hidden"
              style={imageStyle}
            />
            <p
              style={{
                color: color,
                fontSize: `${fontSize}px`,
                top: positionY,
                left: positionX,
              }}
              className="absolute z-1"
            >
              {textInput}
            </p>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="mb-6 text-center">
              <h1 className="text-xl font-semibold">Upload your images</h1>
              <p className="font-medium text-gray-500">
                it&apos;s free, forever
              </p>
            </div>

            <button
              onClick={() => imageInputRef.current.click()}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-800 hover:text-white transition-all ease-in duration-300 border rounded-md"
            >
              Browse
            </button>
            {error && <div className="text-red-500 mt-4">{error}</div>}
          </div>
        )}
      </div>
      {selectedImage && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={removeImageBtnHandler}
            className="px-6 py-3 text-sm text-gray-600 bg-gray-50 hover:bg-gray-800 hover:text-white transition-all ease-in duration-300 border border-gray-300 rounded-md"
          >
            Remove Image
          </button>
          <button
            onClick={downloadImage}
            className="px-6 py-3 text-sm text-gray-600 bg-gray-50 hover:bg-gray-800 hover:text-white transition-all ease-in duration-300 border border-gray-300 rounded-md"
          >
            Download Image
          </button>
        </div>
      )}
    </section>
  );
};

export default ImageContainer;
