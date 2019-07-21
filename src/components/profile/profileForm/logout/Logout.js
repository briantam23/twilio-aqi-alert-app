import React from 'react';
import style from './logout.less';


const Logout = ({ auth, handleSubmit }) => {
    return(
        <form onSubmit={ handleSubmit } className={ style.logoutForm }>
            <div className={ style.authWelcome }>
                Welcome { auth.username }!
            </div>
            <button className={ style.authLogout }>Logout</button>
        </form>
    )
}


export default Logout;