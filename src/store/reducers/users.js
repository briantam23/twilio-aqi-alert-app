import { LOAD_INITIAL_USERS, CREATE_USER } from '../constants';


const usersReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_USERS:
            return action.users;
        case CREATE_USER:
            return [...state, action.user];
        default:
            return state;
    }
}


export default usersReducer;