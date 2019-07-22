import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import style from './profile.less';
import ProfileHome from './profileHome/ProfileHome';
import ProfileLoginCreate from './profileLoginCreate/ProfileLoginCreate';


const Profile = () => (
    <div className={ style.profileContainer }>
        <Switch>
            <Route path='/profile/create' render={ ({ location, history }) => 
                <ProfileLoginCreate pathname={ location.pathname } history={ history } /> } />
            <Route path='/profile/:id' render={ ({ location, history }) => 
                <ProfileHome pathname={ location.pathname } history={ history } /> } />
            <Route render={ ({ location, history }) => 
                <ProfileLoginCreate pathname={ location.pathname } history={ history } /> } />
        </Switch>
    </div>
)


export default Profile;