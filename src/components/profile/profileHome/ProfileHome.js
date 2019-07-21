import React from 'react'; 
import { Route } from 'react-router-dom';
import Logout from './logout/Logout';


const ProfileHome = () => (
    <Route render={ ({ location, history }) => 
        <Logout pathname={ location.pathname } history={ history } /> } />
)


export default ProfileHome;