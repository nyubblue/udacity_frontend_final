import { postData } from "./connectUtil"
import { checkForName } from "./nameChecker"
import { updateUI } from "./updateResult"

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    if (!checkForName(formText)) {
        alert("Input is not empty!");
        return false;
    }

    postData('http://localhost' + ':8081/sentiment', { txt: formText })
        .then(function (res) {
            //console.log("::: Form Submitted Return OK::: " + res.status.code + res)
            document.getElementById('results').innerHTML = "";
            document.getElementById('results').appendChild(updateUI(res));
        })
}

export { handleSubmit }
