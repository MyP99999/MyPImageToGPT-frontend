import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import dog from '../assets/dog.png';
import { createWorker } from 'tesseract.js';

const GPTForm = ({ selectedImage, textResult, setTextResult }) => {
    const [animalInput, setAnimalInput] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState('')


    const convertImageToText = useCallback(async () => {
        if (!selectedImage) return
        setIsLoading('loading')
        const worker = await createWorker();
        await worker.load();
        await worker.loadLanguage('ron');
        await worker.initialize('ron');
        const { data } = await worker.recognize(selectedImage);
        console.log(data)
        setTextResult(data.text);
        setAnimalInput(textResult)
        setIsLoading('')
    }, [selectedImage, textResult, setTextResult]);

    useEffect(() => {
        convertImageToText();
    }, [selectedImage, convertImageToText]);

    async function onSubmit(event) {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3500/api/generate', {
                text: animalInput
            });


            if (response.status === 200) {
                const data = response.data;
                setResult(data.result);
            }
            setAnimalInput('');
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
                <img src={dog} className="w-12 h-12 mb-2" alt="dog" />
                <h3 className='text-2xl font-extrabold my-4'>Enter the questions or upload a photo</h3>
                <form onSubmit={onSubmit} className="flex flex-col items-center">
                    <textarea
                        type="text"
                        name="animal"
                        placeholder={isLoading}
                        value={animalInput}
                        onChange={(e) => setAnimalInput(e.target.value)}
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