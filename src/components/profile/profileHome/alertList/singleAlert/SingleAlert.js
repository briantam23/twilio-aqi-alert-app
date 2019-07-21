import React, { Fragment } from 'react';
import style from './singleAlert.less';


const SingleAlert = ({ city }) => (
    <div className={ style.alertRow }>
        <div className={ style.alertColumn }>
            <h3>{ city.name }</h3>
            <h4>{ 'Air Quality Index Threshold: ' + city.aqiThreshold }</h4>
        </div>
        <div className={ style.alertColumn }>
            <button className={ style.alertDeleteButton }>Delete</button>
        </div>
    </div>
)


export default SingleAlert;