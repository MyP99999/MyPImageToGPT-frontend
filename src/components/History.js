import './styles/mainContent.css';
import { useHistory } from '../context/useHistory';

const History = () => {
    const { open, history } = useHistory()


    return (
        <div className={`${open ? 'absolute p-0 m-0 h-full w-screen' : 'hidden'} md:block md:w-1/4`}>
            {/* History Panel */}
            <div className="min-h-custom bg-slate-700 w-full flex flex-col items-center text-center border-2 border-white">
                <h1 className="text-xl font-semibold text-white my-4">History</h1>
                <div className="w-full flex flex-1 flex-col justify-between gap-1">
                    <div className="history-items-container custom-scrollbar overflow-y-auto">
                        {history.map((item) => (
                            <div key={item.id} className="bg-slate-900 rounded-lg py-2 mb-1 w-full flex items-center justify-between px-4">
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
        </div>
    );
};

export default History;
