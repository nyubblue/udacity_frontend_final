const { default: fetch } = require("node-fetch");

const getDataFromPlace = function (data) {
  let returndata = null;
  if (data != null && data != undefined) {
    const geonames = data.geonames;
    if (data.totalResultsCount != 0 && geonames != undefined && geonames.length != 0) {
      returndata = { lat: geonames[0].lat, long: geonames[0].lng, country: geonames[0].countryName, name: geonames[0].name };
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

const getPixePhoto = function (photos) {
  let returndata = null;
  if (photos && Object.keys(photos).length != 0 && photos.totalHits > 0) {
    let last = photos.hits.length - 1;
    let indexRandom = Math.floor(Math.random() * (last + 1));
    returndata = photos.hits[indexRandom].webformatURL;
  }
  return returndata;
}

module.exports = {
  getDataFromPlace,
  getWeDataFromGeonames,
  getPixePhoto
}