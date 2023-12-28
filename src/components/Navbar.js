import React from 'react'
import coin from "../assets/coin.png"
import add from "../assets/add.png"
import { Link } from 'react-router-dom'
import { useTokens } from '../context/useTokens'
import { useHistory } from '../context/useHistory'
import ToggleButton from './ToggleButton'
import BlackTooltip from './BlackTooltip'

const Navbar = () => {
    const { tokens } = useTokens();
    const { toggleHistory } = useHistory();

    return (
        <div className='bg-slate-900 shadow-md w-full h-16'>
            <div className='flex justify-between items-center max-w-6xl mx-auto px-4 h-full'>
                <h1 className='hidden md:block text-white font-bold text-3xl hover:scale-105 transition duration-300 ease-in-out'>
                    <Link to="/">My Personal AI</Link>
                </h1>
                <h1 className='md:hidden text-white font-bold text-3xl hover:scale-105 transition duration-300 ease-in-out'>
                    <ToggleButton toggleHistory={toggleHistory} />
                </h1>

                <div className='flex gap-3 items-center'>
                    <BlackTooltip title='asddas'>
                        <div className='flex items-center gap-1'> {/* Apply flex layout to this container */}
                            <img src={coin} alt="coin" className='w-8 h-8' />
                            <h2 className='font-semibold text-yellow-500 text-lg'>{tokens} tokens</h2>
                        </div>
                    </BlackTooltip>
                    <button className='text-3xl text-white font-semibold hover:text-yellow-500 hover:scale-125 transition duration-300 ease-in-out'>
                        <Link to="/checkout">
                            <img src={add} className='w-8 h-8' alt="add" />
                        </Link>
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Navbar
