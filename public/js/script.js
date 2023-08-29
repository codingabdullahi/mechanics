const button = document.querySelector("#location");
// const inputlocation = document.querySelector("#location");
button.addEventListener("click", ()=>{
    if(navigator.geolocation){
        button.value = "Allow to detect location";
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        button.value = "Your browser not support";
    }
});

function onSuccess(position){
    button.value = "Detecting your location...";
    let {latitude, longitude} = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=ff5bb39b31c5449ba6f9b57c7fe5376a`)
    .then(response => response.json()).then(response =>{
        let allDetails = response.results[0].components;
        console.table(allDetails);
        let {state, city, road} = allDetails;
        button.value = `${state} ,${city},${road}`;
    }).catch(()=>{
        button.value = "Something went wrong";
    });
}

function onError(error){
    if(error.code == 1){
        button.innerText = "You denied the request";
    }else if(error.code == 2){
        button.innerText = "Location is unavailable";
    }else{
        button.innerText = "Something went wrong";
    }
    button.setAttribute("disabled", "true");
}
const imageInput = document.getElementById('image-input');
const circle = document.querySelector('.circle');

imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    const imageUrl = URL.createObjectURL(file);
    circle.style.backgroundImage = `url(${imageUrl})`;
    circle.style.display = 'block';
  } else {
    circle.style.display = 'none';
  }
});





  

console.log('hello javascript running successfully ');

