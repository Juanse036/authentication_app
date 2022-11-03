import { useRef } from 'react'
import { useNavigate } from "react-router-dom";

import back from '../../img/back.png'
import avatar from '../../img/avatar.jpg'
import camera from '../../img/camera.png'
import { useState } from "react";

import AuthService from '../../actions/user'

const Edit = ({theme}) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState(new FormData())  
    const [isImgURL, setIsImgURL] = useState(false)
    const [localPhotoURL, setLocalPhotoURL] = useState('')

    const [dataEdit, setDataEdit] = useState({
        photo: false,
        photoURL: "",
        name: "",
        bio: "",
        phone: "",
        email: "",
        password: ""
    })

    //----------------------------CHOOSE FILE BUTTON------------------------
    const fileInput = useRef(null);
      
    const selectFile = (event) => {
        event.preventDefault()
        fileInput.current.click();                    
    }

    const handleFileChange = async(event) => {

      if (!event.target.files) return;
      const fileObj = event.target.files[0];
      if (!fileObj) {
        return;
      }          
      formData.append('Avatar', fileObj);     
      setLocalPhotoURL(URL.createObjectURL(event.target.files[0]))
      setDataEdit({
        ...dataEdit,
        photo:true,
        photoURL:fileObj.name
    })
    } 

    const handleBack = () => {
        navigate('/profile')
    }

    function handleChange(evt) {
        const value = evt.target.value;
        setDataEdit({
          ...dataEdit,
          [evt.target.name]: value
        });
    }

    const handleSubmit = async(event) => {
        event.preventDefault()        
        const token = await AuthService.getCurrentUser()
        //formData.append('Data', dataEdit);   
        
        for (const property in dataEdit) {
            formData.append(property, dataEdit[property])            
        }

        const {data, error} = await AuthService.updateUserInformation(token, formData)
        window.dispatchEvent(new Event("storage"));
        if(error){
            console.log(error)
        }else{            
            navigate('/profile')            
        }
    }

    const handleImgUpload = () => {
        setIsImgURL(!isImgURL)    
        setDataEdit({
            ...dataEdit,
            photo: false,
            photoURL: ''
        })    
    }

    return(
        <div>
            <button onClick={handleBack} className='flex items-center'>
                <img src={back} alt="" />
                <p className='text-accent'>Back</p>
            </button>
            <form onSubmit={handleSubmit} className='mt-[24px] border border-[#E0E0E0] rounded-xl flex flex-col p-10 gap-y-5 text-light_primary dark:text-dark_primary'>
                <h1>Change Info</h1>
                <p>Changes will be reflected to every services</p>
                <label className="flex relative items-center cursor-pointer">
                            <input type="checkbox" value="" id="default-toggle-size" className="sr-only peer " defaultChecked={isImgURL} onChange={handleImgUpload}/>
                            <div className={`w-11 h-6 bg-[#252329] peer-focus:outline-none  rounded-full peer dark:bg-gray-200 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-300`}></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{isImgURL ? 'Set Photo URL' : 'Select File' }</span>
                </label> 
                {isImgURL ? 
                <>
                <div className='flex flex-col'>
                    <label className='text-[13px]'> Photo URL </label>
                    <input 
                        type="text" 
                        placeholder='Enter your name...' 
                        className='h-[52px] border border-[#828282] rounded-xl pl-5 text-[13px]'
                        name='photoURL'
                        value={dataEdit.photoURL}
                        onChange={handleChange}
                    > 
                    </input>
                </div>
                </>: <>
                    <input
                        style={{display: 'none'}}
                        ref={fileInput}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        name="UPIMG"
                    />
                    <button onClick={selectFile} className='flex items-center'>                    
                        <img type="image" src={dataEdit.photo ? localPhotoURL : avatar} className='w-[72px] h-[72px] relative '></img>
                        <div className='w-[72px] h-[72px] absolute bg-stone-900/[.4] flex items-center justify-center'>
                            <img type="image" src={camera} className='w-[24px] h-[24px]'></img>
                        </div>
                        <label className='ml-[20px] text-[13px] text-secondary'> {dataEdit.photo ? dataEdit.photoURL : 'CHANGE PHOTO'} </label>
                    </button>
                </>
                }
                
                <div className='flex flex-col'>
                    <label className='text-[13px]'> Name </label>
                    <input 
                        type="text" 
                        placeholder='Enter your name...' 
                        className='h-[52px] border border-[#828282] rounded-xl pl-5 text-[13px]'
                        name='name'
                        value={dataEdit.name}
                        onChange={handleChange}
                    > 
                    </input>
                </div>
                <div className='flex flex-col'>
                    <label className='text-[13px]'> Bio </label>
                    <input 
                        type="text" 
                        placeholder='Enter your bio...' 
                        className='h-[91px] border border-[#828282] rounded-xl pl-5 text-[13px]' 
                        name='bio'
                        value={dataEdit.bio}
                        onChange={handleChange}
                    >
                    </input>
                </div>
                <div className='flex flex-col'>
                    <label className='text-[13px]'> Phone </label>
                    <input 
                        type="text" 
                        placeholder='Enter your Phone...' 
                        className='h-[52px] border border-[#828282] rounded-xl pl-5 text-[13px]'
                        name='phone'
                        value={dataEdit.phone}
                        onChange={handleChange}
                    >
                    </input>
                </div>
                <div className='flex flex-col'>
                    <label className='text-[13px]'> Email </label>
                    <input 
                        type="email" 
                        placeholder='Enter your email...' 
                        className='h-[52px] border border-[#828282] rounded-xl pl-5 text-[13px]'
                        name='email'
                        value={dataEdit.email}
                        onChange={handleChange}
                    >
                    </input>
                </div>
                <div className='flex flex-col'>
                    <label className='text-[13px]'> Password </label>
                    <input 
                        type="password" 
                        placeholder='Enter your password...' 
                        className='h-[52px] border border-[#828282] rounded-xl pl-5 text-[13px]'
                        name='password'
                        value={dataEdit.password}
                        onChange={handleChange}
                    >
                    </input>
                </div>
                <button type="submit" className='w-[82px] h-[38px] bg-blue-500 text-white rounded-xl'>save</button>
            </form>             
        </div>
    )

}

export default Edit