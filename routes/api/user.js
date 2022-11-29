const express = require('express');
const router = express.Router();
const user = require('../../services/user')
const auth = require("../../middleware/auth")

const multer  = require('multer');
var upload = multer()


router.post('/sign-in', async function(req, res, next) {
    
    try {                
        const {data, error} = await user.SignIn(req.body)     
        
        if(error) {
            return res.status(401).send({
                message: data
            })
        }        
        res.json({
            data: data,
            error:error
        })
    } catch (error) {
        res.send(error);        
    }
});

router.get('/get', async function(req, res) {
    res.send('hello world');
})


router.post('/login', async function(req, res, next) {
    
    try {             
        
        const {data, error, token} = await user.Login(req.body)           
        
        if(error){
            return res.status(401).send({
                message: data
            })
        }
        
        res.header('auth-token', token).json({
            error:null,
            data: {token}
        })

    } catch (error) {
        res.send(error);        
    }
});


router.post('/login/google', async function(req, res, next) {
    
    
    try {      
        
        const {data, error, token} = await user.googleLogin(req.body)


        
        if(error){
            return res.status(401).send({
                message: data
            })
        }              
        
        res.header('auth-token', token).json({
            error:null,
            data: {token}
        })
        
        
    } catch (error) {
        res.send(error);        
    }
});

router.post('/login/facebook', async function(req, res, next) {
    
    try {                  
        
        const {data, error, token} = await user.facebookLogin(req.body)
        
        if(error){
            return res.status(401).send({
                message: data
            })
        }
        
        res.header('auth-token', token).json({
            error:null,
            data: {token}
        })
        
    } catch (error) {
        res.send(error);        
    }
});

router.post('/login/github', async function(req, res, next) {   
    
    try {                  
        
        const {data, error, token} = await user.githubLogin(req.body)
        
        if(error){
            return res.status(401).send({
                message: data
            })
        }
        
        res.header('auth-token', token).json({
            error:null,
            data: {token}
        })
        
    } catch (error) {
        res.send(error);        
    }
});

router.post('/getuser', auth,  async function(req, res, next) {    
    
    try {             
        
        const {data, error} = await user.GetUserInformation(req.user)           
        
        if(error){
            return res.status(401).send({
                message: data
            })
        }                
        
        res.json({
            data: data,
            error: error
        })

    } catch (error) {
        res.send(error);        
    }

    
});

router.post('/updateuser', auth, upload.single('Avatar'),  async function(req, res, next) {      
    
    try {                    
        
        const {data, error, token} = await user.UpdateUserInformation(req.user, req.body, req.file)           
        
        if(error){
            return res.status(401).send({
                message: data
            })
        }                       
        
        res.json({
            data: data,
            error: error,
            token:token
        })

    } catch (error) {
        res.send(error);        
    }

    
});

module.exports = router;