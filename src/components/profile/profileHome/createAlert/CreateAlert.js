import React, { Fragment } from 'react';
import style from './createAlert.less';
import profileFormHOC from '../../../../higherOrderComponents/profileFormHOC/profileFormHOC';
import Error from '../../../shared/error/Error';


export const CreateAlert = ({ cityName, aqiThreshold, error, handleChange, handleSubmit, handleClearError, alerts }) => (
    <div className={ style.createAlertContainer }>

        <h1>Create Air Quality Alert!</h1>

        <form onSubmit={ handleSubmit } className={ style.createAlertForm }>
            <Error error={ error } handleClearError={ handleClearError }/>
            <input 
                onChange={ handleChange } 
                value={ cityName } 
                name='cityName' 
                placeholder='City Name'
                size='20'
                required
                autoFocus 
            />
            <input 
                onChange={ handleChange }
                value={ aqiThreshold } 
                name='aqiThreshold' 
                placeholder='Air Quality Index Threshold'
                size='20'
                required
            />
            <button className={ style.createAlertButton }>
                    Create Alert
            </button>   

        </form>
        
    </div>
)


export default profileFormHOC(CreateAlert);