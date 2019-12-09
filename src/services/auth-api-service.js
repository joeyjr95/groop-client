import config from '../config';
import TokenService from './token-service';

const AuthApiService = {
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json(),
    );
  },
  updateUser(updatedUser) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(updatedUser),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json(),
    );
  },
  getUser() {
    return fetch(`${config.API_ENDPOINT}/users`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json(),
    );
  },
  postLogin({ username, password }) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then(res =>
      !res.ok ? res.json().then(err => Promise.reject(err)) : res.json(),
    );
  },

  refreshToken() {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json(),
    );
  },

  verifyPass(password) {
    return fetch(`${config.API_ENDPOINT}/users/verify`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(password),
    }).then(res => (!res.ok ? res.json().then(err => Promise.reject(err)) : 1));
  },
};

export default AuthApiService;
