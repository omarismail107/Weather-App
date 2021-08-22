const apiKey = "924ab3f820aace5b6c87a45b789630a1";
const form = document.querySelector(".top-banner form");
var inputValue = 0;
var url = "";
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".cities");
listValues = document.getElementById('listOfCities').getElementsByTagName('li');
differentInputs = new Set;
iconRightNow = "";

form.addEventListener("submit", e => {
  input = document.querySelector(".top-banner input");
  e.preventDefault();
  inputValue = input.value.toLowerCase();

  url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      if (weather[0]["icon"] == "03n")
        icon = "03d" + ".svg";
      else if (weather[0]["icon"] == "04n")
        icon = "04d" + ".svg";
      else if (weather[0]["icon"] == "09n")
        icon = "09d" + ".svg";
      else if (weather[0]["icon"] == "10n")
        icon = "10d" + ".svg";
      else if (weather[0]["icon"] == "11n")
        icon = "11d" + ".svg";
      else if (weather[0]["icon"] == "13n")
        icon = "13d" + ".svg";
      else if (weather[0]["icon"] == "50n")
        icon = "50d" + ".svg";
      else
        icon = weather[0]["icon"] + ".svg";

      if (differentInputs.has(inputValue)) {
        msg.innerHTML = "Please enter a unique city or enter the city followed by the country code <em>(e.g., US)</em>";
        return;
      }
      differentInputs.add(inputValue);

      const li = document.createElement("li");

      li.classList.add("city");
      tempInFarenheit = Math.round(main.temp * 1.8) + 32;


      const markup = `
      <h2 class="city-name" data-name="${name},${sys.country}">
        <span class="nameOfCity">${name}</span>
        <sup>${sys.country}</sup>
      </h2>
      
      <div class="city-temp">${tempInFarenheit}<sup>°F</sup>
      </div>
      <figure>
        <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
        <figcaption>${weather[0]["description"]}</figcaption>
      </figure>`;
      li.innerHTML = markup;
      list.appendChild(li);
      input.value = "";
    })
    .catch(() => {
      msg.textContent = "Please enter a valid city";
    });
});
