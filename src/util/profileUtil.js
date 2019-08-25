export const findUserAlerts = (auth, users) => {
    const user = users.find(user => user.id === auth.id);
    return user ? user.alerts : [];
}

export const specialCharRegex = password => {
    const _specialCharRegex = /[*@!#%&()^~{}]+/;
    return _specialCharRegex.test(password);
}