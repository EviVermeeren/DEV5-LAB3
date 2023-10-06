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

        const cloudcover = data.hourly.cloudcover[hour];
        const rain = data.hourly.rain[hour];

        document.querySelector("#weather").innerHTML = rain;

        if (rain > 1) {
          document.body.style.background = "url('media/rain.jpg')";
        } else if (cloudcover === 0) {
          document.body.style.background = "url('media/sun.jpg')";
        } else if (cloudcover >= 10 && cloudcover < 30) {
          document.body.style.background = "url('media/smallcloud.jpg')";
        } else if (cloudcover >= 30 && cloudcover < 70) {
          document.body.style.background = "url('media/mediumcloud.jpg')";
        } else if (cloudcover >= 70 && cloudcover <= 100) {
          document.body.style.background = "url('media/fullcloud.jpg')";
        }

        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";

        document.querySelector("#temp").innerHTML =
          data.hourly.temperature_2m[hour];
        document.querySelector("#cloud").innerHTML = cloudcover;
        document.querySelector("#uv").innerHTML = data.hourly.uv_index[hour];
      })
      .catch((err) => console.log(err));
  }

  errorLocation(err) {
    console.log(err);
  }
}

let app = new App();
