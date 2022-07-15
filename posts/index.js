const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes }= require('crypto')
const cors = require('cors');
const app = express();
const axios = require('axios');
port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());
app.get('/posts',(req,res)=>{
    res.send(posts); 
});
const posts  ={};
app.post('/posts',async (req,res)=>{
   const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id]={
        id,title
    };
   await axios.post('http://localhost:4005/events',{
        type: 'PostCreated',
        data: {
            id,title
        }
    })
    res.status(201).send(posts[id]);
})
app.post('/events',(req,res)=>{
    console.log('Recived Event',req.body.type);
    res.send({});
})
app.listen(port,()=>{
    console.log('Listening on 4000');
})