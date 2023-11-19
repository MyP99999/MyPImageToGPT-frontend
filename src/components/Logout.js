import React from 'react'
import { useAuth } from '../context/useAuth'

const Logout = () => {
    const { logout } = useAuth()

    return (
        <button onClick={() => logout()} className='px-4 py-2 hover:bg-red-700 transition duration-300 ease-in-out text-white font-bold bg-red-600 rounded-md'>Sign Out</button>
    )
}

export default Logout