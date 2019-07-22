import React, { Fragment } from 'react';
import style from './profileLoginCreate.less';
import profileFormHOC from '../../../higherOrderComponents/profileFormHOC/profileFormHOC';
import ProfileCreate from './profileCreate/ProfileCreate';
import Login from './login/Login';


const ProfileLoginCreate = ({ username, password, phoneNumber, handleChange, handleSubmit, auth, pathname }) => {
    return(
        <div>
        {
            pathname.slice(9) === 'create' ? <h1>Create Profile</h1> : <h1>Login</h1>
        }
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
            {
                pathname.slice(9) === 'create' ? (
                    <ProfileCreate username={ username } password={ password } phoneNumber={ phoneNumber } handleChange={ handleChange }/>
                ) : (
                    <Login username={ username } password={ password }/>
                )
            }                
            </form>
        </div>
    )
}


export default profileFormHOC(ProfileLoginCreate);