import { SET_AUTH, REMOVE_AUTH } from '../constants';
import axios from 'axios';


export const exchangeTokenForAuth = history => (
    dispatch => {
        const token = window.localStorage.getItem('token');
        if(!token) return;
        return axios.get('/api/auth', { headers: { authorization: token } })
            .then(res => res.data)
            .then(auth => {
                dispatch(_setAuth(auth));
                if(history) history.push(`/profile/${auth.id}`);
            })
            .catch(ex => window.localStorage.removeItem('token'))
    }
)

const _setAuth = auth => ({
    type: SET_AUTH,
    auth
})
export const login = (credentials, history) => (
    dispatch => (
        axios.post('/api/auth', credentials)
            .then(res => res.data)
            .then(data => {
                window.localStorage.setItem('token', data.token);
                dispatch(exchangeTokenForAuth(history));
            })
    )
)

const _removeAuth = auth => ({
    type: REMOVE_AUTH,
    auth
})

export const logout = history => {
    window.localStorage.removeItem('token');
    history.push('/profile/login');
    return _removeAuth({});
}