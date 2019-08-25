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

        <div className={ style.legendLargeComputer }>
            <img src='/public/img/legend_lg_computer.png' alt='Legend (Large Computer)' />
        </div>

        <div className={ style.legendSmallComputer }>
            <img src='/public/img/legend_sm_computer.png' alt='Legend (Small Computer)' />
        </div>
        
        <div className={ style.legendMobile }>
            <img src='/public/img/legend_mobile.png' alt='Legend (Mobile)' />
        </div>

      </Fragment>
    )
  }
}


const mapDispatchToProps = { loadInitialUsers };


export default connect(null, mapDispatchToProps)(Map);