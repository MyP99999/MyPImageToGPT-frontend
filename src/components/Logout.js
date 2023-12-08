import React from 'react'
import { useAuth } from '../context/useAuth'
import logoutSvg from '../assets/logout.svg'

const Logout = () => {
    const { logout } = useAuth()

    return (
        // <button onClick={() => logout()} className='px-4 py-2 hover:bg-red-700 transition duration-300 ease-in-out text-white font-bold bg-red-600 rounded-md'>o</button>
        <img onClick={logout} src={logoutSvg} className='h-6 filter invert cursor-pointer hover:scale-105 ease-in-out transition-all duration-300' alt="Logout" />
    )
}

export default Logout