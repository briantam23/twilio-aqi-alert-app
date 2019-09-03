import React, { Fragment } from 'react';
import style from './login.less';
import { Link } from 'react-router-dom';


const Login = ({ username, password }) => (
    <Fragment>
        <button className={ style.authLogin }>
            Login
        </button>   
        <Link to={'/profile/create'} className={ style.createLink }>Need an account? Sign up here.</Link>
    </Fragment>
)


export default Login;