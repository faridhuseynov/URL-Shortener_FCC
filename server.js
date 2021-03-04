const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dns = require("dns");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({optionsSuccessStatus:200}));

app.use("/public",express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));

// var w3 = dns.lookup('www.w3schools.com', function (err, addresses, family) {
    //     console.log(addresses);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/views/index.html");
})




app.listen(port,()=>{
    console.log("App started at port: "+port);
});

