import React, { Fragment } from 'react';
import style from './profileLoginCreate.less';
import profileFormHOC from '../../../higherOrderComponents/profileFormHOC/profileFormHOC';
import Error from '../../shared/error/Error';
import ProfileCreate from './profileCreate/ProfileCreate';
import Login from './login/Login';
import Spinner from '../../shared/spinner/Spinner';


const ProfileLoginCreate = ({ username, password, error, isLoading, phoneNumber, handleChange, handleCreateUser, handleLogin, handleClearError, auth, pathname }) => {
    pathname = pathname.slice(9);
    return (
        <div>

            { isLoading ? <Spinner/> : null }

            { pathname === 'create' ? <h1>Create Profile</h1> : <h1>Login</h1> }

            <form onSubmit={ pathname === 'create' ? handleCreateUser : handleLogin } className={ style.authForm }>
                <Error error={ error } handleClearError={ handleClearError }/>
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
                pathname === 'create' 
                    ? <ProfileCreate username={ username } password={ password } phoneNumber={ phoneNumber } handleChange={ handleChange }/>
                    : <Login username={ username } password={ password }/>
            }                
            </form>
        </div>
    )
}


export default profileFormHOC(ProfileLoginCreate);