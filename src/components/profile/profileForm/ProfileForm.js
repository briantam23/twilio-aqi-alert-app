import React from 'react';
import style from './profileForm.less';
import profileFormHOC from '../../../higherOrderComponents/profileFormHOC/profileFormHOC';


const ProfileForm = ({ username, password, phoneNumber, handleChange, handleSubmit }) => {
    return (
        <div /* className={ style.profileFormContainer } */>
            <h1>Create Profile</h1>
            <form onSubmit={ handleSubmit } className={ style.authForm }>
                <input 
                    onChange={ handleChange } 
                    value={ username } 
                    name='username' 
                    placeholder='Username'
                    size='20'
                    required
                    autoFocus 
                />
                <input 
                    onChange={ handleChange }
                    value={ password } 
                    name='password' 
                    placeholder='Password'
                    size='20'
                    required
                    type='password'
                />
                <input 
                    onChange={ handleChange }
                    value={ phoneNumber } 
                    name='phoneNumber' 
                    placeholder='Phone Number'
                    size='20'
                    required
                    type='tel'
                />
                <button disabled={ !username && !password && !phoneNumber } className={ style.authSubmit }>
                    Create
                </button>
            </form>
        </div>
    )
}


export default profileFormHOC(ProfileForm);