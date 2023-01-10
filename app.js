const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');
const path=require('path');
const https=require('https');
const { url } = require('inspector');
const { response } = require('express');
const dotenv=require('dotenv').config();
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.post("/",(req,res)=>{
   var firstName=req.body.fname
   var lastName=req.body.lname
   var email =req.body.email
   var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
   };
   const jsonData=JSON.stringify(data);
   const url=`https://${process.env.DC}.api.mailchimp.com/3.0/lists/${process.env.UID}`;
   const options={
    method:"POST",
    auth:`payal:${process.env.APIKEY}`
   }
   const request=https.request(url,options,(response)=>{
        if(response.statusCode===200){
            res.sendFile(__dirname+"/public/sucess.html")
        }
        else{
            res.sendFile(__dirname+"/public/failure.html")

        }
        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
   })
   request.write(jsonData);
   request.end();
})
app.post("/failure",(req,res)=>{
    res.redirect("/");
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




