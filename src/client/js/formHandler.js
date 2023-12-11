import { callOpenApi, postData } from "./connectUtil"
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
            if (res.statusCode == 22) {
                alert(res.msg);
                document.getElementById('locationName').focus();
                return;
            }
            document.getElementById('trip-list').appendChild(updateUI(res, false));
            document.getElementById("addTripModal").style.display = "none";
            document.getElementById('locationName').value = '';
            document.getElementById('tripDate').value = '';
        })
}

/* delete Trip */
function deleteTrip(id) {
    callOpenApi(`http://localhost:8081/deleteTrip?id=${id}`)
        .then((data) => {
            if (data.code == 0) {
                let appDataList = localStorage.getItem('appDataList');
                if (localStorage.getItem('appDataList')) {
                    appDataList = JSON.parse(appDataList);
                    if (appDataList.length != 0) {
                        //delete this data at localStorage
                        let appDataRefLst = appDataList.filter((item) => item.id != id);
                        localStorage.setItem('appDataList', JSON.stringify(appDataRefLst));

                        //Delete layout
                        alert(data.msg);
                        let layoutItem = document.getElementById(id);
                        layoutItem.parentNode.removeChild(layoutItem);
                    }
                }
            } else {
                alert(data.msg);
            }
        })
        .catch((err) => {
            alert("Bad Request.");
        });
}

export { handleSubmit, deleteTrip }
