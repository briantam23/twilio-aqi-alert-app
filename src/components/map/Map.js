import React, { Component, createRef } from 'react';
import { loadScript } from '../../util';
import style from './map.less';


class Map extends Component {

  componentDidMount = () => {
    window.initMap = this.initMap;
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&callback=initMap`)
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
    return (
        <div ref="map" className={style.mapContainer}/>
    )
  }
}


export default Map;