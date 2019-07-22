export const destroyUserAlert = (state, action) => {
    
    const authUser = state.find(user => user.id === action.alert.userId);
    const authUserAlerts = authUser.alerts.filter(alert => alert.id !== action.alert.id);

    return { ...authUser, alerts: authUserAlerts };
}