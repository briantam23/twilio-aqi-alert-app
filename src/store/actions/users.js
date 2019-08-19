import axios from "axios";
import { LOAD_INITIAL_USERS, CREATE_USER, UPDATE_USER, DESTROY_USER, CREATE_ALERT, DESTROY_ALERT } from '../constants';


const _loadInitialUsers = users => ({
    type: LOAD_INITIAL_USERS,
    users
})
export const loadInitialUsers = () => (
    dispatch => (
        axios.get('/api/users')
            .then(res => res.data)
            .then(users => dispatch(_loadInitialUsers(users)))
    )
)

export const _createUser = user => ({
    type: CREATE_USER,
    user
})
export const createUser = (user, history) => (
    dispatch => (
        axios.post('/api/users', user)
            .then(res => res.data)
            .then(_user => dispatch(_createUser({ ..._user, alerts: [] })))
            .then(() => history.push('/profile'))
    )
)

const _updateUser = user => ({
    type: UPDATE_USER,
    user
})
export const updateUser = (user, history) => (
    dispatch => (
        axios.put(`/api/users/${user.id}`, user)
            .then(res => res.data)
            .then(_user => dispatch(_updateUser(_user)))
            //.then(() => history.push('/'))
    )
)

const _createAlert = alert => ({
    type: CREATE_ALERT,
    alert
})
export const createAlert = alert => (
    dispatch => (
        axios.post(`/api/users/${alert.userId}/alerts`, alert)
            .then(res => res.data)
            .then(_alert => dispatch(_createAlert(_alert)))
    )
)

const _destroyAlert = alert => ({
    type: DESTROY_ALERT,
    alert
})
export const destroyAlert = alert => (
    dispatch => (
        axios.delete(`/api/users/${alert.userId}/alerts/${alert.id}`)
            .then(() => dispatch(_destroyAlert(alert)))
    )
)