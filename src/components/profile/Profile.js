import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import style from './profile.less';
import CreateProfile from './createProfile/CreateProfile';


const Profile = () => (
    <div className={style.profileContainer}>
        <Route path='/profile/create' render={ ({ history }) => <CreateProfile history={ history }/> }/>
    </div>
)


export default Profile;