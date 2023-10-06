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

        let cloudcover = data.hourly.cloudcover[hour];
        let rain = data.hourly.rain[hour];

        if (rain > 1) {
          document.body.style.background = "url('media/rain.jpg')";
          document.querySelector("#regen1").innerHTML = "wel";
          document.querySelector("#regen2").innerHTML = "wel een";
        } else if (cloudcover === 0) {
          document.body.style.background = "url('media/sun.jpg')";
        } else if (cloudcover >= 10 && cloudcover < 30) {
          document.body.style.background = "url('media/smallcloud.jpg')";
          document.querySelector("#bewolking1").innerHTML = "maar een beetje";
          document.querySelector("#bewolking2").innerHTML = "wel";
        } else if (cloudcover >= 30 && cloudcover < 70) {
          document.body.style.background = "url('media/mediumcloud.jpg')";
          document.querySelector("#bewolking1").innerHTML = "tamelijk wat";
          document.querySelector("#bewolking2").innerHTML = "misschien geen";
        } else if (cloudcover >= 70 && cloudcover <= 100) {
          document.body.style.background = "url('media/fullcloud.jpg')";
          document.querySelector("#bewolking1").innerHTML = "veel";
          document.querySelector("#bewolking2").innerHTML = "geen";
        }

        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";

        let temp = data.hourly.temperature_2m[hour];
        document.querySelector("#temperatuur1").innerHTML = temp;

        if (temp < 10) {
          document.querySelector("#temperatuur2").innerHTML = "zeker een";
        } else if (temp >= 10 && temp < 20) {
          document.querySelector("#temperatuur2").innerHTML =
            "misschien wel een";
        } else if (temp >= 20) {
          document.querySelector("#temperatuur2").innerHTML = "geen";
        }

        let uv = data.hourly.uv_index[hour];

        if (uv > 3) {
          document.querySelector("#uv2").innerHTML = "best wel";
        } else if (uv > 5) {
          document.querySelector("#uv2").innerHTML = "zeker en vast";
        }

        document.querySelector("#uv1").innerHTML = uv;
      })
      .catch((err) => console.log(err));
  }

  errorLocation(err) {
    console.log(err);
  }
}

let app = new App();
