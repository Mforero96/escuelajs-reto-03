let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
let xhttp = new XMLHttpRequest();

const fetchData = (url_api) => {
  return new Promise(function(resolve, reject){

    xhttp.onreadystatechange = () => {
      try {
        if (xhttp.readyState === 4) {
          if (xhttp.status == 200){
            resolve(JSON.parse(xhttp.responseText) )
          }
          else {
            return reject();
          }
        }
      } catch (error) {
        console.error(error)
      }
    };
    xhttp.open('GET', url_api, false);//No sea asíncrono
    xhttp.send();
  })
};

const allData = {}; 

fetchData(API)
  .then(function(data){
    console.log('Primer Llamado...')
    allData.data1 = data
    return fetchData(API + data.results[0].id)
  })
  .then(function(data2){
    console.log('Segundo Llamado...')
    allData.data2 = data2
    return fetchData(data2.origin.url)
  })
  .then(function(data3){
    console.log('Tercer Llamado...');
    allData.data3 = data3
    console.log(allData.data1.info.count)
    console.log(allData.data3.dimension)
  })
  .catch(
    function(){
      console.log('ERROR');
    }
  )
/*Reto 3*/ 
/*
fetchData(API,  (error1, data1) => {
  if (error1) return console.error(`Error ${error1}`);
  console.log('Primer Llamado...')

  fetchData(`${API} ${data1.results[0].id}`, (error2, data2) => {
    if (error2) return console.error(error1);
    console.log('Segundo Llamado...')

    fetchData(data2.origin.url,  (error3, data3) => {
      if (error3) return console.error(error3);
      console.log('Tercero Llamado...')
      console.log(`Personajes ${data1.info.count}`);
      console.log(`Primer Personaje ${data2.name}`);
      console.log(`Dimensión: ${data3.dimension}`);
    });
  });
});*/