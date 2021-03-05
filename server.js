const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");
const url = require("url");

const app = express();
const port = process.env.PORT || 3000;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
console.log(password);
const uri = 'mongodb+srv://<username>:<password>@freecodecamp.hyhy6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
var websites={"1":"https://www.facebook.com"};
app.use(cors({optionsSuccessStatus:200}));

app.use("/public",express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));

// var w3 = dns.lookup('www.w3schools.com', function (err, addresses, family) {
    //     console.log(addresses);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/views/index.html");
})

app.get("/api/shorturl/:short",(req,res)=>{
    var link = req.params.short;
    var url = websites[link];
    if(url==undefined){
     res.json({"error":"No short URL found for the given input"});
    }else{
        res.redirect(url);
    }
})

app.post('/api/shorturl/new',(req,res)=>{
    const submittedUrl=(req.body.website);
    const check = submittedUrl.match(/^https:\/\/www\./g)?true:(submittedUrl.match(/^http:\/\/www\./g)?true:false);
    if(!check){
       return res.json({"error":"Invalid Hostname"});
    }
    const url = (submittedUrl.split("//"))[1];
        dns.lookup(url,(err,addresses,family)=>{
        console.log(err);
        if(err){
            res.json({"error":"Invalid Hostname"});
        }else{
            for(const [key,value] of Object.entries(websites)){
                if(value==submittedUrl){
                    return res.json({"original_url":submittedUrl,"short_url":key});
                }
            }
            var next = Object.keys(websites).length+1;
            websites[next]=submittedUrl;
            res.json({"original_url":submittedUrl,"short_url":next});
        }
    })
})

app.listen(port,()=>{
    console.log("App started at port: "+port);
});

