import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import style from './singleAlert.less';
import { destroyAlert } from '../../../../../store/actions/users';


const SingleAlert = ({ alert }) => {
    const dispatch = useDispatch();

    return(
        <div className={ style.alertRow }>

            <div className={ style.alertColumn }>
                <h3>{ alert.cityName }</h3>
                <h4>{ 'Air Quality Index Threshold: ' + alert.aqiThreshold }</h4>
            </div>
            
            <div className={ style.alertColumn }>
                <button onClick={ () => dispatch(destroyAlert(alert)) } className={ style.alertDeleteButton }>
                    Delete
                </button>
            </div>
            
        </div>
    )
}


export default SingleAlert;