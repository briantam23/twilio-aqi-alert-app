import { LOAD_INITIAL_USERS, CREATE_USER, UPDATE_USER, DESTROY_ALERT } from '../constants';
import { destroyUserAlert } from '../../util/reducerUtil';


const usersReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_USERS:
            return action.users;
        case CREATE_USER:
            return [...state, action.user];
        case UPDATE_USER:
            return state.map(user => user.id !== action.user.id ? user : action.user);
        case DESTROY_ALERT:
            const authUser = destroyUserAlert(state, action);
            return state.map(user => user.id !== action.alert.userId ? user : authUser);
        default:
            return state;
    }
}


export default usersReducer;