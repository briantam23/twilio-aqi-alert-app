import React from 'react';
import style from './login.less';


const Login = ({ username, password }) => (
    <button disabled={ !username || !password } className={ style.authLogin }>
        Login
    </button>
)


export default Login;