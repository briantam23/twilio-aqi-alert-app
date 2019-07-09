import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import style from './app.less'
import Map from '../map/Map';
import Nav from '../nav/Nav';


const App = () => {
    return(
        <Router>
            <div className={style.mainContainer}>
                <Nav/>
                <Map/>
            </div>
        </Router>
    )
}


export default App;