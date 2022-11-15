import React, { useState } from 'react'
import { useNavigate, useLocation  } from "react-router-dom";
import useDarkMode from '../../hooks/useDarkMode'
import Routing from '../routing/Routing'

import devchallenges from '../../img/devchallenges.svg'
import devchallengeslight from '../../img/devchallenges-light.svg'
import flechaabajo from '../../img/flechaabajo.png'
import avatar from '../../img/avatar.jpg'
import profileicon from '../../img/profileicon.png'
import logout from '../../img/logout.png'
import people from '../../img/people.png'

import AuthService from '../../actions/user'
import { useEffect } from 'react';


const Navbar = () => {

    const location = useLocation();

    const navigate = useNavigate();
    const { theme, toggleTheme } = useDarkMode()
    const [isMenuDropDown, setIsMenuDropDown] = useState(false)    
    const [userInformation, setUserInformation] = useState({})

    const [isAuth, setIsAuth] = useState(true)
    const [isDarkModeChecked, setIsDarkModeChecked] = useState(theme === 'light' ? true : false)        
    const handleDarkMode = () => {
        toggleTheme()        
    }

    const getUserInformation = async() => {
        const token = await AuthService.getCurrentUser()                
        const {data, error} = await AuthService.getUserInformation(token)        
        setUserInformation(data)    
    }

    const getUser = async() =>{
        
        //console.log('location pathname',location.pathname)  

        if(location.pathname === "/google"){
            return 
        }
        if(location.pathname === "/facebook"){
            return 
        }
        if(location.pathname === "/github"){
            return 
        }

        if(!(await AuthService.getCurrentUser())){
            setIsAuth(false)
            navigate('/')
        }else{
            await getUserInformation()
            setIsAuth(true)
            navigate('/profile')
        }
    } 

    window.addEventListener('storage', () => {
        getUser()
    })

    useEffect(() => {
        getUser()   
    }, [])

    const handleLogout = () => {
        AuthService.logout()
        navigate('/')
    }

    const handleLogoClick = () =>{
        if (isAuth) navigate('/profile')
        else navigate('/')

    }


    return(
        <div className={`${theme === 'dark' ? `dark` : `light`} w-full`}>
            <div className='h-screen bg-light dark:bg-dark'>
                <nav className='flex justify-between items-center p-4 bg-light dark:bg-dark border-b border-[#BDBDBD]'>
                    <button onClick={handleLogoClick}>
                        <img src={theme === 'light' ? devchallenges : devchallengeslight} alt="logo" />
                    </button>
                    <ul className='flex gap-4'>
                        {isAuth ? 
                        <li className='flex justify-center items-center' onMouseEnter={e => setIsMenuDropDown(true)} onMouseLeave={e => setIsMenuDropDown(false)}>
                            <img src={userInformation.photo ? userInformation.photo : avatar} alt="avatar" className='w-[32px] h-[32px] rounded-lg' />
                            <p className={`ml-[11px] ${theme === 'light' ? 'text-light_primary': 'text-dark_primary'}`}>{userInformation.name}</p>
                            <button >
                                <img src={flechaabajo} alt="abajo" className='w-[12px] h-[12px] ml-[19px]' />
                            </button>
                            <ul className={`w-[188px] h-[174px] mt-[250px] absolute bg-white rounded-lg border border-[#E0E0E0] flex flex-col items-center ${isMenuDropDown ? 'animate-opacityin' : 'animate-opacityout'} `}>
                                <li className=' mt-[15px] w-[164.12px] flex items-center rounded-lg hover:bg-gray-200'>
                                    <img src={profileicon} alt="" className='w-[20px] h-[20px] ml-[8px]'/>
                                    <a className="text-sm py-2 px-2 block text-secondary">My Profile</a>
                                </li>                                
                                <li className=' mt-[15px] w-[164.12px] flex items-center rounded-lg hover:bg-gray-200'>
                                    <img src={people} alt="" className='w-[20px] h-[20px] ml-[8px]'/>
                                    <a className="text-sm py-2 px-2 block text-secondary ">Group Chat</a>
                                </li>                                
                                <div className="w-[164.12px] border border-gray-200 my-[5px] mx-[10px]"></div>
                                <li className='w-[164.12px] rounded-lg hover:bg-gray-200'>
                                    <button className='flex items-center' onClick={handleLogout}>
                                        <img src={logout} alt="" className='w-[20px] h-[20px] rotate-180'/>
                                        <a className="text-sm py-2 px-4 block text-secondary">Logout</a>
                                    </button>
                                </li>                                
                            </ul>
                                             
                        </li>: <></>}                        
                        <label className="flex relative items-center cursor-pointer">
                            <input type="checkbox" value="" id="default-toggle-size" className="sr-only peer " defaultChecked={isDarkModeChecked} onChange={handleDarkMode}/>
                            <div className={`w-11 h-6 bg-[#252329] peer-focus:outline-none  rounded-full peer dark:bg-gray-200 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] ${isAuth ? 'after:mt-1' : ''} after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-300`}></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark Mode</span>
                        </label>                        
                    </ul>
                </nav>
                <div className='mt-[50px] flex justify-center'>
                    <Routing theme={theme} />
                </div>
            </div>
        </div>
    )
}

export default Navbar