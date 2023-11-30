var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//configure env variables
const dotenv = require('dotenv');
const connectSentimentAPI = require('./func');
dotenv.config();

const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key=';
const apiKey = process.env.API_KEY
const selectAdd = "&txt=";
const lang = "&lang=en";

var projectData = {};

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('dist'))
console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/sentiment', callApiAylien);

function callApiAylien(req, res) {
    let dataTxt = req.body.txt;
    connectSentimentAPI(baseURL, apiKey, selectAdd, dataTxt, lang)
        .then(function (data) {
            projectData = data;
            res.send(projectData);
        })
}

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

