import React, { Component, Fragment, createRef } from 'react';
import axios from 'axios';
import { loadScript, _initMap } from '../../util';
import style from './map.less';


class Map extends Component {

  state = {
    user: {}
  }

  componentDidMount = () => {

    const initMap = () => _initMap(this);
    window.initMap = initMap;
    loadScript();

    return axios.get('/api/users')
      .then(res => res.data)
      .then(users => {
        console.log(users)
        this.setState({ user: users[0] })
      })
      .then(() => {
        //Testing alert by city or Lat/Long!

        setInterval(() => {
          const currentDate = new Date();
          const currentHour = currentDate.getHours();

          console.log(currentHour);

          if (currentHour === 18 || currentHour === 8) {
            console.log('if')
            return axios.get(`https://api.waqi.info/feed/${this.state.user.cities[0].name}/?token=${process.env.AIR_QUALITY_INDEX_KEY}`)
              .then(res => res.data.data.aqi)
              .then(aqi => {
                if (aqi >= this.state.user.cities[0].aqiThreshold) {
                  axios.post('/api/messages', {
                    "to": "5166109915",
                    "body": "Air Quality Index > 0"
                  })
                }
              })
          }
        }, 3600000)
      })
  }

  render() {
    console.log(this.state)
    return (
      <Fragment>
        <div ref="map" className={style.mapContainer} />
        <input
            id='autocomplete'
            className={style.autocomplete}
            placeholder='Check a location'
            spellCheck='false'
            autoFocus
        />
        <div id='legend-computer' className={style.legendComputer}>
            <img src='/public/img/aqi_legend_computer.png' alt='AQI Legend Computer' />
        </div>
        <div id='legend-mobile' className={style.legendMobile}>
            <img src='/public/img/aqi_legend_mobile.png' alt='AQI Legend Mobile' />
        </div>
      </Fragment>
    )
  }
}


export default Map;