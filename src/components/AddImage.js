
const AddImage = ({ selectedImage, setSelectedImage, setTextResult }) => {
    
    const handleChangeImage = e => {
        if (e.target.files[0]) {
          setSelectedImage(e.target.files[0]);
        } else {
          setSelectedImage(null);
          setTextResult("")
        }
      }

    return (
        <div className="flex flex-col items-center justify-center text-center">
            <h1 className='text-2xl font-extrabold text-blue-800'>Image to Text</h1>
            <p className='text-xl font-bold'>Get words in image!</p>
            <div>
                <label htmlFor="upload"></label>
                <input type="file" id="upload" className='font-bold' accept="image/*" onChange={handleChangeImage} />
            </div>
            {selectedImage && (
                <div className='mt-6'>
                    <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="thumb"
                        className="w-96 h-auto object-cover"
                    />
                </div>
            )}
        </div>)
}

export default AddImage