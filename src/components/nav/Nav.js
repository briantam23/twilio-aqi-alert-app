import React from 'react';
import { useSelector } from 'react-redux';
import style from './nav.less';
import { Link } from 'react-router-dom';


const Nav = () => {
    const auth = useSelector(store => store.auth);

    return (
        <div className={ style.navContainer }>
            
            <Link to='/' className={ style.logo }>Twilio Air Quality Alert App</Link>

            <input className={ style.menuBtn} type="checkbox" id="menu-btn" />
            <label className={ style.menuIcon} htmlFor="menu-btn"><span className={ style.navicon }></span></label>
            
            <ul className={ style.menu }>
                { !auth.id ? <li><Link to='/profile/create'>Sign up for alerts!</Link></li> : null }
                <li><Link to={ auth.id ? `/profile/${auth.id}` : '/profile' }>Profile</Link></li>
            </ul>
            
        </div>
    )
}


export default Nav;