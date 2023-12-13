const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//configure env variables
const dotenv = require('dotenv');
const { GEONAMES_API_URL, PIXABAY_BASE_URL, WEATHER_BIT_API_BASE_URL } = require('./utils/constants');
const { callOpenApi } = require('./utils/connection');
const { getDataFromPlace, getWeDataFromGeonames, getPixePhoto } = require('./weatherService/func');
dotenv.config();

const WEATHER_BIT_API_KEY = process.env.WEATHER_BIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

let projectData = {};
let dataList = [];

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
    res.sendFile('dist/index.html');
})

app.get('/getAllData', function (req, res) {
    if (dataList.length != 0) {
        res.send({ code: 200, data: dataList });
    } else {
        res.send({ code: 200, err: 'No data' });
    }
})

/** api for search information of place, weather, images */
app.post('/api', function (req, res) {
    const placeName = req.body.placeName;
    const tripDate = req.body.tripDate;
    projectData = {};
    projectData.place = placeName;
    let slashTripDate = tripDate;
    slashTripDate = slashTripDate.replaceAll('-', '/');
    projectData.date = slashTripDate;
    let dataFilter = dataList.filter((item) => {
        return item.date == slashTripDate && item.place == placeName;
    });

    if (dataFilter.length != 0) {
        res.send({ statusCode: 22, msg: "Data is existed in App." });
        return;
    }

    try {
        //Call api get long, lat
        console.log(`GEO: ${GEONAMES_API_URL}&q=${placeName}`)
        callOpenApi(`${GEONAMES_API_URL}&q=${placeName}`)
            .then((data) => {
                projectData.geonames = getDataFromPlace(data);
                console.log(projectData);
                if (projectData.geonames != null) {
                    //Call api get weather with date
                    console.log(`Weather: ${WEATHER_BIT_API_BASE_URL}?lat=${projectData.geonames.lat}&lon=${projectData.geonames.long}&key=${WEATHER_BIT_API_KEY}&days=16`);
                    callOpenApi(`${WEATHER_BIT_API_BASE_URL}?lat=${projectData.geonames.lat}&lon=${projectData.geonames.long}&key=${WEATHER_BIT_API_KEY}&days=16`)
                        .then((weData) => {
                            projectData.weData = getWeDataFromGeonames(weData, tripDate);
                            if (projectData.weData == null) {
                                res.send({ statusCode: 1, msg: "no data" });
                            } else {
                                //Call api get image of place
                                let p = encodeURIComponent(projectData.geonames.name);
                                console.log(`Img: ${PIXABAY_BASE_URL}?key=${PIXABAY_API_KEY}&p=${p}&min_width=500&min_height=500&image_type=photo&category=places`);
                                callOpenApi(`${PIXABAY_BASE_URL}?key=${PIXABAY_API_KEY}&p=${p}&min_width=500&min_height=500&image_type=photo&category=places`)
                                    .then((photos) => {
                                        let photo = getPixePhoto(photos);
                                        projectData.statusCode = "0"
                                        if (photo != null) {
                                            projectData.imageURL = photo;
                                            projectData.id = Number(new Date()).toString(36);
                                            dataList.push(projectData);
                                            console.log(projectData);
                                            res.send(projectData);
                                        } else {
                                            // If name is not found any image, change p for country info
                                            p = encodeURIComponent(projectData.geonames.country);
                                            console.log(`Img Again: ${PIXABAY_BASE_URL}?key=${PIXABAY_API_KEY}&p=${p}&min_width=500&min_height=500&image_type=photo`)
                                            callOpenApi(`${PIXABAY_BASE_URL}?key=${PIXABAY_API_KEY}&p=${p}&min_width=500&min_height=500&image_type=photo`)
                                                .then((photos1) => {
                                                    photo = getPixePhoto(photos1);
                                                    if (photo != null) {
                                                        projectData.imageURL = photo;
                                                    } else {
                                                        //Set default img
                                                        projectData.imageURL = './img/default.jpg';
                                                    }
                                                    projectData.id = Number(new Date()).toString(36);
                                                    dataList.push(projectData);
                                                    console.log(projectData);
                                                    res.send(projectData);
                                                });
                                        }
                                    });
                            }

                        }).catch((error) => {
                            console.log('Error connect to external api');
                            res.send({ statusCode: 23, msg: "Error connect to external api" });
                        });
                } else {
                    res.send({ statusCode: 1, msg: "no data" });
                }
            });
    } catch (error) {
        res.send({ statusCode: 2, error: error });
    }
})

//delete a element of trip item by id
app.get('/deleteTrip', function (req, res) {
    let id = req.query.id;
    try {
        if (dataList.length != 0) {
            dataList = dataList.filter((item) => {
                return item.id != id;
            });
            res.send({ code: 0, msg: "Deleting is successfully." });
        } else {
            res.send({ code: 9, msg: 'Trips list is empty' });
        }
    } catch (error) {
        res.send({ code: 500, msg: 'internal error' });
    }
})

//delete a element of trip item by id
app.get('/addPlanDate', function (req, res) {
    let id = req.query.id;
    let endDate = decodeURIComponent(req.query.endDate);
    try {
        if (dataList.length != 0) {
            let dataItem = dataList.find((item) => {
                return item.id == id;
            });

            if (dataItem) {
                dataItem.endDate = endDate;
                res.send({ code: 0, msg: "Add Plan Date is successfully.", data: dataList });
                return;
            } else {
                res.send({ code: 404, msg: 'Data is not existed.' });
                return;
            }

            res.send({ code: 0, msg: "Deleting is successfully." });
        } else {
            res.send({ code: 9, msg: 'Trips list is empty' });
        }
    } catch (error) {
        res.send({ code: 500, msg: 'internal error' });
    }
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081! OK')
})

