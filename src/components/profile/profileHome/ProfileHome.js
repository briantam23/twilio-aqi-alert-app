import React, { Fragment } from 'react'; 
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import style from './profileHome.less'
import Logout from './logout/Logout';
import CreateAlert from './createAlert/CreateAlert';
import AlertList from './alertList/AlertList';


const ProfileHome = ({ auth }) => {
    if(!auth.id) return null;
    return(
        <div className={ style.profileHomeContainer }>
            <div className={ style.profileHomeLogout }>
                <Route render={ ({ location, history }) => 
                    <Logout pathname={ location.pathname } history={ history }/> } />
            </div>
            <div className={ style.profileHomeAlerts }>
                <CreateAlert/>
                <AlertList/>
            </div>
        </div>
    )
}


const mapStateToProps = ({ auth }) => ({ auth });


export default connect(mapStateToProps)(ProfileHome);