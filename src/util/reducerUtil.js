import { CREATE_ALERT } from '../store/constants';


export const updateUser = (state, action, type) => {
    
    let authUser = state.find(user => user.id === action.alert.userId);
    let authUserAlerts;

    type === CREATE_ALERT 
        ? authUserAlerts = [...authUser.alerts, action.alert] 
        : authUserAlerts = authUser.alerts.filter(alert => alert.id !== action.alert.id)

    authUser = { ...authUser, alerts: authUserAlerts };

    return state.map(user => user.id !== action.alert.userId ? user : authUser)
}