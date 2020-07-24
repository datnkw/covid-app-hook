const getTimeByMinute = (minute) => {
  return Date.now()/1000 - minute * 60;
}

function checkShouldReloadData(time = null) {
  if(!time || time < getTimeByMinute(1)) {
    return true;
  }

  return false;
}

export default checkShouldReloadData;