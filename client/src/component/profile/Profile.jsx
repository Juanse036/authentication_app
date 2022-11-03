import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import avatar from '../../img/avatar.jpg'
import Spinner from '../spinner/Spinner';

import AuthService from '../../actions/user'

const Profile = ({theme}) => {

    const navigate = useNavigate();
    const [userInformation, setUserInformation] = useState({})
    const [error, setError] = useState(null)

    const getUserInformation = async() => {
        const token = await AuthService.getCurrentUser()                
        const {data, error} = await AuthService.getUserInformation(token)        
        setUserInformation(data)     

    }

    useEffect(() => {
        getUserInformation()
    }, [])


    const handleEdit = () => {        
        navigate('/edit')
    }

    if (error) {
        return <h1>Something Went Wrong</h1>
    }


    
    return( Object.keys(userInformation).length !== 0 ?
        <div>
            <div className='text-center'>
                <h1 className={`text-4xl ${theme === 'light' ? 'text-light_primary' : 'text-dark_primary' }`}>Personal Info</h1>
                <h2 className={`text-lg ${theme === 'light' ? 'text-light_primary' : 'text-dark_primary' }`}>Basic info like your name and photo</h2>   
            </div>

            <section className='w-[846px] border border-[#E0E0E0] rounded-xl mt-[45px]'>
                <article className='flex justify-between px-4 py-8 border-b border-[#E0E0E0]'>
                    <div className='pl-[50px]'>
                        <p className={`text-2xl ${theme === 'light' ? 'text-light_primary' : 'text-dark_primary' }`}>Profile</p>
                        <p className='text-[13px] text-secondary'>{userInformation.bio}</p>
                    </div>
                    <button className='w-[95.34px] h-[38px] border border-#828282 rounded-xl text-secondary' onClick={handleEdit}>Edit</button>
                </article>
                <article className='flex items-center p-5 border-b border-[#E0E0E0]'>
                    <p className='w-[40%] pl-[50px] text-[13px] text-secondary'>PHOTO</p>
                    <img src={userInformation.photo ? userInformation.photo : avatar} alt='photo' className='w-[72px] h-[72px] rounded-xl'/>
                </article>
                <article className='flex items-center p-5 border-b border-[#E0E0E0]'>
                    <p className='w-[40%] pl-[50px] text-[13px] text-secondary'>NAME</p>
                    <p className={`text-lg leading-[24.52px] ${theme === 'light' ? 'text-light_primary' : 'text-dark_primary' }`}>{userInformation.name}</p>
                </article>
                <article className='flex items-center p-5 border-b border-[#E0E0E0]'>
                    <p className='w-[40%] pl-[50px] text-[13px] text-secondary'>BIO</p>
                    <p className= {`text-lg leading-[24.52px] overflow-hidden whitespace-nowrap text-ellipsis ${theme === 'light' ? 'text-light_primary' : 'text-dark_primary' }`}>
                        {userInformation.bio}
                    </p>
                </article>
                <article className='flex items-center p-5 border-b border-[#E0E0E0]'>
                    <p className='w-[40%] pl-[50px] text-[13px] text-secondary'>PHONE</p>
                    <p className={`text-lg leading-[24.52px] ${theme === 'light' ? 'text-light_primary' : 'text-dark_primary' }`}>{userInformation.phone}</p>
                </article>
                <article className='flex items-center p-5 border-b border-[#E0E0E0]'>
                    <p className='w-[40%] pl-[50px] text-[13px] text-secondary'>EMAIL</p>
                    <p className={`text-lg leading-[24.52px] ${theme === 'light' ? 'text-light_primary' : 'text-dark_primary' }`}>{userInformation.email}</p>
                </article>
                <article className='flex items-center p-5 border-b border-[#E0E0E0]'>
                    <p className='w-[40%] pl-[50px] text-[13px] text-secondary'>PASSWORD</p>
                    <p className={`text-lg leading-[24.52px] ${theme === 'light' ? 'text-light_primary' : 'text-dark_primary' }`}>******************</p>
                </article>                
            </section>  
        </div> : <Spinner />
    
    )
}

export default Profile