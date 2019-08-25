import React from 'react';
import style from './login.less';


const Login = ({ username, password }) => (
    <button className={ style.authLogin }>
        Login
    </button>   
)


export default Login;