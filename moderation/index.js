const express = require('express')
const bodyParser  = require('body-parser')
const axios = require('axios')
port = process.env.PORT || 4003;
const app = express();
app.use(bodyParser.json());

app.post('/events',async (req,res)=>{
    const{type,data} = req.body;
    if(type=='CommentCreated'){
        data.status =data.content.includes('orange')?'rejected':'approved';
        await axios.post('http://event-bus-srv:4005/events',{
            type: 'CommentModerated',
            data:{
                id:data.id,
                postId : data.postId,
                status : data.status,
                content :data.content
            }
        })
        res.send({});
    }
})
app.listen(port,()=>{
    console.log('Listening on port 4003')
})