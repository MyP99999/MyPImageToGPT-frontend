import React, { useState } from 'react'
import AddImage from '../components/AddImage';
import GPTForm from '../components/GPTForm';
import { useAuth } from '../context/useAuth';

const MainPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");

  const { logout } = useAuth()

  return (
    <div className="flex relative xl:flex-row flex-col justify-center mt-12 gap-24 items-center min-h-screen">
      <AddImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} setTextResult={setTextResult} />
      <GPTForm textResult={textResult} selectedImage={selectedImage} setTextResult={setTextResult} />
      <button onClick={() => logout()} className='absolute top-0 right-0 px-6 py-2 bg-red-600 rounded-md'>Sign Out</button>
    </div>
  )
}

export default MainPage