const express = require("express");
const https = require("https")
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {

    const query = req.body.cityName;
    const apiKey = "667c6aed3004273b8ec9ad2b7b9a7ba8";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=" + apiKey + ""

    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp
            const descriptions = weatherData.weather[0].description
            const icons = weatherData.weather[0].icon
            const imgurl = "http://openweathermap.org/img/wn/" + icons + "@2x.png"
            res.write("<h1>The Temprature in " + query+" is " + temperature + " degree celcious</h1>")
            res.write("<h3>The weth.ear seems in "+ query +"  " + descriptions + "</h3>")
            res.write("<img src= " + imgurl + ">");
            res.send();
        });
    })
})

app.listen(3000, function () {
    console.log("Running on server 3000");
})
