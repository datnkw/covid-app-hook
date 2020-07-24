export const getAuthInfo = store => store.auth;

export const getWorldInfoByName = (store, name) =>  
  store.worldInfo[name] || {data: [], time: null};