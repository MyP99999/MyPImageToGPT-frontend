import React, { useCallback, useEffect, useState } from 'react'
import { createWorker } from 'tesseract.js';
import { useAuth } from '../context/useAuth';
import axiosInstance from '../api/axios';
import { useTokens } from '../context/useTokens';
import { useHistory } from '../context/useHistory';
import coin from "../assets/coin.png"
import info from "../assets/info.png"
import Fade from '@mui/material/Fade';
import BlackTooltip from './BlackTooltip';

const GPTForm = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const { fetchHistory } = useHistory()

    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState('')
    const [price, setPrice] = useState(1)
    const [model, setModel] = useState('gpt-4-vision-preview');
    const [prompt, setPrompt] = useState('')
    const [combinedPrompt, setCombinedPrompt] = useState('');
    const [complexOCR, setComplexOCR] = useState(false)

    const { user } = useAuth()
    const { tokens, spendTokens } = useTokens()

    const convertImageToText = async () => {
        if (!selectedImage) return
        setIsLoading('loading')
        const worker = await createWorker();
        await worker.load();
        await worker.loadLanguage('ron');
        await worker.initialize('ron');
        const { data } = await worker.recognize(selectedImage);
        setInput(data.text)
        setIsLoading('')
    }

    async function onSubmit(event) {
        event.preventDefault();
        setResult('');
        if (tokens >= price) {
            setLoading(true);
            console.log(combinedPrompt)
            console.log(model)
            try {
                // Make a GET request
                const response = await axiosInstance.post(`bot/chat`, {
                    prompt: combinedPrompt,
                    userId: user.id,
                    price: price,
                    model: model,
                });
                const data = response.data.toString();
                console.log(response)
                setResult(data);
                setInput('');
                fetchHistory()
                setSelectedImage(null)
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


    async function extractTextWithAI(event) {
        event.preventDefault();
        setResult('');
        if (tokens >= price) {
            setIsLoading(true);
            console.log(combinedPrompt)
            console.log(model)
            try {
                // Make a GET request
                const response = await axiosInstance.post('http://localhost:8080/bot/chat', {
                    prompt: 'Extract the text from the image',
                    userId: user.id,
                    price: 5,
                    model: 'gpt-4-vision-preview',
                    imageData: selectedImage
                });
                const data = response.data.toString();
            
                fetchHistory()
                setInput(data);
                setIsLoading(false);
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
        if (typeof result === 'string') {
            return { __html: result.replace(/\n/g, '<br>') };
        }
        return { __html: '' };
    };

    const handleChangeImage = e => {
        setInput('');
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file)
            // const reader = new FileReader();
            // reader.onloadend = () => {
            //     setSelectedImage(reader.result); // Base64 encoded string
            // };
            // reader.readAsDataURL(file);
        } else {
            setSelectedImage(null);
            setInput('')
        }
    }

    // useEffect(() => {
    //     let url;
    //     if (selectedImage) {
    //         url = URL.createObjectURL(selectedImage);
    //         console.log(url)
    //     }

    //     return () => {
    //         if (url) {
    //             URL.revokeObjectURL(url);
    //         }
    //     };
    // }, [selectedImage]);

    const calculatePrice = useCallback((text, model) => {
        const letterCount = text.replace(/\s/g, '').length; // Remove spaces to count only letters
        let price = 1;
        if (letterCount > 100) {
            // Subtract the first 100 free characters and calculate the price for the remaining characters
            price += Math.ceil((letterCount - 100) / 100);
        }
        if (model === 'gpt-4-1106-preview') {
            price += 4; // Add 5 tokens for GPT-4
        }
        return price;
    }, []);


    const handleModelChange = (event) => {
        setModel(event.target.value); // Update the model state
    };

    const handlePromptChange = (event) => {
        setPrompt(event.target.value); // Update the model state
    };

    useEffect(() => {
        setCombinedPrompt(prompt + input);
    }, [input, prompt, combinedPrompt]);

    useEffect(() => {
        setPrice(calculatePrice(input, model));
    }, [input, model, calculatePrice]);


    return (
        <div className='flex h-full flex-col w-full md:w-3/4 min-h-custom items-center justify-around overflow-auto'>
            <div className='bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 h-full w-full flex-1 overflow-auto custom-scrollbar'>
                {loading && (
                    <h1 className="text-xl font-semibold">Loading...</h1>
                )}
                {result && (
                    <>
                        <div dangerouslySetInnerHTML={renderResultWithLineBreaks()} className="w-full p-4  text-white font-semibold " />
                    </>
                )}
            </div>

            <div className='flex flex-col h-full w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4 justify-center items-center '>
                <div className='flex w-full h-full justify-between md:px-8 py-2 items-center'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <select
                            name="model"
                            id="model"
                            value={model}
                            onChange={handleModelChange}
                            className="bg-slate-900 border-2 text-white sm:p-1 md:p-2 rounded leading-tight focus:outline-none "
                        >
                            <option value="gpt-3.5-turbo-1106" title="GPT-3.5 model, optimized for faster responses.">gpt-3.5</option>
                            <option value="gpt-4-1106-preview" title="GPT-4 model, provides more detailed and nuanced responses.">gpt-4</option>
                        </select>
                        <select
                            name="prompt"
                            id="prompt"
                            value={prompt}
                            onChange={handlePromptChange}
                            className="bg-slate-900 border-2 text-white sm:p-1 md:p-2 rounded leading-tight focus:outline-none "
                        >
                            <option value="" title="Prompt mode: Use for general queries.">prompt</option>
                            <option value="code: " title="Code mode: Use for programming related queries.">code</option>
                        </select>
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <div className='flex flex-col justify-center items-center'>
                                <h1 className='hidden lg:block text-2xl font-bold text-white mb-4'>Image to Text</h1>
                                <div className='flex justify-center items-center'>
                                    <input
                                        type="file"
                                        id="upload"
                                        className="hidden"  // Tailwind class to hide the input
                                        accept="image/*"
                                        onChange={handleChangeImage}
                                    />
                                    <label
                                        htmlFor="upload"
                                        className="text-xs md:text-md text-center bg-blue-600 border-black border-2 hover:bg-blue-700 text-white font-bold py-2 px-2 md:px-4 rounded cursor-pointer"
                                    >
                                        Select Image
                                    </label>
                                    <button className="text-xs ml-1 md:text-md text-center bg-blue-600 border-black border-2 hover:bg-blue-700 text-white font-bold py-2 px-2 md:px-4 rounded cursor-pointer" onClick={convertImageToText}>
                                        Extract text
                                    </button>
                                </div>
                            </div>
                            <div>
                                <BlackTooltip
                                    followCursor
                                    TransitionComponent={Fade}
                                    title="This is a more complex OCR, but the price for this is 5 tokens"
                                >
                                    {/* <label htmlFor="ocr" className='text-white text-xl mr-2'>Complex OCR:</label>
                                    <input
                                        type="checkbox"
                                        checked={complexOCR}
                                        onChange={(e) => setComplexOCR(e.target.checked)}
                                    /> */}
                                </BlackTooltip>
                            </div>
                        </div>
                        {selectedImage && (
                            <div className='w-10 sm:w-16 lg:w-24 md:mr-8'>
                                <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="w-full h-auto object-cover rounded-lg" />
                            </div>
                        )}
                    </div>

                    <div className='flex gap-1 text-sm md:text-lg items-center'>
                        <BlackTooltip
                            followCursor
                            TransitionComponent={Fade}
                            title="The price is increasing with 1 token every 100 letters"
                        >
                            <img src={info} alt="info" className='hidden md:block w-4 h-4' />
                        </BlackTooltip>
                        <h1 className='font-bold flex text-white'>Price: <span className='text-yellow-400'>{price}</span> </h1>
                        <img src={coin} alt="coin" className='w-4 h-4' />
                    </div>
                </div>
                <form onSubmit={onSubmit} className="flex flex-col justify-center items-center w-full mt-4">
                    <textarea
                        type="text"
                        name="animal"
                        placeholder={isLoading ? "Processing..." : "Enter text here"}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full custom-scrollbar text-white h-48 md:h-56 p-2 border-2 border-gray-700 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 rounded-lg resize-none"
                        required
                    />
                    <button
                        type="submit"
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-black border-2"
                    >
                        Resolve
                    </button>
                </form>
            </div>


        </div>
    );
}


export default GPTForm

