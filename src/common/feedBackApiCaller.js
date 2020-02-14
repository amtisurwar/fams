import fetch from 'isomorphic-fetch';

const { Promise } = require('es6-promise');

const API_URL = 'http://port-1337.hotel-pritamparua609385409.codeanyapp.com/';
export default (endpoint, method = 'get', body, accessToken) => fetch(`${API_URL}${endpoint}`, {
  headers: { 'content-type': 'application/json', 'Authorization': accessToken },
  method,
  body: JSON.stringify(body),
})
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  })
  .then(
    response => response,
    error => error,
  );
