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

module.exports = connectSentimentAPI
