import React from 'react';
import style from './alertList.less';
import SingleAlert from './singleAlert/SingleAlert';
import { findUserAlerts } from '../../../../util/profileUtil';


const AlertList = ({ alerts }) => (
    <div className={ style.alertListContainer }>
        { alerts.map(alert => <SingleAlert alert={ alert } key={ alert.id }/>) }
    </div>
)


export default AlertList;