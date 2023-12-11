import { postData } from "./connectUtil"
import { updateUI } from "./updateResult"
import { validatePlace, validateTripDate } from "./validate";

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let placeTxt = document.getElementById('locationName').value;
    let tripDate = document.getElementById('tripDate').value;

    const valPlace = validatePlace(placeTxt);
    if (valPlace.code > 0) {
        document.getElementById('locationName').focus();
        alert(valPlace.msg);
        return false;
    }

    const valTrip = validateTripDate(tripDate);
    if (valTrip.code > 0) {
        document.getElementById('tripDate').focus();
        alert(valTrip.msg);
        return false;
    }

    //convert format date
    tripDate = tripDate.replaceAll('/', '-');

    console.log("start call api");
    //call api for building item data
    postData('http://localhost:8081/api', { placeName: placeTxt, tripDate: tripDate })
        .then(function (res) {
            document.getElementById('trip-list').appendChild(updateUI(res, false));
        })
}

export { handleSubmit }
