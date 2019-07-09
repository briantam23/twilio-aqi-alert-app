import React from 'react';
import style from './nav.less';
import { Link } from 'react-router-dom';


const Nav = () => (
    <div className={ style.navContainer }>
        <a href="" className={ style.logo }>Air Quality Index App</a>
        <input className={ style.menuBtn} type="checkbox" id="menu-btn" />
        <label className={ style.menuIcon} htmlFor="menu-btn"><span className={ style.navicon }></span></label>
        <ul className={ style.menu }>
            <li><Link to='/'>Sign up for Air Quality alerts!</Link></li>
            <li><Link to='/'>Sign in</Link></li>
        </ul>
    </div>
)


export default Nav;