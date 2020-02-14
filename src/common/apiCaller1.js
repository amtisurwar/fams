import fetch from 'cross-fetch';

const { Promise } = require('es6-promise');

// const API_URL = 'http://cardealertest.demoappstore.com/cardealer/';
const API_URL = 'http://cardealer.demoappstore.com/cardealer/';
export default (endpoint, method = 'get', headerToken, body) => fetch(`${API_URL}${endpoint}`, {
  method,
  body: body,
})
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    console.log("response==================", response);
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  })
  .then(
    response => response,
    error => error,
  );
