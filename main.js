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
    this.getMovies(); // Call getMovies here
  }

  getWeather() {
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lng}&hourly=temperature_2m,rain,cloudcover&current_weather=true&forecast_days=3`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let hour = new Date().getHours() + 20;
        console.log(hour);

        let cloudcover = data.hourly.cloudcover[hour];
        let rain = data.hourly.rain[hour];
        let temp = data.hourly.temperature_2m[hour];

        if (rain >= 1) {
          document.querySelector(".ad").style.background =
            "url('media/rain.jpg')";
          document.querySelector("#rain").style.display = "block";
        } else if (cloudcover <= 50) {
          document.querySelector(".ad").style.background =
            "url('media/sun.jpg')";
          document.querySelector("#sun").style.display = "block";
        } else if (cloudcover >= 50 || temp < 18) {
          document.querySelector(".ad").style.background =
            "url('media/fullcloud.jpg')";
          document.querySelector("#cold").style.display = "block";
        }

        document.querySelector(".ad").style.backgroundRepeat = "no-repeat";
        document.querySelector(".ad").style.backgroundSize = "cover";
        document.querySelector(".ad").style.backgroundPosition = "center";
        document.querySelector(".ad").style.backgroundAttachment = "fixed";
      })
      .catch((err) => console.log(err));
  }

  errorLocation(err) {
    console.log(err);
  }

  getMovies() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjE2NzIzZWZkNzUwOTI2MjU3OGRiZDNhYzJjYWE3NSIsInN1YiI6IjY1MjNkMmI5ZWE4NGM3MDBlYjllODJlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kOkiMGbkmTnYFPtMqcBLRzJMJdfSvY_bkcadE9FipoI",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the entire movie data object

        // Access and process the movie data as needed
        const firstMovie = data.results[0];
        const movieTitle = firstMovie.title;
        const movieOverview = firstMovie.overview;
        const movieReleaseDate = firstMovie.release_date;

        console.log("Movie Title:", movieTitle);
        console.log("Movie Overview:", movieOverview);
        console.log("Release Date:", movieReleaseDate);

        // You can update your UI or perform any other actions with this data
      })
      .catch((err) => console.error(err));
  }
}

let app = new App();
