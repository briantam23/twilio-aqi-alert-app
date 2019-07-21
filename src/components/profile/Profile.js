import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import style from './profile.less';
import ProfileHome from './profileHome/ProfileHome';
import ProfileForm from './profileForm/ProfileForm';


const Profile = () => (
    <div className={ style.profileContainer }>
        <Switch>
            <Route path='/profile/create' render={ ({ location, history }) => 
                <ProfileForm pathname={ location.pathname } history={ history } /> } />
            <Route path='/profile/:id' render={ ({ location, history }) => 
                <ProfileHome pathname={ location.pathname } history={ history } /> } />
            <Route render={ ({ location, history }) => 
                <ProfileForm pathname={ location.pathname } history={ history } /> } />
        </Switch>
    </div>
)


export default Profile;