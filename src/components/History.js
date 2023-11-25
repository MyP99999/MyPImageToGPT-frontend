import './styles/mainContent.css';
import { useHistory } from '../context/useHistory';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/useAuth';

const History = ({ id }) => {
    const { history, setOpen, open } = useHistory();
    const { user } = useAuth()

    const handleResize = () => {
        if (window.innerWidth >= 768) {
            setOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const reversedHistory = [...history].reverse();

    return (
        <div className={`${open ? 'absolute p-0 m-0 min-h-custom w-screen' : 'hidden'} md:block md:w-1/4`}>
            {/* History Panel */}
            <div className={`min-h-custom bg-slate-700 w-full flex flex-col items-center text-center`}>
                <h1 className="text-xl font-semibold text-white my-2">History</h1>
                <Link to={'/'}>
                    <button className='px-3 text-white mb-2 border-white border-[1px] bg-slate-800 rounded-xl'>
                        +
                    </button>
                </Link>
                <div className="w-full h-full flex flex-1 flex-col justify-between gap-1 overflow-auto">
                    <div className="history-items-container custom-scrollbar">
                        {reversedHistory.map((item) => (
                            // eslint-disable-next-line eqeqeq
                            <div key={item.id} className={`${id == item.id ? 'bg-slate-800' : 'bg-slate-900'} rounded-lg py-2 mb-1 w-full flex items-center justify-between px-4`}>
                                <h1 className="text-lg text-white">
                                    {item.question.length > 20 ? `${item.question.substring(0, 5)}..` : item.question}
                                </h1>
                                <Link to={`/history/${item.id}`}>
                                    <button className="bg-blue-500 p-1 rounded-md">
                                        View
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="flex p-2 bg-slate-800">
                        <h1 className="text-white">{user?.sub}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;
