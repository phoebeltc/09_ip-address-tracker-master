const searchInput = document.querySelector('#searchInput'); 
const btnSubmit = document.querySelector('#btnSubmit');
const ipAddress = document.querySelector('#ipAddress'); 
const locationId = document.querySelector('#location'); 
const timezone = document.querySelector('#timezone'); 
const isp = document.querySelector('#isp'); 


const map = L.map('map').setView([51.505, -0.09], 13);

    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
    });

    googleStreets.addTo(map);


const setData = (data) => {
    ipAddress.innerText = data.ip; 
    locationId.innerText = `${data.location.city}, ${data.location.region}`; 
    timezone.innerText = `UTC ${data.location.timezone}`; 
    isp.innerText = data.isp; 

    const lag = data.location.lag; 
    const lng = data.location.lng; 

}


const getApiResult = async(domain) => {

    let url = "https://geo.ipify.org/api/v2/country,city?apiKey=at_Mbom9IaHNpvUmNYkOXv2NeRsLLkIH";
    if (domain) url = url.concat(`&domain=${domain}`); 

    return fetch(url)
    .then((response) => response.json())
    .then((data) => setData(data));

} 

window.addEventListener('load', () => {
    getApiResult(); 
})

btnSubmit.addEventListener('click', () => {
    if (searchInput.value) getApiResult(searchInput.value);
})