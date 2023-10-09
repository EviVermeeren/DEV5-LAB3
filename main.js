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
        console.log(data);

        data.results.forEach((movie, index) => {
          const movieTitle = movie.title;
          const moviedesc = movie.overview;
          const backdropPath = movie.backdrop_path;
          const movieId = movie.id; // Get the movie ID

          // Construct the TMDb movie URL using the ID
          const movieUrl = `https://www.themoviedb.org/movie/${movieId}`;

          // Create the movie title link
          const movieTitleLink = document.createElement("a");
          movieTitleLink.href = movieUrl;
          movieTitleLink.textContent = movieTitle;

          // Create the description paragraph
          const descParagraph = document.createElement("p");
          descParagraph.textContent = moviedesc;

          // Find the container for this movie and append the elements
          const containerId = `#movie${index + 1}`;
          const movieContainer = document.querySelector(containerId);

          movieContainer.appendChild(movieTitleLink);
          movieContainer.appendChild(descParagraph);
        });
      })
      .catch((err) => console.error(err));
  }
}

let app = new App();
