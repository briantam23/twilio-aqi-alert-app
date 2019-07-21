import React from 'react';
import { connect } from 'react-redux';
import style from './alertList.less';
import SingleAlert from './singleAlert/SingleAlert';
import { findUserCityAlerts } from '../../../../util/profileUtil';


const AlertList = ({ cities }) => (
    <div className={ style.alertListContainer }>
        { cities.map(city => <SingleAlert city={ city } key={ city.id }/>) }
    </div>
)


const mapStateToProps = ({ auth, users }) => {
    const cities = findUserCityAlerts(auth, users);
    return { cities };
}


export default connect(mapStateToProps)(AlertList);