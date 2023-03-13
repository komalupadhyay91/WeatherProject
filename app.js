const express=require('express');
const app=express();
const https= require("https");
const bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));




app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
   
});
app.post("/", function(req, res){
    const query=req.body.cityName;
const appid="4e2c4d3fa74cb9a655ce36221c9bd74a";
const units = "metric"
const url= "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&units=" +units +"&appid="+appid;
https.get(url,function(response){
    response.on("data", function(data){
        const weatherData= JSON.parse(data);
        const temp= weatherData.main.temp;
        const weatherDescription= weatherData.weather[0].description;
        const icon= weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<p>The temperature in " +query+ " is "+ temp + " degree Celsius</p>");
        res.write("<p>The weather is currently "+ weatherDescription + "</p>");
        res.write("<img src="+ imageURL +">");
        res.send();
    })

})
});


app.listen(3000, function(){
    console.log("Server started on port 3000");

})