class App {
  constructor() {
    this.getLocation();
    this.lat;
    this.lng;
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      this.gotLocation.bind(this),
      this.errorLocation.bind(this)
    );
  }

  gotLocation(result) {
    this.lat = result.coords.latitude;
    this.lng = result.coords.longitude;
    this.getWeather();
  }

  getWeather() {
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lng}&hourly=temperature_2m,rain,cloudcover,uv_index&current_weather=true&forecast_days=1`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let hour = new Date().getHours();
        console.log(hour);
        document.querySelector("#weather").innerHTML = data.hourly.rain[hour];
        document.querySelector("#temp").innerHTML =
          data.hourly.temperature_2m[hour];
        document.querySelector("#cloud").innerHTML =
          data.hourly.cloudcover[hour];
        document.querySelector("#uv").innerHTML = data.hourly.uv_index[hour];
      })
      .catch((err) => console.log(err));
  }

  errorLocation(err) {
    console.log(err);
  }
}

let app = new App();
