import React, { Fragment } from 'react';
import style from './profile.less';
import CreateProfile from './createProfile/CreateProfile';


const Profile = () => (
    <div className={style.profileContainer}>
        <h1 className={style.profileHeader}>My Profile</h1>
        <CreateProfile/>
    </div>
)


export default Profile;