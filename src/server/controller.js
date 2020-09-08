import {BehaviorSubject} from 'rxjs'
import {fetchWrapper} from './api'

const mainUser = new BehaviorSubject(null)

const baseUrl = 'http://localhost:3800/account'

const accountController = {
    register,
    login,
    refreshToken,
    user: mainUser.asObservable(),
    get userValue () { 
        return mainUser.value 
    }
}

function register(params) {
    return fetchWrapper.post(`${baseUrl}/register`, params);
}

function login(email, password) {
    return fetchWrapper.post(`${baseUrl}/authenticate`, { email, password })
    .then(user => {
        console.log(user)
        // publish user to subscribers and start timer to refresh token
        mainUser.next(user);
        startRefreshTokenTimer();
        return user;
    });
}

function refreshToken() {
    return fetchWrapper.post(`${baseUrl}/refresh-token`, {})
    .then(user => {
        // publish user to subscribers and start timer to refresh token
        mainUser.next(user);
        startRefreshTokenTimer();
        return user;
    });
}

let refreshTokenTimeout;

function startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(mainUser.value.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    refreshTokenTimeout = setTimeout(refreshToken(), timeout);
}

function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout);
}

export default accountController