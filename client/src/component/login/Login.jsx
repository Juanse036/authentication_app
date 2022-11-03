import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import devchallenges from '../../img/devchallenges.svg'
import devchallengeslight from '../../img/devchallenges-light.svg'
import gmail from '../../img/Google.svg'
import facebook from '../../img/Facebook.svg'
import twitter from '../../img/Twitter.svg'
import github from '../../img/Github.svg'
import email from '../../img/email.png'
import password from '../../img/password.png'

import AuthService from '../../actions/user'

const Login = ({theme}) => {       

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })   

    async function formValidation() {        
        let boolValidate = true
        let texterror = ""

        if (formData.email === ""){
            boolValidate = false
            texterror = "Email cannot be empty"
        }


        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email))){
          boolValidate = false
          texterror = "You have entered an invalid email address!"
        }

        if (formData.password === ""){
            boolValidate = false
            texterror = "Password cannot be empty"
        }

        return {boolValidate, texterror};
    }

    function handleChange(evt) {
        const value = evt.target.value;
        setFormData({
          ...formData,
          [evt.target.name]: value
        });
      }

      async function handleSubmit(event){
        event.preventDefault();        

        const {boolValidate, texterror} =await formValidation()             
        
        if(boolValidate){
            const {error, msg} = await AuthService.login(formData.email, formData.password)  
            if (error) {                           
                Notify.failure(msg);
            }else{
                Notify.success('Login Success');
                navigate('/profile')
            }
        }else{            
            Notify.failure(texterror);
        }       
    }

    function handleClickSignIn(evt){
        evt.preventDefault();
        navigate('/')
    }

    return(
        <div className={`w-[474px] h-[544px] border  border-[#BDBDBD] rounded-3xl bg-light dark:bg-dark`}>
            <div className=" mt-[48px] ml-[57px] mr-[] ">                
                <img src={theme === 'dark' ? devchallengeslight : devchallenges} alt="devchallenges" className="w-[130px] h-[18px]"/>
                <h1 className="w-[319px] mt-[33.61px] leading-[25px] tracking-[-0.03] font-semibold text-lg text-light_primary dark:text-dark_primary">Login</h1>    
                <form onSubmit={handleSubmit} className="w-[356.48px] mt-[34.66px] flex flex-col">
                    <div className="flex items-center h-[48px] border border-[#BDBDBD] rounded-lg ">
                        <img className="w-[20px] h-[20px] ml-[14px]" src={email} alt='email'/>
                        <input 
                            type='email' 
                            className="w-[80%] focus:outline-none ml-[13px] text-secondary bg-light dark:bg-dark" 
                            name="email"
                            placeholder="Email"                            
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center h-[48px] mt-[14.5px] border border-[#BDBDBD] rounded-lg">
                        <img className="w-[21px] h-[21px] ml-[15px]" src={password} alt='password'/>
                        <input 
                            type='password' 
                            className="w-[80%] focus:outline-none ml-[11px] text-secondary bg-light dark:bg-dark" 
                            name="password"
                            placeholder='Password'               
                            value={formData.password}
                            onChange={handleChange}

                        />
                    </div>
                    <button 
                        type='submit'
                        className="h-[38px] mt-[22.51px] bg-blue-500 text-white font-semibold leading-[21.79px] tracking-[-0.035] rounded-lg" 
                    >Login</button>
                </form>
                <div className="w-[356.48px] mt-[31.58px] text-center">
                    <p className="text-sm text-secondary leading-[19.07px] tracking-[-0.035]">or continue with these social profile.</p>
                    <div className="mt-[22.5px] flex justify-center gap-x-5">
                        <button><img src={gmail} alt="gmail" /></button>
                        <button><img src={facebook} alt="facebook" /></button>
                        <button><img src={twitter} alt="twiiter" /></button>
                        <button><img src={github} alt="githu" /></button>
                    </div>
                    <p className="mt-[27px] text-sm text-secondary leading-[19.07px] tracking-[-0.035]">Don't have a account yet? <button onClick={handleClickSignIn} className='text-[#2D9CDB]'>Register</button></p>
                </div>
            </div>
        </div>
    )
}

export default Login