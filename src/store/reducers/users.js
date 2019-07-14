import { LOAD_INITIAL_USERS } from '../constants';


const usersReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_USERS:
            return action.users;
        default:
            return state;
    }
}


export default usersReducer;