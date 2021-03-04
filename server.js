const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dns = require("dns");
const url = require("url");
const { parse } = require("path");

const app = express();
const port = process.env.PORT || 3000;
var websites={"1":"https://www.facebook.com"};
app.use(cors({optionsSuccessStatus:200}));

app.use("/public",express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));

// var w3 = dns.lookup('www.w3schools.com', function (err, addresses, family) {
    //     console.log(addresses);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/views/index.html");
})

// regex to remove the https, http, www
// url = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];

app.get("/api/shortulr/:short",(req,res)=>{
    var link = req.params;
    console.log(link);
})

app.post('/api/shorturl/new',(req,res)=>{
    const submittedUrl=JSON.stringify(req.body.website);
    const hostname = (url.parse(submittedUrl)).hostname;
    console.log(submittedUrl);
    console.log(hostname);
        dns.lookup(hostname,(err,addresses,family)=>{
        console.log(err);
        if(err){
            res.json({"error":"Invalid Hostname"});
        }else{
            for(const [key,value]of Object.entries(websites)){
                if(value==hostname){
                    return res.json({"original_url":hostname,"short_url":key});
                }
            }
            var next = Object.keys(websites).length+1;
            websites[next]=hostname;
            res.json({"original_url":hostname,"short_url":next});
        }
    })
})

app.listen(port,()=>{
    console.log("App started at port: "+port);
});

