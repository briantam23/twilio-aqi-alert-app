import React, { Component, Fragment, createRef } from 'react';
import axios from 'axios';
import { loadScript } from '../../util';
import style from './map.less';


class Map extends Component {

  state = {
    user: {}
  }

  componentDidMount = () => {
    const { user } = this.state;

    window.initMap = this.initMap;
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places&callback=initMap`)

    return axios.get('/api/users')
      .then(res => res.data)
      .then(users => this.setState({ user: users[0] }))
      .then(() => {
        //Testing alert by city or Lat/Long!
        //Can also initiate by new Date() function
        setInterval(() => {
          return axios.get(`http://api.waqi.info/feed/${user.cities[0].name}/?token=${process.env.AIR_QUALITY_INDEX_KEY}`)
            .then(res => res.data.data.aqi)
            .then(aqi => {
              if (aqi >= user.cities[0].aqiThreshold) {
                axios.post('/api/messages', {
                  "to": "5166109915",
                  "body": "Air Quality Index > 0"
                })
              }
            })
        }, 10000)
      })
  }

  initMap = () => {
    let marker;

    // Map
    const map = new google.maps.Map(this.refs.map, {
      center: new google.maps.LatLng(40.7048, -73.6501),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 10
    })

    // Autocomplete

    const autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      { types: ['geocode'] }
    )
    autocomplete.addListener('place_changed', onPlaceChanged);

    // On Place Change
    const places = new google.maps.places.PlacesService(map);

    const onPlaceChanged = () => {
      const place = autocomplete.getPlace();
      const position = place.geometry.location;
      if (place.geometry) {
        map.panTo(position);
        map.setZoom(10);
        search();
        // Marker
        marker = new google.maps.Marker({ position });
        setTimeout(dropMarker(), 1);
      }
      else document.getElementById('autocomplete').placeholder = 'Enter a city';
    }

    // Legend
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(document.getElementById('legend-computer'));
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(document.getElementById('legend-mobile'));

    // Air Quality
    const waqiMapOverlay = new google.maps.ImageMapType({
      getTileUrl: (coord, zoom) => 'https://tiles.waqi.info/tiles/usepa-aqi/' + zoom + '/' + coord.x + '/' + coord.y + '.png?token=<%=AIR_QUALITY_INDEX_KEY%>',
      name: 'Air Quality',
    })

    /* map.overlayMapTypes.insertAt(0, waqiMapOverlay);

    // HTML5 geolocation.
    const infoWindow = new google.maps.InfoWindow;
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found!');
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        })
    }
    else handleLocationError(false, infoWindow, map.getCenter());

    const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }

    // Set Marker
    const search = () => {
      const search = { bounds: map.getBounds() };
      clearMarker();
      places.nearbySearch(search, (place, status) => {
        if(status === google.maps.places.PlacesServiceStatus.OK && place.geometry) {
          marker = new google.maps.Marker({ position });
          dropMarker();
        }
      })
    }
    const toggleBounce = () => {
      if (marker.getAnimation() !== null) marker.setAnimation(null);
      else marker.setAnimation(google.maps.Animation.BOUNCE);
    }
    function clearMarker() {
      if (marker) marker.setMap(null);
      if (infoWindow) infoWindow.close();
      marker = null;
    }
    function dropMarker() {
      return function () {
        marker.setMap(map);
        marker.setAnimation(google.maps.Animation.DROP);
        marker.addListener('click', toggleBounce);
      }
    }

    // Bias results towards geolocation
    function geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          const circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          })
          autocomplete.setBounds(circle.getBounds());
        })
      }
    } */
  }

  render() {
    console.log(this.state)
    return (
      <Fragment>
        <div ref="map" className={style.mapContainer} />
        {/* <div id='legend-computer'>
          <img src='/public/img/aqi_legend_computer.png' alt='AQI Legend Computer'/>
        </div>
        <div id='legend-mobile'>
            <img src='/public/img/aqi_legend_mobile.png' alt='AQI Legend Mobile'/>
        </div> */}
      </Fragment>
    )
  }
}


export default Map;