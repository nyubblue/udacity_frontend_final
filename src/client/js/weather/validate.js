function validatePlace(inputText) {
  if (inputText == '') {
    return { code: 1, msg: 'Not Empty' }
  }

  const reg1 = /^[0-9a-zA-z ]+$/
  if (!reg1.test(inputText)) {
    return { code: 2, msg: 'The character is invalid' }
  }

  return { code: 0, msg: 'Success' }
}

function validateTripDate(inputText, startDate) {
  if (inputText == '') {
    return { code: 1, msg: 'Not Empty' }
  }

  const re = /^[0-9]{4}[/][0-9]{2}[/][0-9]{2}$/
  if (!re.test(inputText)) {
    return { code: 2, msg: 'Enter the format YYYY/MM/DD' }
  }

  let dateArr = inputText.split('/')
  let year = dateArr[0]
  let mm = dateArr[1]
  let dd = dateArr[2]

  if (parseInt(mm) == 0 || parseInt(mm) > 12) {
    return { code: 3, msg: 'Month is invalid.' }
  }

  // Get the current date
  const currentDate = new Date()

  const inputDate = new Date(parseInt(year), parseInt(mm) - 1, parseInt(dd))
  inputDate.setUTCHours(23, 59, 59, 999)
  if (parseInt(dd) == 0 || parseInt(dd) > 31 || isNaN(inputDate)) {
    return { code: 4, msg: 'Day is invalid.' }
  }

  if (startDate) {
    let dateArr1 = startDate.split('/')
    let year1 = dateArr1[0]
    let mm1 = dateArr1[1]
    let dd1 = dateArr1[2]
    const strDate = new Date(parseInt(year1), parseInt(mm1) - 1, parseInt(dd1))
    strDate.setUTCHours(23, 59, 59, 999)
    // Compare the input date with the current date
    if (inputDate < strDate) {
      return { code: 6, msg: 'Date must be more greater the start date' }
    }
  } else {
    // Compare the input date with the current date
    if (inputDate < currentDate) {
      return { code: 5, msg: 'Date is greater the current date' }
    }
  }



  return { code: 0, msg: 'Success' }
}

export { validatePlace, validateTripDate }
