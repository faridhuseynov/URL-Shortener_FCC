const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use("/public",express.static(__dirname+"/public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/views/index.html");
})

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("App started at port: "+port);
});

