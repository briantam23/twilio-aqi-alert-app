import { LOAD_INITIAL_USERS, CREATE_USER, UPDATE_USER, CREATE_ALERT, DESTROY_ALERT } from '../constants';
import { updateUser } from '../../util/reducerUtil';


const usersReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_USERS:
            return action.users;
        case CREATE_USER:
            return [...state, action.user];
        case UPDATE_USER:
            return state.map(user => user.id !== action.user.id ? user : action.user);
        case CREATE_ALERT:
            return updateUser(state, action, CREATE_ALERT);
        case DESTROY_ALERT:
            return updateUser(state, action, DESTROY_ALERT);
        default:
            return state;
    }
}


export default usersReducer;