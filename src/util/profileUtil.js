export const findUserAlerts = (auth, users) => {
    const user = users.find(user => user.id === auth.id);
    return user ? user.alerts : [];
}