import axios from './axios';

import Cookies from 'js-cookie'; // Asegúrate de instalar 'js-cookie' si usas cookies

export const getToken = () => {
    return Cookies.get('token'); // O usa localStorage.getItem('token') si prefieres
};

export const registerRequest = user => axios.post(`/register`, user);

export const loginRequest = user => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get('/verify')
