import React, { Fragment } from 'react';
import style from './profileForm.less';
import profileFormHOC from '../../../higherOrderComponents/profileFormHOC/profileFormHOC';
import Logout from './logout/Logout';


const ProfileForm = ({ username, password, phoneNumber, handleChange, handleSubmit, auth, pathname }) => {

    if(auth.id && pathname.slice(9) === 'auth') return <Logout auth={ auth } handleSubmit={ handleSubmit } />;
    
    return(
        <div /* className={ style.profileFormContainer } */>
        {
            pathname.slice(9) === 'create' ? <h1>Create Profile</h1> : null
        }
        {
            pathname.slice(9) === 'auth' ? <h1>Login</h1> : null
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
                pathname.slice(9) !== 'auth' ? (
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
                        <button disabled={ !username && !password && !phoneNumber } className={ style.authSubmit }>
                            Submit
                        </button>
                    </Fragment>
                ) : (
                    <button disabled={ !username && !password } className={ style.authLogin }>
                        Login
                    </button>
                )
            }                
            </form>
        </div>
    )
}


export default profileFormHOC(ProfileForm);