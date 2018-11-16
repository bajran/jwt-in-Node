const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req, res) =>{
    res.json({
        message: 'Welcome to the API'
    });
});


//verify is middleware function, which is used to authenticate token

app.post('/api/post',verifyToken,(req, res)=>{
    jwt.verify(req.token,'xxsecretxx',(err, authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Post Created',
                authData
            });
        }
    })


});


app.post('/api/login', (req, res)=>{
    const user = {
        id: 1,
        username: 'a',
        email: 'a@a.com'
    }

    jwt.sign({user}, 'xxsecretxx', { expiresIn: '30s' } ,(err, token)=>{
        res.json({
            token
        })
    })
});

//Verify Token
function verifyToken(req, res, next){
    //Get auth header value
    const bearerHeader  = req.headers['authorization'];
    if(typeof bearerHeader  !== 'undefined'){
        req.token = bearerHeader;
         next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(5000,()=>{
    console.log('Server Started');
})