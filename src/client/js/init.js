import { callOpenApi } from "./connectUtil";
import { updateUI } from "./updateResult";

function init() {

    try {
        callOpenApi(`http://localhost:8081/getAllData`)
            .then((data) => {
                if (data.code == 200 && !data.err) {
                    let appDataReloadList = data.data;
                    localStorage.setItem('appDataList', JSON.stringify(appDataReloadList))
                    appDataReloadList.forEach((item) => {
                        document.getElementById('trip-list').appendChild(updateUI(item, true));
                    });
                }
                //  else {    
                //     let appDataList = localStorage.getItem('appDataList');
                //     if (localStorage.getItem('appDataList')) {
                //         appDataList = JSON.parse(appDataList);
                //         if (appDataList.length != 0) {
                //             appDataList.forEach((item) => {
                //                 document.getElementById('trip-list').appendChild(updateUI(item, true));
                //             });
                //         }
                //     }
                // }
            }).catch((e) => {
                let appDataList = localStorage.getItem('appDataList');
                if (localStorage.getItem('appDataList')) {
                    appDataList = JSON.parse(appDataList);
                    if (appDataList.length != 0) {
                        appDataList.forEach((item) => {
                            document.getElementById('trip-list').appendChild(updateUI(item, true));
                        });
                    }
                }
            });
    } catch (error) {
        console.log('exception process');
    }

}

export { init }
