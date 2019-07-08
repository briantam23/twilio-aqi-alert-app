import React, { Component, createRef } from 'react';
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
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&callback=initMap`)

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
              if(aqi >= user.cities[0].aqiThreshold) {
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

    // Air Quality
    const waqiMapOverlay = new google.maps.ImageMapType({
      getTileUrl: (coord, zoom) => 'https://tiles.waqi.info/tiles/usepa-aqi/' + zoom + '/' + coord.x + '/' + coord.y + '.png?token=<%=AIR_QUALITY_INDEX_KEY%>',
      name: 'Air Quality',
    })
    
    map.overlayMapTypes.insertAt(0, waqiMapOverlay);
  }

  render() {
    console.log(this.state)
    return (
        <div ref="map" className={style.mapContainer}/>
    )
  }
}


export default Map;