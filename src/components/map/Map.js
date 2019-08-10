import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { loadInitialUsers } from '../../store/actions/users';
import { loadScript, _initMap } from '../../util/mapUtil';
import style from './map.less';


class Map extends Component {

  componentDidMount = () => {
    
    const initMap = () => _initMap(this);
    window.initMap = initMap;
    loadScript();

    this.props.loadInitialUsers();
  }

  render() {
    return(
      <Fragment>

        <div ref="map" className={ style.mapContainer } />

        <input
            id='autocomplete'
            className={ style.autocomplete }
            placeholder='Check a location'
            spellCheck='false'
            autoFocus
        />

        <div id='legend-computer' className={ style.legendComputer }>
            <img src='/public/img/aqi_legend_computer.png' alt='AQI Legend Computer' />
        </div>
        
        <div id='legend-mobile' className={ style.legendMobile }>
            <img src='/public/img/aqi_legend_mobile.png' alt='AQI Legend Mobile' />
        </div>

      </Fragment>
    )
  }
}


const mapDispatchToProps = { loadInitialUsers };


export default connect(null, mapDispatchToProps)(Map);