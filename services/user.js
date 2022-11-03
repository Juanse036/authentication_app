const { supabase } = require('./supabase')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const axios = require('axios');

const { OAuth2Client } = require("google-auth-library");
const { google } = require('googleapis');

async function ValidateUniqueEmail(email){

    let { data: users, error } = await supabase
        .from('users_auth_app')
        .select("*")
        .eq('email', email)

    //console.log(users)
    return (users.length > 0)

}

async function Login({email, password, authoutside = false}){  

    let token;
    
    let { data: users, error } = await supabase
    .from('users_auth_app')
    .select("*")
    .eq('email', email)    
    

    if(users.length === 0){            
        return {
            data:'Email not found, Please Register',
            error:true
        }
    }

    if(users[0].authoutside && !authoutside){
        return {
            data:`Please Login with ${users[0].authmethod}`,
            error:true
        }
    }
    
    
    if (authoutside){
        token = jwt.sign({        
            email: users[0].email,
            authmethod: users[0].authmethod
        }, process.env.TOKEN_SECRET); 
        
    } else {
        
        const validPassword = await bcrypt.compare(password, users[0].password);

        if(!validPassword){            
            return {
                data:'Invalid password',
                error:true
            }
        }    
        
        token = jwt.sign({        
            email: users[0].email,
            password: users[0].password
        }, process.env.TOKEN_SECRET);  

    }
    
    return {
        data:'Bienvenido',
        token:token,
        error:null
    }
}


async function getAccessTokenFromCode(googleToken) {

    const { data } = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: 'post',
        data: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: 'http://127.0.0.1:5173/google',
        grant_type: 'authorization_code',
        code:googleToken,
        },
    });
    //console.log(data);// { access_token, expires_in, token_type, refresh_token }
      return data.access_token;
}

async function getDataFromToken(access_token){

    const { data } = await axios({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'get',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      return data;
}


async function googleLogin({googleToken}){    

    const access_token = await getAccessTokenFromCode(googleToken)
    const googleData = await getDataFromToken(access_token)

    if (!(await ValidateUniqueEmail(googleData.email))){        
        const { data, error } = await supabase
        .from('users_auth_app')
        .insert([
          { email: googleData.email, 
            name: googleData.name,
            photo: googleData.picture,
            authoutside: true,
            authmethod: 'google'
          },
        ])        
    }

    const LoginData = await Login({email: googleData.email, password: '', authoutside: true})

    return LoginData;      

}


async function SignIn({email, password}){    

    if(await ValidateUniqueEmail(email)){            
        return {
            data:'Email already exist, please Login',
            error:true
        }
    }
    
    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    
    const { data, error } = await supabase
    .from('users_auth_app')
    .insert([
      { email: email, password: hashpassword},
    ])
    
    return {
        data:data,
        error:error
    }    
}  

async function GetUserInformation(user){

    const { email } = user    

    let { data: users, error } = await supabase
    .from('users_auth_app')
    .select("email, name, bio, phone, photo")
    .eq('email', email)    

    return {
       data: users[0],
       error: error
    }

}

async function UploadPhoto(ImageName){
   
    const { data } = supabase
        .storage
        .from('images-auth-app')
        .getPublicUrl(ImageName)

    return data

}

async function ValidateUpdateData(body, email, photo){

    let updatedata = {}   
    
    if (body.email && body.email !== '' && body.email !== email){
        
        if(await ValidateUniqueEmail(body.email)){            
            return {
                updatedata:'This mail already exists.',
                err:true
            }
        }
        updatedata.email = body.email
    }    
    
    if(body.photo === 'true'){      
        const CurrentDate = new Date().valueOf();
        const ImageName = photo.originalname + CurrentDate

        const { data, error } = await supabase.storage
            .from('images-auth-app')
            .upload(ImageName, photo.buffer,{
                contentType: photo.mimetype,  // make sure this content type matches your local file
                upsert: true,
              })
        
        const photoURL = await UploadPhoto(ImageName)
        updatedata.photo = photoURL.publicURL
    }   
    
    if(body.photo === 'false' && body.photoURL !== ''){        
        updatedata.photo = body.photoURL
    }

    if (body.password && body.password !== ''){
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(body.password, salt);
        updatedata.password = hashpassword
    }

    if (body.name && body.name !== ''){
        updatedata.name = body.name
    }

    if (body.bio && body.bio !== ''){
        updatedata.bio = body.bio
    }

    if (body.phone && body.phone !== ''){
        updatedata.phone = body.phone
    }

    return {
        updatedata:updatedata,
        err: null
    }
}
  

async function UpdateUserInformation(user, body, photo){

     
    const { email, password } = user
    let token = null;    
    
    let {updatedata, err} = await ValidateUpdateData(body, email, photo)   

    if (err) {
        return {
            data:updatedata,
            token:token,
            error:err
        }
    }

    if (updatedata.email || updatedata.password){
        let tempemail = updatedata.email ? updatedata.email : email
        let temppassword = updatedata.password ? updatedata.password : password
        
        token = jwt.sign({        
            email: tempemail,
            password: temppassword
        }, process.env.TOKEN_SECRET); 
    }       

    const {data, error} = await supabase
        .from('users_auth_app')
        .update(updatedata)
        .eq('email', email)

    return {
        data: data,
        error: error,
        token:token
    }

}


module.exports = {
    Login,
    googleLogin,
    SignIn,
    GetUserInformation,
    UpdateUserInformation
  }