import axios from "axios";


class AuthService {

    async login(email, password) {      
      try {  
        
        const { data, error } = await axios.post('/api/user/login', { email, password })
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
        const { data, error } = await axios.post('/api/user/login/google', { googleToken })
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


    async register(email, password) {

      try {
        const { data, error} = await axios.post('/api/user/sign-in', { email, password })

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
          
        const {data, error} = await axios.post('/api/user/getuser', {}, {
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
        const {data, error} = await axios.post('api/user/updateuser', userInformation, {
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