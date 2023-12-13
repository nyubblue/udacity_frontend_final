/** check diff of date and current date (days) */
function getDiffCurrentDay(dateTxt) {
    let dateArr = dateTxt.split('/');
    let year = dateArr[0];
    let mm = dateArr[1];
    let dd = dateArr[2];

    // Get the current date
    const currentDate = new Date();
    const tripDate = new Date(parseInt(year), parseInt(mm) - 1, parseInt(dd));

    let differenceInTime = Math.round((tripDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    return differenceInTime;
}

export { getDiffCurrentDay }
