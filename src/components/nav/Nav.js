import React from 'react';
import style from './nav.less';


const Nav = () => (
    <div>
        <input
            id='autocomplete'
            placeholder='Check a location!'
            spellCheck='false'
            autoFocus
        />
    </div>
)


export default Nav;