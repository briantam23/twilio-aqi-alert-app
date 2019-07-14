try {
  Object.assign(process.env, require('../.env.js'));
}
catch(ex) {
  console.log(ex);
}


export const loadScript = src => {
  const ref = window.document.getElementsByTagName("script")[0];
  const script = window.document.createElement("script");
  
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}


// Map
const mapFunc = _this => (
  new google.maps.Map(_this.refs.map, {
    center: new google.maps.LatLng(40.7048, -73.6501),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 10
  })
)


// Legend
/* const legendFunc = () => {
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(document.getElementById('legend-computer'));
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(document.getElementById('legend-mobile'));
} */


// AQI Map Overlay
const waqiMapOverlayFunc = () => (
  new google.maps.ImageMapType({
    getTileUrl: (coord, zoom) => 'https://tiles.waqi.info/tiles/usepa-aqi/' + zoom + '/' + coord.x + '/' + coord.y + `.png?token=${process.env.AIR_QUALITY_INDEX_KEY}`,
    name: 'Air Quality',
  })
)


const geolocation = (map, infoWindow) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found!');
        infoWindow.open(map);
        map.setCenter(pos);
      },
      () => handleLocationError(true, infoWindow, map.getCenter(), map)
    )
  }
  else handleLocationError(false, infoWindow, map.getCenter(), map);
}

const handleLocationError = (browserHasGeolocation, infoWindow, pos, map) => {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}


// Set Marker
const search = (map, marker, infoWindow, places) => {
  const _search = { bounds: map.getBounds() };
  clearMarker(marker, infoWindow);
  places.nearbySearch(_search, (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && place.geometry) {
      marker = new google.maps.Marker({ position });
      dropMarker(marker, map, toggleBounce);
    }
  })
}


const clearMarker = (marker, infoWindow) => {
  if (marker) marker.setMap(null);
  if (infoWindow) infoWindow.close();
  marker = null;
}

const toggleBounce = marker => () => {
  if (marker.getAnimation() !== null) marker.setAnimation(null);
  else marker.setAnimation(google.maps.Animation.BOUNCE);
}

const dropMarker = (marker, map, toggleBounce) => () => {
  marker.setMap(map);
  marker.setAnimation(google.maps.Animation.DROP);
  marker.addListener('click', toggleBounce(marker));
}


export const _initMap = _this => {
  let marker;

  const map = mapFunc(_this);

  // Search box
  const input = document.getElementById('autocomplete');
  const searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

  // Autocomplete
  const autocomplete = new google.maps.places.Autocomplete(input, { types: ['geocode'] });
  autocomplete.addListener('place_changed', onPlaceChanged);

  // On Place Change
  const places = new google.maps.places.PlacesService(map);

  function onPlaceChanged() {
    const place = autocomplete.getPlace();
    const position = place.geometry.location;
    if (place.geometry) {
      map.panTo(position);
      map.setZoom(10);
      search(map, marker, infoWindow, places);

      // Marker
      marker = new google.maps.Marker({ position });
      setTimeout(dropMarker(marker, map, toggleBounce), 1);
    }
    else document.getElementById('autocomplete').placeholder = 'Enter a city';
  }

  // Air Quality
  const waqiMapOverlay = waqiMapOverlayFunc();
  map.overlayMapTypes.insertAt(0, waqiMapOverlay);

  // HTML5 geolocation.
  const infoWindow = new google.maps.InfoWindow;
  geolocation(map, infoWindow);

}