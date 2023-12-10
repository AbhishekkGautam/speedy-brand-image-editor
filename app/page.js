'use client';
import ImageContainer from '@/components/ImageContainer';
import Sidebar from '@/components/Sidebar';
import { useAuthContext } from '@/context/AuthContext';
import { IMAGE_EFFECTS_OPTIONS, OVERLAY_TEXT_STYLE } from '@/enums/enums';
import { redirect } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [textStyle, setTextStyle] = useState(OVERLAY_TEXT_STYLE);
  const [imageEffect, setImageEffect] = useState(IMAGE_EFFECTS_OPTIONS.NONE);

  const {
    authState: { isLoggedIn, token },
  } = useAuthContext();

  useLayoutEffect(() => {
    if (!isLoggedIn && token === '') {
      redirect('/login');
    }
  }, [isLoggedIn, token]);

  const resetAllImageStates = () => {
    setSelectedImage(null);
    setTextInput('');
    setTextStyle(OVERLAY_TEXT_STYLE);
    setImageEffect(IMAGE_EFFECTS_OPTIONS.NONE);
  };

  return (
    <main className="bg-gray-50">
      <div className="flex justify-between min-h-screen">
        <div className="w-full pt-16 flex flex-col justify-center items-center">
          <ImageContainer
            textInput={textInput}
            textStyle={textStyle}
            imageEffect={imageEffect}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            resetAllImageStates={resetAllImageStates}
          />
        </div>
        {selectedImage && (
          <div className=" w-1/3 bg-gray-100 border-l pt-16">
            <Sidebar
              textInput={textInput}
              textStyle={textStyle}
              imageEffect={imageEffect}
              setTextInput={setTextInput}
              setTextStyle={setTextStyle}
              setImageEffect={setImageEffect}
            />
          </div>
        )}
      </div>
    </main>
  );
}
