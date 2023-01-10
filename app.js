const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');
const path=require('path');
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.post("/",(req,res)=>{
    console.log(req.body.fname)
})
const port=3000;
app.use(express.static("public"))
app.get("/",(req,res)=>
{
    res.sendFile(__dirname+"/public/signup.html")
})

app.listen(port,()=>{
    console.log(`The server is started on port ${port}`);
})