import React, { Fragment } from 'react';
import style from './logout.less';


const Logout = ({ auth }) => {
    return(
        <Fragment>
            <div className={ style.authWelcome }>
                Welcome { auth.username }!
            </div>
            <button className={ style.authLogout }>Logout</button>
        </Fragment>
    )
}


export default Logout;