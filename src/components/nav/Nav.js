import React from 'react';
import style from './nav.less';
import { Link } from 'react-router-dom';


const Nav = () => (
    <div className={ style.navContainer }>
        <Link to='/' className={ style.logo }>Air Quality Index App</Link>
        <input className={ style.menuBtn} type="checkbox" id="menu-btn" />
        <label className={ style.menuIcon} htmlFor="menu-btn"><span className={ style.navicon }></span></label>
        <ul className={ style.menu }>
            <li><Link to='/profile/create'>Sign up for Air Quality alerts!</Link></li>
            <li><Link to='/profile/auth'>Profile</Link></li>
        </ul>
    </div>
)


export default Nav;