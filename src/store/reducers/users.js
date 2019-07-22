import { LOAD_INITIAL_USERS, CREATE_USER, UPDATE_USER, DESTROY_CITY } from '../constants';


const usersReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_USERS:
            return action.users;
        case CREATE_USER:
            return [...state, action.user];
        case UPDATE_USER:
            return state.map(user => user.id !== action.user.id ? user : action.user);
        case DESTROY_CITY:
            let authUser = state.find(user => user.id === action.city.userId);
            const authUserCities = authUser.cities.filter(city => city.id !== action.city.id);
            authUser = { ...authUser, cities: authUserCities };
            return state.map(user => user.id !== action.city.userId ? user : authUser);
        default:
            return state;
    }
}


export default usersReducer;