export const findUserCityAlerts = (auth, users) => {
    const user = users.find(user => user.id === auth.id);
    return user.cities;
}