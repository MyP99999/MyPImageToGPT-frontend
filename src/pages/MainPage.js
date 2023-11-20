import React from 'react'
import GPTForm from '../components/GPTForm';
import "../components/styles/mainContent.css"
import History from '../components/History';

const MainPage = () => {
  


  return (
    <div className="flex h-full min-h-custom relative justify-center items-center">
      <History />
      <GPTForm />
    </div>
  )
}

export default MainPage