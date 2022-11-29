import axios from "axios";


class AuthService {

        
        //const TwitterUrlRequest = import.meta.env.VITE_TWITTER_REQUEST
        
    async login(email, password) {      
      try {  

        const LoginUrlRequest = import.meta.env.VITE_LOGIN_REQUEST
        
        const { data, error } = await axios.post(LoginUrlRequest, { email, password })
        const { data:token } = data       

        if(error){
          return {error: true, msg:"Something went wrong"}
        }
        localStorage.setItem("user", JSON.stringify(token.token));
        window.dispatchEvent(new Event("storage"));

        return {error: false, msg:"Login Succesfully"}
        
          
      } catch (error) {        
        return {error: true, msg:error.response.data.message}
      }       
    }

    async googlelogin(googleToken) {

      try {

        const GoogleUrlRequest = import.meta.env.VITE_GOOGLE_REQUEST

        const { data, error } = await axios.post(GoogleUrlRequest, { googleToken })        
        console.log(data)     
        const { data:token } = await data  

        if(error){
          return {error: true, msg:"Something went wrong"}
        }
        localStorage.setItem("user", JSON.stringify(token.token));
        window.dispatchEvent(new Event("storage"));

        return {error: false, msg:"Login Succesfully"}

        
        
      } catch (error) {        

        console.log(error)
        //return {error: true, msg:error.response}
      }
      
    }

    async facebooklogin(facebookToken) {

      try {


        const FacebookUrlRequest = import.meta.env.VITE_FACEBOOK_REQUEST        

        const { data, error } = await axios.post(FacebookUrlRequest, { facebookToken })
        const { data:token } = await data       

        if(error){
          return {error: true, msg:"Something went wrong"}
        }
        localStorage.setItem("user", JSON.stringify(token.token));
        window.dispatchEvent(new Event("storage"));

        return {error: false, msg:"Login Succesfully"}
        
      } catch (error) {
        console.log(error)
        return {error: true, msg:error.response}
      }
    }

    async githublogin(githubToken) {           

      try {

        const GithubUrlRequest = import.meta.env.VITE_GITHUB_REQUEST
        console.log({GithubUrlRequest})
        const { data, error } = await axios.post(GithubUrlRequest, { githubToken })
        console.log({data, error})
        const { data:token } = await data       

        if(error){
          return {error: true, msg:"Something went wrong"}
        }
        localStorage.setItem("user", JSON.stringify(token.token));
        window.dispatchEvent(new Event("storage"));

        return {error: false, msg:"Login Succesfully"}
        
        
      } catch (error) {
        console.log(error)
        return {error: true, msg:error.response}
      }
    }


    async twitterlogin(twitterToken) {   
      
      console.log({twitterToken})
      
      /*

      try {

        const TwitterUrlRequest = import.meta.env.VITE_TWITTER_REQUEST
        console.log({TwitterUrlRequest})
        const { data, error } = await axios.post(TwitterUrlRequest, { twitterToken })
        console.log({data, error})
        const { data:token } = await data       

        if(error){
          return {error: true, msg:"Something went wrong"}
        }
        localStorage.setItem("user", JSON.stringify(token.token));
        window.dispatchEvent(new Event("storage"));

        return {error: false, msg:"Login Succesfully"}
        
        
      } catch (error) {
        console.log(error)
        return {error: true, msg:error.response}
      }
      */
    }


    async register(email, password) {

      try {

        const RegisterUrlRequest = import.meta.env.VITE_REGISTER_REQUEST

        const { data, error} = await axios.post(RegisterUrlRequest, { email, password })

        if(error){
          return {error: true, msg:"Something went wrong"}
        }

        return {error: false, msg:"User created"}


      } catch (error) {
        return {error: true, msg:error.response.data.message}
      }      
    }

  
    async logout() {
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("storage"));
    }  
    
  
    async getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));;
    }


    async getUserInformation(token) { 

      try {  

        const GetUserInformationUrlRequest = import.meta.env.VITE_GETUSERINFORMATION_REQUEST
          
        const {data, error} = await axios.post(GetUserInformationUrlRequest, {}, {
          headers: {
          'auth-token' : token
          }
        }) 

        if(error){
          return ({data:'Something Went Wrong', error:error})  
        }

        return ({data:data.data, error:data.error})

        
          
      } catch (error) {                          
          return {error: true, msg:error.response.data.message}
      }       
    }

    async updateUserInformation(CurrentToken, userInformation){

            
      try {        
        
        const UpdateUserInformationUrlRequest = import.meta.env.VITE_UPDATEUSERINFORMATION_REQUEST

        const {data, error} = await axios.post(UpdateUserInformationUrlRequest, userInformation, {
          headers: {
            'auth-token' : CurrentToken
            }
        })

        if(error){
          return ({data:'Something Went Wrong', error:error})  
        }

        if(data.token){
          localStorage.setItem("user", JSON.stringify(data.token));
          
        }

        return ({data:'Data Updated', error:data.error})
        
      } catch (error) {
        return {
          error:error,
          data:null
        }
      }
      
    }
    
  }
  
  export default new AuthService();