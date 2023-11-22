import React, { useCallback, useEffect, useState } from 'react'
import { createWorker } from 'tesseract.js';
import { useAuth } from '../context/useAuth';
import axiosInstance from '../api/axios';
import { useTokens } from '../context/useTokens';

const GPTForm = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [textResult, setTextResult] = useState("");

    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState('')

    const { user } = useAuth()
    const { tokens, spendTokens } = useTokens()

    const convertImageToText = useCallback(async () => {
        if (!selectedImage) return
        setIsLoading('loading')
        const worker = await createWorker();
        await worker.load();
        await worker.loadLanguage('ron');
        await worker.initialize('ron');
        const { data } = await worker.recognize(selectedImage);
        setTextResult(data.text);
        setInput(data.text)
        setIsLoading('')
    }, [selectedImage, setTextResult]);

    useEffect(() => {
        convertImageToText();
    }, [selectedImage, convertImageToText]);

    async function onSubmit(event) {
        event.preventDefault();
        let price = 5;
        if (tokens >= price) {
            setLoading(true);
            try {
                // Make a GET request
                const response = await axiosInstance.get('http://localhost:8080/bot/chat', {
                    params: {
                        prompt: input,
                        userId: user.id,
                    }
                });
                const data = response.data.toString();
                setResult(data);
                setInput('');
                setLoading(false);
                // const refreshToken = localStorage.getItem('refreshToken');
                spendTokens(5)
            } catch (error) {
                console.error(error);
                alert(error.message);
            }
        } else {
            alert("You don't have enough tokens!");
        }
    }


    const renderResultWithLineBreaks = () => {
        console.log(result)
        if (typeof result === 'string') {
            return { __html: result.replace(/\n/g, '<br>') };
        }
        return { __html: '' }; // Return an empty string or some default value if result is not a string
    };

    const handleChangeImage = e => {
        if (e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        } else {
            setSelectedImage(null);
            setTextResult("")
        }
    }

    return (
        <div className='flex flex-col w-full md:w-3/4 min-h-custom items-center justify-around'>
            <div className='bg-slate-100 h-full w-full flex-1 overflow-auto custom-scrollbar' style={{ maxHeight: '500px' }}>
                {loading && (
                    <h1 className="text-xl font-semibold">Loading...</h1>
                )}
                {result && (
                    <>
                        <div dangerouslySetInnerHTML={renderResultWithLineBreaks()} className="w-full p-4 bg-slate-200 font-semibold border-2 border-black rounded-lg" />
                    </>
                )}
            </div>

            <div className='flex flex-col w-full bg-slate-500 p-4 rounded-lg items-center'>
                <div className='flex justify-center items-center gap-10'>
                    <div>
                        <h1 className='text-2xl font-bold text-blue-800 mb-4'>Image to Text</h1>
                        <div>
                            <label htmlFor="upload" className="block text-white font-semibold mb-2">Upload Image:</label>
                            <input type="file" id="upload" className='p-2 rounded border border-gray-300' accept="image/*" onChange={handleChangeImage} />
                        </div>
                    </div>
                    {selectedImage && (
                        <div className='w-24'>
                            <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="w-full h-auto object-cover rounded-lg" />
                        </div>
                    )}
                </div>
                <form onSubmit={onSubmit} className="flex flex-col items-center w-full mt-4">
                    <textarea
                        type="text"
                        name="animal"
                        placeholder={isLoading ? "Processing..." : "Enter text here"}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-56 p-2 border-2 border-gray-700 rounded-lg resize-none"
                    />
                    <button
                        type="submit"
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-black border-2"
                    >
                        Resolve
                    </button>
                </form>
            </div>


        </div>
    );
}


export default GPTForm


// {/* {selectedImage && (
//                         <div className='mt-6'>
//                             <img
//                                 src={URL.createObjectURL(selectedImage)}
//                                 alt="thumb"
//                                 className="w-96 h-auto object-cover"
//                             />
//                         </div>
//                     )} */}