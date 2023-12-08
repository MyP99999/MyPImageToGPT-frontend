import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import History from './History';
import { useHistory } from '../context/useHistory';
import "../components/styles/mainContent.css"

const HistoryDetails = () => {
  const { id } = useParams();
  const { fetchHistoryById } = useHistory();
  const [historyDetail, setHistoryDetail] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetchHistoryById(id);
        setHistoryDetail(response.data);
      } catch (error) {
        console.error("Failed to fetch history details:", error);
        // Handle error appropriately
      }
    };

    fetchHistory();
  }, [id, fetchHistoryById]);

  return (
    <div className="flex">
      <History id={id} />
      <div className="flex flex-col w-full md:w-3/4 min-h-custom">
        <div className='flex flex-col gap-4 h-full w-full p-4 bg-slate-700  overflow-auto custom-scrollbar  overflow-y-auto'>
          {historyDetail && (
            <>
              <div className='self-start max-w-md lg:max-w-xl xl:max-w-4xl'>
                <h1 className='text-white font-semibold'>Request: </h1>
                <p className='bg-blue-200 p-3 rounded-xl break-words whitespace-pre-wrap'>{historyDetail.question}</p>
              </div>
              <div className='self-end max-w-md lg:max-w-xl xl:max-w-4xl'>
                <h1 className='text-white font-semibold'>Response: </h1>
                <p className='bg-blue-200 p-3 rounded-xl break-words whitespace-pre-wrap'>{historyDetail.answer}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryDetails;
