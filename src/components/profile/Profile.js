import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import style from './profile.less';
import ProfileForm from './profileForm/ProfileForm';


const Profile = () => (
    <div className={style.profileContainer}>
        <Route path={ '/profile/create' || '/profile/:id' } render={ ({ match, history }) => 
            <ProfileForm id={ match.params.id } history={ history } /> } />
    </div>
)


export default Profile;