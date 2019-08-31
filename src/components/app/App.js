import React, { useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { exchangeTokenForAuth } from '../../store/actions/auth';
import style from './app.less'
import Nav from '../nav/Nav';
import Map from '../map/Map';
import Profile from '../profile/Profile';


const App = () => {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(exchangeTokenForAuth()) });

    return (
        <Router>
            <div className={ style.mainContainer }>
                <Nav/>
                <Map/>
                <Route path='/profile' render={ () => <Profile/> }/>
            </div>
        </Router>
    )
}


export default App;