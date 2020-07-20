const getTimeByMinute = (minute) => {
  return Date.now()/1000 - minute * 60;
}

function isNeededToReloadData(timeVariable) {
  const prevGetDataTime = localStorage.getItem(timeVariable);

  console.log("prevGetDataTime: ")

  if(!prevGetDataTime || prevGetDataTime < getTimeByMinute(1)) {
    return true;
  }

  return false;
}

export default isNeededToReloadData;