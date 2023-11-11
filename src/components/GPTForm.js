import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { createWorker } from 'tesseract.js';
import { useAuth } from '../context/useAuth';

const GPTForm = ({ selectedImage, textResult, setTextResult }) => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState('')

    const { user } = useAuth()

    const convertImageToText = useCallback(async () => {
        if (!selectedImage) return
        setIsLoading('loading')
        const worker = await createWorker();
        await worker.load();
        await worker.loadLanguage('ron');
        await worker.initialize('ron');
        const { data } = await worker.recognize(selectedImage);
        setTextResult(data.text);
        setInput(textResult)
        setIsLoading('')
    }, [selectedImage, textResult, setTextResult]);

    useEffect(() => {
        convertImageToText();
    }, [selectedImage, convertImageToText]);

    async function onSubmit(event) {
        event.preventDefault();
        setLoading(true);
        try {
            // Make a GET request
            const response = await axios.get('http://localhost:8080/bot/chat', {
                params: {
                    prompt: input,
                    userId: user.id,
                }
            });
            console.log(response)
            const data = response.data;
            setResult(data);
            console.log(result)
            setInput('');
            setLoading(false);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    const renderResultWithLineBreaks = () => {
        return { __html: result.replace(/\n/g, '<br>') };
    };
    return (
        <div className='flex flex-col xl:flex-row gap-24 items-center'>
            <main className="flex flex-col items-center">
                <h1>{user?.sub}</h1>
                <h3 className='text-2xl font-extrabold my-4'>Enter the questions or upload a photo</h3>
                <form onSubmit={onSubmit} className="flex flex-col items-center">
                    <textarea
                        type="text"
                        name="animal"
                        placeholder={isLoading}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-96 h-[500px] mb-4 p-2 border-2 border-gray-700 rounded-lg"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-black border-2"
                    >
                        Resolve
                    </button>
                </form>
                {loading &&
                    <>
                        <h1>Loading...</h1>
                    </>
                }
            </main>
            {result && <div dangerouslySetInnerHTML={renderResultWithLineBreaks()} className="mt-4 border-black border-2 p-4 max-w-sm bg-white font-semibold" />}
        </div>
    )
}

export default GPTForm