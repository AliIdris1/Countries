"use client"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { useAtom } from 'jotai';
import { Thechngeatom } from '../utils/atom';
import Link from 'next/link';








type Props = {}



const Header = (props: Props) => {
    const buttonhandelr = () => {
        if(darkmode == false)
        {
            setDarkmode(true)

        } else {
            setDarkmode(false)
        }
    }

    const [darkmode, setDarkmode] = useAtom(Thechngeatom)
    
return (
    <div className={`${darkmode ? "light-dark" : "bg-white"} transition duration-500 `}>

    <div className={` w-full max-w-7xl mx-auto p-5 max-sm:max-w-2xl `}>
        <div className='flex justify-between items-center'>
            <Link href={"/"}>
            <h2 className={`font-extrabold text-2xl max-sm:text-xl ${darkmode && "text-white" }`}>Where in the world?</h2>
            </Link>
            <div className='flex gap-3 items-center justify-center'>
                <FontAwesomeIcon icon={faMoon}  className={`w-4 -rotate-[25] bg-white ${darkmode && "light-dark text-white" } `}/>
                <button className={`font-semibold ${darkmode ? "light-dark text-white" : "bg-white"} `} onClick={buttonhandelr}>{darkmode ? "Light Mode" : "Dark mode"}</button>
            </div>
        </div>
    </div>
    </div>
)
}

export default Header