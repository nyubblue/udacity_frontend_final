/* update UI */
const updateUI = (newData) => {

    const frameData = document.createDocumentFragment();
    if (newData.status && newData.status.code == "0") {
        let divAgree = document.createElement('div');
        divAgree.textContent = `Agreement: ${newData.agreement.toLowerCase()}`;
        divAgree.classList.add('result-data');
        divAgree.id = 'agreement';
        frameData.appendChild(divAgree);

        let divconfidence = document.createElement('div');
        divconfidence.textContent = `Confidence: ${newData.confidence}%`;
        divconfidence.classList.add('result-data');
        frameData.appendChild(divconfidence);

        let divsubj = document.createElement('div');
        divsubj.textContent = `Subjectivity: ${newData.subjectivity.toLowerCase()}`;
        divsubj.classList.add('result-data');
        frameData.appendChild(divsubj);

        let divScore = document.createElement('div');
        divScore.textContent = `Sentiment: ${newData.score_tag}`;
        divScore.classList.add('result-data');
        frameData.appendChild(divScore);
    } else {
        const divErr = document.createElement("div");
        if (!newData.status || newData.status && newData.status.msg == undefined) {
            divErr.textContent = `A error is happened~`;
        } else {
            divErr.textContent = `${newData.status.msg}`;
        }
        divErr.id = 'agreement';
        divErr.classList.add("error-msg");
        frameData.appendChild(divErr);
    }
    return frameData;
};

export { updateUI }