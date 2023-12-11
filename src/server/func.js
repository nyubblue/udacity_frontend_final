/* call the API */
const connectSentimentAPI = async (baseUrl, apiKey, jsonSelector, textInput, lang) => {
  const fetch = require('node-fetch');
  const res = await fetch(baseUrl + apiKey + jsonSelector + textInput + lang)
  try {
    const data = await res.json();
    console.log("Data received from the server: ")
    console.log(data)
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
}

//call OpenApi (GET)
const callOpenApi = async fullUrl => {
  const response = await fetch(fullUrl)
  try {
      const data = await response.json()
      return data
  } catch (error) {
      console.log('error', error)
  }
}

async function procAs(data, placeName, url) {
  let promiseData = callOpenApi(`${url}&q=${placeName}`);
  data = await promiseData;
}

const getDataFromPlace = function(data){
  let returndata = null;
      if(data != null && data != undefined) {
        const geonames = data.geonames;
        if(data.totalResultsCount != 0 && geonames != undefined && geonames.length != 0) {
          returndata = {lat: geonames[0].lat, long: geonames[0].lng, country: geonames[0].countryName, name: geonames[0].name};
        }
      }
  return returndata;
}

const getWeDataFromGeonames = function (data, date) {
  let returndata = null;
  if (data != null && data != undefined && data.data != null && data.data != undefined) {
    const refItem = data.data.find(item => item.datetime == date);
    if (refItem && Object.keys(refItem).length != 0) {
      returndata = {
        description: refItem.weather.description,
        temp: refItem.temp,
        icon: refItem.weather.icon
      }
    } else {
      returndata = {
        description: "Moderate rain",
        temp: 25.7,
        icon: 'r02d'
      }
    }
  }
  return returndata;
}

const getPixePhoto = function(photos) {
  let returndata = null;
  if(photos && Object.keys(photos).length != 0 && photos.total > 0) {
    returndata = photos.hits[0].webformatURL;
  }
return returndata;
}

module.exports = {
  connectSentimentAPI,
  callOpenApi,
  getDataFromPlace,
  getWeDataFromGeonames,
  getPixePhoto
}