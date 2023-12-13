const { default: fetch } = require("node-fetch");

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

module.exports = {
    callOpenApi,
}