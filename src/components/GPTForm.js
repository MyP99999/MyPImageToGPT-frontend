import React, { useCallback, useEffect, useState } from 'react'
import { createWorker } from 'tesseract.js';
import { useAuth } from '../context/useAuth';
import axiosInstance from '../api/axios';
import { useTokens } from '../context/useTokens';
import { useHistory } from '../context/useHistory';
import coin from "../assets/coin.png"

const GPTForm = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const { fetchHistory } = useHistory()

    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState('')
    const [price, setPrice] = useState(1)

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
        setInput(data.text)
        setIsLoading('')
    }, [selectedImage,]);

    useEffect(() => {
        convertImageToText();
    }, [selectedImage, convertImageToText]);

    async function onSubmit(event) {
        event.preventDefault();
        if (tokens >= price) {
            setLoading(true);
            try {
                // Make a GET request
                const response = await axiosInstance.get('http://localhost:8080/bot/chat', {
                    params: {
                        prompt: input,
                        userId: user.id,
                        price: price,
                    }
                });
                const data = response.data.toString();
                setResult(data);
                setInput('');
                fetchHistory()
                setLoading(false);
                spendTokens(price)
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
        return { __html: '' };
    };

    const handleChangeImage = e => {
        if (e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        } else {
            setSelectedImage(null);
            setInput('')
        }
    }

    const calculatePrice = useCallback((text) => {
        const letterCount = text.replace(/\s/g, '').length; // Remove spaces to count only letters
        return Math.ceil(letterCount / 100);
    }, []);


    useEffect(() => {
        setPrice(calculatePrice(input));
    }, [input, calculatePrice]);


    return (
        <div className='flex flex-col w-full md:w-3/4 min-h-custom items-center justify-around overflow-auto'>
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

            <div className='flex flex-col w-full bg-slate-500 p-4 rounded-lg items-center '>
                <div className='flex w-full h-full justify-between items-center'>
                    <div className='ml-8 p-4'>
                        <h1 className='text-2xl font-bold text-blue-800 mb-4'>Image to Text</h1>
                        <div>
                            <input
                                type="file"
                                id="upload"
                                className="hidden"  // Tailwind class to hide the input
                                accept="image/*"
                                onChange={handleChangeImage}
                            />
                            <label
                                htmlFor="upload"
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                            >
                                Upload Image
                            </label>
                        </div>
                    </div>
                    {selectedImage && (
                        <div className='w-24 mr-8'>
                            <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="w-full h-auto object-cover rounded-lg" />
                        </div>
                    )}
                    <div className='flex gap-1 mr-8 items-center'>
                        <h1 className='font-bold text-xl text-white'>Price: <span className='text-yellow-400'>{price}</span> </h1>
                        <img src={coin} alt="coin" className='w-4 h-4' />
                    </div>
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

