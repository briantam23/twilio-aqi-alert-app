import React, { Fragment } from 'react'; 
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from './profileHome.less'
import Logout from './logout/Logout';
import CreateAlert from './createAlert/CreateAlert';
import AlertList from './alertList/AlertList';
import { findUserAlerts } from '../../../util/profileUtil';


const ProfileHome = () => {
    const { auth, users } = useSelector(store => store);
    const alerts = findUserAlerts(auth, users);

    return auth.id ? (
        <div className={ style.profileHomeContainer }>

            <div className={ style.profileHomeLogout }>
                <Route render={ ({ location, history }) => <Logout pathname={ location.pathname } history={ history }/> } />
            </div>

            <div className={ style.profileHomeAlerts }>
                <CreateAlert alerts={ alerts }/>
                <AlertList alerts={ alerts }/>
            </div>

        </div>
    ) : null
}


export default ProfileHome;