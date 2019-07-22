import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import style from './singleAlert.less';
import { destroyCity } from '../../../../../store/actions/users';


const SingleAlert = ({ city, destroyCity }) => (
    <div className={ style.alertRow }>
        <div className={ style.alertColumn }>
            <h3>{ city.name }</h3>
            <h4>{ 'Air Quality Index Threshold: ' + city.aqiThreshold }</h4>
        </div>
        <div className={ style.alertColumn }>
            <button onClick={ () => destroyCity(city) } className={ style.alertDeleteButton }>
                Delete
            </button>
        </div>
    </div>
)


const mapDispatchToProps = { destroyCity }


export default connect(null, mapDispatchToProps)(SingleAlert);