const $submitForm = document.querySelector("form");
const $locationInput = $submitForm.querySelector(".location-input");
const $message1 = document.querySelector("#message-1")
const $message2 = document.querySelector("#message-2")

$submitForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if($locationInput.value !== ""){
        $message1.textContent = "loading..."
        $message2.textContent = ""
        fetchWeatherData($locationInput.value);
        $locationInput.value = "";
    }
})


const fetchWeatherData = (location) => {
    fetch(`/weather?address=${location}`)
    .then(response=>response.json())
    .then(data=>{
        if(data.error){
            alert(data.error);
        } else {
            $message1.textContent = data.location;
            $message2.textContent = data.forecast;
        }
    })
}
