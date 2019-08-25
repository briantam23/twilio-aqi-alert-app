import React, { Fragment } from 'react';
import style from './createAlert.less';
import profileFormHOC from '../../../../higherOrderComponents/profileFormHOC/profileFormHOC';


export const CreateAlert = ({ cityName, aqiThreshold, error, handleChange, handleSubmit, handleClearError, alerts }) => (
    <div className={ style.createAlertContainer }>

        <h1>Create Air Quality Alert!</h1>

        <form onSubmit={ handleSubmit } className={ style.createAlertForm }>
            {
                error === 'Limit 5 Alerts! (X)' 
                ? ( <div onClick={ () => handleClearError() } className={ style.errorMessage }>
                        <strong>{ error }</strong>
                    </div> )
                : null
            }
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
            <button disabled={ !cityName || !aqiThreshold /* || alerts.length >= 5 */ } className={ style.createAlertButton }>
                    Create Alert
            </button>   

        </form>
        
    </div>
)


export default profileFormHOC(CreateAlert);