require('dotenv').config();
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let search = $('#location').val();
    $('#location').val("");
    $.ajax({
      url:
      `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=85qIeD5k3D0HEMqZDqkOxEkVGf2uSEKl`,
      // url: `https://api.giphy.com/v1/gifs/random?api_key=85qIeD5k3D0HEMqZDqkOxEkVGf2uSEKl&tag=${search}&rating=PG`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        let giphyObject = response;
        console.log(response);
        let giphyURL = response.data[0].images.fixed_height_small.url;
        let giphyDesc = response.data[0].title;
        // $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
        // $('.showTemp').text(`The temperature in Fahrenheit is ${fhTemp}.\n The low temperature today will be ${fhLowTemp}`);

       $('.showImage').append(`The link returned is ${response.data[0].images.fixed_height_small.url}`);
      $('#giph-result').attr("src",giphyURL);
      $('#giph-result').attr("alt",giphyDesc);
      },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.");
      }
    });
  });
});


var addCheck = function(array, target) {
  var checkArray = []
  for(var i=0; i<array.length; i++) {
    var needToEqualTarget = target - array[i];
    checkArray = array.slice(i+1);
    if(checkArray.includes(needToEqualTarget) === true) {
      return true;
    }
  }
  return false;
}
