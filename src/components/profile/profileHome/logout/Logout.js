import React from 'react';
import style from './logout.less';
import profileFormHOC from '../../../../higherOrderComponents/profileFormHOC/profileFormHOC';


const Logout = ({ auth, handleSubmit, pathname, history }) => {
    return(
        <form onSubmit={ handleSubmit }>
            <div className={ style.authWelcome }>
                Welcome { auth.username }!
            </div>
            <button className={ style.authLogout }>Logout</button>
        </form>
    )
}


export default profileFormHOC(Logout);