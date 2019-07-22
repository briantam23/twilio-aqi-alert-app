import React from 'react';
import { connect } from 'react-redux';
import style from './alertList.less';
import SingleAlert from './singleAlert/SingleAlert';
import { findUserAlerts } from '../../../../util/profileUtil';


const AlertList = ({ alerts }) => (
    <div className={ style.alertListContainer }>
        { alerts.map(alert => <SingleAlert alert={ alert } key={ alert.id }/>) }
    </div>
)


const mapStateToProps = ({ auth, users }) => {
    const alerts = findUserAlerts(auth, users);
    return { alerts };
}


export default connect(mapStateToProps)(AlertList);