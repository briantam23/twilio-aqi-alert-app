import React from 'react';
import style from './createProfile.less';
import profileForm from '../profileForm/profileForm';


const CreateProfile = ({ username, password, handleChange, handleSubmit }) => {
    console.log(username, password, handleChange)
    return (
        <div className={ style.profileFormContainer }>
            <h1>Create Profile</h1>
            <form onSubmit={ handleSubmit } className={ style.authForm }>
                {/* <input 
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
                <button disabled={ !username && !password } className={ style.authSubmit }>
                    Submit
                </button> */}
            </form>
        </div>
    )
}


export default profileForm(CreateProfile);