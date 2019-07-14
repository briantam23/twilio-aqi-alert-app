import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import style from './app.less'
import Nav from '../nav/Nav';
import Map from '../map/Map';
import Profile from '../profile/Profile';


const App = () => {
    return(
        <Router>
            <div className={style.mainContainer}>
                <Nav/>
                <Map/>
                <Route path='/profile' render={ () => <Profile/> }/>
            </div>
        </Router>
    )
}


export default App;