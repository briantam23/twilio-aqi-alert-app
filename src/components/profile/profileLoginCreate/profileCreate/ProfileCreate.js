import React, { Fragment } from 'react';
import style from './profileCreate.less';


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
        
    </Fragment>
)


export default ProfileCreate;