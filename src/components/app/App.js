import React from 'react';
import style from './app.less'
import Map from '../map/Map';
import Nav from '../nav/Nav';


const App = () => {
    return(
        <div className={style.mainContainer}>
            <Nav/>
            <Map/>
        </div>
    )
}


export default App;