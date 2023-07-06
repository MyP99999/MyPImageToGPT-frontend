import React, { useState } from 'react'
import AddImage from '../components/AddImage';
import GPTForm from '../components/GPTForm';

const MainPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [textResult, setTextResult] = useState("");
  

  return (
    <div className="flex xl:flex-row flex-col justify-center mt-12 gap-24 items-center min-h-screen">
        <AddImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} setTextResult={setTextResult} />
        <GPTForm textResult={textResult} selectedImage={selectedImage} setTextResult={setTextResult} />
    </div>
  )
}

export default MainPage