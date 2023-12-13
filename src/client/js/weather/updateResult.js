import { getDiffCurrentDay } from "../utils/utils";

/* update UI */
const updateUI = (newData, isInit) => {
    const frameData = document.createDocumentFragment();

    if (newData.statusCode == 0) {
        let tripItem = document.createElement('div');
        tripItem.classList.add('trip-item');
        tripItem.id = newData.id;
        tripItem.dataset.startDate = newData.date;
        let figure = document.createElement('figure');
        figure.classList.add('img-item');
        let imgItem = document.createElement('img');
        imgItem.classList.add('img');
        imgItem.setAttribute('src', newData.imageURL);
        imgItem.setAttribute('alt', `${newData.geonames.name}, ${newData.geonames.country}`);
        figure.appendChild(imgItem);
        tripItem.appendChild(figure);

        let content = document.createElement('div');
        content.classList.add('content');
        let tripHead = document.createElement('div');
        tripHead.classList.add('trip-head');
        let tripCont = document.createElement('h4');
        tripCont.textContent = `My trip to: ${newData.geonames.name}, ${newData.geonames.country}`;
        tripHead.appendChild(tripCont);
        content.appendChild(tripHead);
        let areaBtn = document.createElement('div');
        content.classList.add('btn-area');
        let btn1 = document.createElement('button');
        btn1.classList.add('btn')
        btn1.classList.add('s');
        btn1.classList.add('bg-lightp');
        btn1.textContent = 'remove trip';
        btn1.setAttribute('onclick', `return Client.deleteTrip('${newData.id}')`)
        areaBtn.appendChild(btn1);
        if (!newData.endDate) {
            let btn2 = document.createElement('button');
            btn2.classList.add('btn')
            btn2.classList.add('s');
            btn2.classList.add('bg-lightp');
            btn2.textContent = 'Add trip plan';
            btn2.setAttribute('onclick', `return Client.addPlanClick('${newData.id}')`)
            areaBtn.appendChild(btn2);
        }
        content.appendChild(areaBtn);
        let detail = document.createElement('div');
        detail.classList.add('detail');
        let headD = document.createElement('p');
        let diffDays = getDiffCurrentDay(newData.date);
        headD.innerHTML = `${newData.geonames.name}, ${newData.geonames.country} is <em>${diffDays} days</em> away`;

        detail.appendChild(headD);
        let br = document.createElement('br');
        detail.appendChild(br);
        let dtMore = document.createElement('div');
        dtMore.classList.add('dt-more');
        dtMore.innerHTML = `<p>Temperature : ${newData.weData.temp}</p><p>${newData.weData.description}</p>`;
        detail.appendChild(dtMore);

        let iconDiv = document.createElement('div');
        let iconImg = document.createElement('img');
        iconImg.src = `https://cdn.weatherbit.io/static/img/icons/${newData.weData.icon}.png`;
        iconImg.style.height = '4.5rem';
        iconImg.style.width = '4.5rem';
        iconDiv.appendChild(iconImg);
        detail.appendChild(iconDiv);

        if (newData.endDate) {
            let plandDateDiv = document.createElement('div');
            plandDateDiv.classList.add('plan-more')
            plandDateDiv.innerHTML = `<p>Start Date: ${newData.date}</p><p>End Date: ${newData.endDate}</p>`
            detail.appendChild(plandDateDiv);
        }

        content.appendChild(detail);
        tripItem.appendChild(content);
        frameData.appendChild(tripItem);

        //If not init screen, process for localStorage
        if (!isInit) {
            let appDataList = localStorage.getItem('appDataList');
            if (!localStorage.getItem('appDataList')) {
                appDataList = [];
            } else {
                appDataList = JSON.parse(appDataList)
            }

            appDataList.push(newData);
            localStorage.setItem('appDataList', JSON.stringify(appDataList))
        }
    }
    return frameData;
};

export { updateUI }