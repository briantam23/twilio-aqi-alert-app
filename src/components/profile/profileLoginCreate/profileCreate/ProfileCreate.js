import React, { Fragment } from 'react';
import style from './profileCreate.less';
import { Link } from 'react-router-dom';


const ProfileCreate = ({ username, password, phoneNumber, handleChange }) => (
    <Fragment>

        <input 
            onChange={ handleChange }
            value={ phoneNumber } 
            name='phoneNumber' 
            placeholder='Phone Number'
            size='20'
            required
            type='tel'
        />

        <button className={ style.authSubmit }>
            Create
        </button>

        <Link to={'/profile/login'} className={ style.loginLink }>Have an account? Sign in here.</Link>
        
    </Fragment>
)


export default ProfileCreate;