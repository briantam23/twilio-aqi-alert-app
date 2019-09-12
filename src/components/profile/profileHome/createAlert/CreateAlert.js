import React, { Fragment } from 'react';
import style from './createAlert.less';
import profileFormHOC from '../../../../higherOrderComponents/profileFormHOC/profileFormHOC';
import Error from '../../../shared/error/Error';
import Spinner from '../../../shared/spinner/Spinner';


export const CreateAlert = ({ cityName, aqiThreshold, error, isLoading, handleChange, handleCreateAlert, handleClearError }) => (
    <div className={ style.createAlertContainer }>
        
        { isLoading ? <Spinner/> : null }
        
        <h1>Create Air Quality Alert!</h1>

        <form onSubmit={ handleCreateAlert } className={ style.createAlertForm }>
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