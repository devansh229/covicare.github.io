const { json } = require("express");
const express = require("express");
const https = require("https");
const app = express();
app.set('view engine','ejs');

 


app.get("/",function(req,res){
    const url = "https://api.covid19api.com/summary";

    
    https.get(url,function(response,data){
         console.log(response.statusCode);
         
       
         let wdata = '';

         response.on('data', data => wdata += data);
         
         response.on('end', function(){ 
            const pwdata = JSON.parse(wdata);
             const temp = pwdata.Countries[76].TotalDeaths;
             const re = pwdata.Countries[76].TotalRecovered;
             const totalcase = pwdata.Countries[76].TotalConfirmed;
             const newc = pwdata.Countries[76].NewConfirmed;
             const newd = pwdata.Countries[76].NewDeaths;
             const rewr = pwdata.Countries[76].NewRecovered;
             res.render("covi",{death: temp , recover: re, active: totalcase ,newcase: newc , newdeath: newd, newrecover: rewr});
        })
        }) 
            
   

     app.use(express.static(__dirname));  
  //  res.sendFile(__dirname + "/index.html");
});


app.listen(3000,function(){
    console.log("running");
});
