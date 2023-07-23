var opacity;
var opacityScale;
var slider = document.getElementById("slider");
var textInput = document.getElementById("textInput");
var timesteps;
var marker;
var geocodeMarker;
var polyline;
var astrodata; // Number of people and names of people in space
var ISSlatlngs = new Array();

// L.mapbox.accessToken = "pk.secret";
// var satelliteMap = "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=" + L.mapbox.accessToken;
// var lightMap = "https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=" + L.mapbox.accessToken;
// var darkMap = "https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=" + L.mapbox.accessToken;
// var mapboxAttribution =
//   'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

// var light = L.tileLayer(lightMap, { id: "mapbox.streets", maxZoom: 13, minZoom: 3 });
// var dark = L.tileLayer(darkMap, { id: "mapbox.streets", maxZoom: 13, minZoom: 3 });
// var satellite = L.tileLayer(satelliteMap, { id: "mapbox.satellite", maxZoom: 13, minZoom: 3 });
// var southWest = L.latLng(-89.98155760646617, -180),
//   northEast = L.latLng(89.99346179538875, 180);
// var myBounds = L.latLngBounds(southWest, northEast); // Restricts map movement over borders



var map = L.Wrld.map("mapid", "secret", {
  center: [37.7858, -122.401],
      zoom: 1
});

// // Create map
// var map = L.map("mapid", {
//   attribution: mapboxAttribution,
//   maxBounds: myBounds,
//   maxBoundsViscosity: 0.75,
//   zoom: 5,
//   layers: dark,
// });
// // Add different layers to the map
// var baseMaps = {
//   Light: light,
//   Dark: dark,
//   Satellite: satellite,
// };

// L.control.layers(baseMaps).addTo(map);
// map.attributionControl.addAttribution(mapboxAttribution);

// Making featuregroup for markers and polyline to easily remove old ones
var ISSlineLayer = new L.FeatureGroup().addTo(map);
var ISSlocationLayer = new L.FeatureGroup().addTo(map);
var geocodeLayer = new L.FeatureGroup().addTo(map);

// Function to draw a fading line
function drawFadingLine(data) {
  //console.log(data);
  if (data.length < 1) {
    return;
  }

  opacity = 1;
  opacityScale = 1 / timesteps;

  for (let i = 0; i < data.length - 1; i++) {
    let latlngs = [data[i], data[i + 1]];
    // If difference between lat or lng is too much (lat goes from 180 to -180 etc.), don't draw the line
    if (i > timesteps) {
      return;
    } else {
      polyline = L.Wrld.polyline(latlngs, {
        elevation: 420000,
        elevationMode: "heightAboveSeaLevel",
        opacity: opacity
    }).addTo(ISSlineLayer);
      //polyline = new L.polyline(latlngs, { opacity: opacity }).addTo(ISSlineLayer);
      opacity -= opacityScale;
      // console.log("ISSLatlngs: " + ISSlatlngs);
      // console.log("Opacity: " + opacity);
    }
  }
}

// Load current ISS latlngs, add them into array and pass the data to other functions
function loadISSlatlngs(handleData) {
  $.ajax({
    url: "js/ISSdata.json",
  })
    .fail(function () {
      console.log("ISS AJAX FAILED!");
    })
    .done(function (data) {
      //console.log(data);
      let latlng = data.latlngs[0];
      //console.log(latlng)
      ISSlatlngs = data.latlngs;
      handleData(latlng);
    });
}

// Functions for showing marker, getting data for popup and adding it into marker
function ISSmarker(data) {
  let ISSicon = L.icon({
    iconUrl: "/views/ISS_icon.png", // T
    iconSize: [64, 40], // size
    iconAnchor: [32, 20], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -20], // point from which the popup should open relative to the iconAnchor
  });
  //console.log(astrodata);
  // marker = new L.marker(data, { icon: ISSicon }).addTo(ISSlocationLayer);
  marker = L.marker(data,{
    icon: ISSicon,
    elevation: 420000,
  }).addTo(ISSlocationLayer);

  //map.panTo(data, (animate = true));

  ISSmarkerPopup();
}

function ISSmarkerPopup() {
  if (astrodata && marker) {
    let currentNumber = "<p>Number of people in space: " + astrodata.number + "</p>";
    let peopleInSpace = astrodata.people.map((person, index) => "<li>" + person.name + "</li>");
    peopleInSpace = peopleInSpace.toString().replace(/,/g, " ");
    let webURL = "<a href='" + "http://open-notify.org/" + "'>" + "http://open-notify.org/" + "</a>";
    let text = `<h class ="header">International Space Station</h> <br><br> ${currentNumber} <ul class="list">${peopleInSpace}</ul>${webURL}`;
    marker.bindPopup(text);
  }
}

function loadISSastros() {
  $.ajax({
    url: "http://api.open-notify.org/astros.json",
  })
    .fail(function () {
      console.log("ASTRO AJAX FAILED!");
    })
    .done(function (data) {
      astrodata = data;
      ISSmarkerPopup();
    });
}

// Clear lines and markers from map
function clearMap() {
  try {
    ISSlocationLayer.clearLayers();
    ISSlineLayer.clearLayers();
  } catch (e) {
    console.log("problem with " + e + map._layers[i]);
  }
}

// updates line length when slider value changes
function updateLineLength() {
  // Function to increase line lenght exponentially
  timesteps = Math.round(1 + (2879 / 1000000) * Math.pow(slider.value, 3));
  document.getElementById("sliderValue").innerHTML = timesteps / 2 + " minutes";
  ISSlineLayer.clearLayers();
  drawFadingLine(ISSlatlngs);
}

// After clearing the map, draw new marker and polylines
function drawISS() {
  clearMap();
  ISSmarker(ISSlatlngs[0]);
  drawFadingLine(ISSlatlngs);
}

// Updates position from ISSdata.json file
function updateISS() {
  loadISSlatlngs(function (response) {
    drawISS();
  });
}

// Run on first launch
function init() {
  loadISSlatlngs(function (response) {
    timesteps = 180; // default value is 90mins
    map.panTo(response);
    drawISS();
  });
  loadISSastros();
}

setInterval(function () {
  //console.log("------ One interval -------");
  updateISS();
}, 16 * 1000);

function loadGeocode(handleData) {
  $.ajax({
    url: "https://geocode.xyz",
    data: {
      locate: textInput.value,
      json: "1",
    },
  })
    .fail(function () {
      console.log("GEOCODE AJAX FAILED!");
    })
    .done(function (data) {
      let geocodeLatlng = [data.latt, data.longt];
      handleData(geocodeLatlng);
    });
}

function loadISSpasstimes() {
  if (textInput.value == "") {
    return;
  }
  if (geocodeLayer.getLayers().length == 1) {
    geocodeLayer.clearLayers();
  }
  loadGeocode(function (response) {
    // Passing api url with correct latitude and longitude to ajax requst
    if (response[0] == 0.0 && response[1] == 0.0) {
      alert("Invalid location, please try again!");
      return;
    }
    let url = "http://api.open-notify.org/iss-pass.json?lat=" + response[0] + "&lon=" + response[1] + "&n=5&callback=?";
    geocodemarker = new L.marker(response).addTo(geocodeLayer);
    map.setView(response, 2, {animate: true});
    $.getJSON(url, function (data) {
      let passtext = "<p>Next times when ISS is overhead:</p>";
      let passtimes = data.response.map((response, index) => "<li>" + timeConverter(response.risetime) + " for " + response.duration + " seconds" + "</li>");
      passtimes = passtimes.toString().replace(/,/g, " ");
      let infotext = "<p>Overhead is defined as 10° in elevation for the observer. The times are displayed in UTC+3 and the length of time that the ISS is above 10° is in seconds.</p>";
      let webURL = "<p>More info at <a  href='http://open-notify.org/Open-Notify-API/ISS-Pass-Times/'>http://open-notify.org/</a></p>";
      let text = `<h class ="header">ISS Pass Times</h> <br><br>${passtext} <ul class="list">${passtimes}</ul>${infotext}${webURL}`;
      geocodemarker.bindPopup(text);
    });
  });
  textInput.value = "";
}

function timeConverter(unixTimestamp) {
  var d = new Date(unixTimestamp * 1000);
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var year = d.getFullYear();
  var month = months[d.getMonth()];
  var date = d.getDate();
  var hour = d.getHours() + 2; // Converting UTC into Eastern European Summer Time (EEST), UTC +3
  var min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  var sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
  var time = date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}


// Using jquery to easily show infodiv
$(function(){
  $(".showInfo").click(function () {
      $("#test").slideToggle("slow");
  });
});


slider.addEventListener("input", updateLineLength);
