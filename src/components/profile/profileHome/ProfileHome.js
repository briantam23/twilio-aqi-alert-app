import React, { Fragment } from 'react'; 
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from './logout/Logout';
import AlertList from './alertList/AlertList';


const ProfileHome = ({ auth }) => {
    if(!auth.id) return null;
    return(
        <Fragment>
            <Route render={ ({ location, history }) => 
                <Logout pathname={ location.pathname } history={ history } /> } />
            <AlertList/>
        </Fragment>
    )
}


const mapStateToProps = ({ auth }) => ({ auth });


export default connect(mapStateToProps)(ProfileHome);