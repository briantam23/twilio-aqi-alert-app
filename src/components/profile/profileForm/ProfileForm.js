import React, { Fragment } from 'react';
import style from './profileForm.less';
import profileFormHOC from '../../../higherOrderComponents/profileFormHOC/profileFormHOC';


const ProfileForm = ({ username, password, phoneNumber, handleChange, handleSubmit, auth, pathname }) => {
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
                pathname.slice(9) !== '' ? (
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
                            Create
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