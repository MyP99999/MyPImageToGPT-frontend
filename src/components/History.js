import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../context/useAuth"
import "./styles/mainContent.css"

const History = () => {
    const { user } = useAuth()
    const [history, setHistory] = useState([])

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/history/user/${user?.id}`)

                setHistory(response.data)

            }
            catch (error) {
                console.log(error)
            }

        }

        fetchHistory()
    }, [user])

    return (
        <div className="hidden md:flex min-h-custom bg-slate-700 w-1/4 flex-col items-center text-center">
            <h1 className="my-4 text-xl font-semibold text-white">History</h1>
            <div className="w-full flex flex-1 flex-col justify-between gap-1">
                <div className="history-items-container custom-scrollbar">
                    {history.map((item) => (
                        <div key={item.id} className="bg-slate-900 rounded-lg py-4 w-full flex items-center justify-between px-2">
                            <h1 className="text-lg text-white">
                                {item.question.length > 20 ? `${item.question.substring(0, 20)}..` : item.question}
                            </h1>
                            <button className="bg-blue-500 p-1 rounded-md">View</button>
                        </div>
                    ))}
                </div>

                <div className="flex p-2 bg-slate-800">
                    <h1 className="text-white">User</h1>
                </div>
            </div>
        </div>
    );

}

export default History