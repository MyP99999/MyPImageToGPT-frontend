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
      <History />
      <div className="flex flex-col w-full min-h-custom">
        <div className='flex flex-col gap-4 h-full w-full p-4 bg-slate-500  overflow-auto custom-scrollbar  overflow-y-auto'>
          {historyDetail && (
            <>
              <div className='self-start max-w-md lg:max-w-xl xl:max-w-4xl bg-gray-200 p-3 rounded-xl break-words'>
                <p>Question: {historyDetail.question}</p>
              </div>
              <div className='self-end max-w-md lg:max-w-xl xl:max-w-4xl bg-blue-200 p-3 rounded-xl break-words'>
                <p>Answer: {historyDetail.answer} {historyDetail.answer}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryDetails;
