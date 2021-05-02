//google maps

function initMap() {
  const myLatlng = { lat: 0, lng: 0 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: myLatlng,
  });
  
  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: "Your Travel Destination",
    position: myLatlng,
  });
  infoWindow.open(map);
  
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      );
      
      infoWindow.open(map);
      
      map.setCenter(mapsMouseEvent.latLng);
      map.setZoom(3);
      //Marker
      marker = new google.maps.Marker({
        position: mapsMouseEvent.latLng,
        map: map,
      });
    });
    
  }
  
window.onload = function(){

  //COVID NEWS Results

  var input = document.forms.theForm.theForm1;
  var result = input.value;
  //IF search is set (Not working)
  if (result) {
    // console.log("this is the" + result)

  fetch('https://covid-19-news.p.rapidapi.com/v1/covid?q=covid&lang=en&country=&'+result+'&media=True', {
    
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "2d2dea647fmsh577c57bb54abd69p13249djsn06827c6f1fe8",
      "x-rapidapi-host": "covid-19-news.p.rapidapi.com"
    }
  })

.then(response => response.json())
.then(data => {

    var news = document.querySelector('.news');
    for (let i=0 ;i<3;i++) {
      // var input = document.forms.theForm;
      //News Data that is outputted
      var newsData = `<div class="newsSlot">
        <img src="${data.articles[i].media}" alt="headline image from each article">
        <p>${data.articles[i].title}</p>
        <p>${data.articles[i].summary}</p>

        <a href="${data.articles[i].link}">
          Continue Reading...
        </a>
        </div>`;
        
        news.innerHTML += newsData;

      }
      
    })

.catch(err => {

    console.error(err);

});
  } else 
  // IF Search is not set, set to Canada COVID News
  {
    fetch('https://covid-19-news.p.rapidapi.com/v1/covid?q=covid&lang=en&country=CA&media=True', {
    
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "2d2dea647fmsh577c57bb54abd69p13249djsn06827c6f1fe8",
        "x-rapidapi-host": "covid-19-news.p.rapidapi.com"
      }
    })
  
  .then(response => response.json())
  .then(data => {
  
      var newsResults = document.querySelector('.news');
      for (let i=0 ;i<3;i++) {
        var input = document.forms.theForm;
        var covidNews = `<div class="newsSlot">
          <img src="${data.articles[i].media}" alt="headline image from each article">
  
          <p>${data.articles[i].title}</p>
          <p>${data.articles[i].summary}</p>
  
          <a href="${data.articles[i].link}">
              Continue Reading...
          </a>
          </div>`;
          newsResults.innerHTML += covidNews;
        }
        
      })
  .catch(err => {
      console.error(err);
  });
  }

  //YouTube

$(document).ready(function(){
  //Setting API Key
  var apiKey = 'AIzaSyDphEohRTk4qssurKERev65mubm3J4iY8k'
  var video = '';

  //Determine if form is searching
  $("#form").submit(function (event) {
    event.preventDefault()

    var search = $("#search").val()
    videos(apiKey, search, 4)

  })

  function videos(key, search, maxResults) {

    $.get('https://www.googleapis.com/youtube/v3/search?key=' + key
    + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function(data){

      data.items.forEach(item => {
        video = `

        <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>

        `

        $("#videos").append(video);
      });
    })

  }
})
}
//Sources = 
//COVID:
//https://www.youtube.com/watch?v=Go6SK7qr36k
//https://rapidapi.com/kotartemiy/api/covid-19-news
//YouTube =
//https://www.youtube.com/watch?v=EAyo3_zJj5c
//https://developers.google.com/youtube/v3/docs/search
//Google Maps +
//lab 7 HTTPS 5203
