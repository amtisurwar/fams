import fetch from 'cross-fetch';

const { Promise } = require('es6-promise');

// const API_URL = 'http://cardealertest.demoappstore.com/cardealer/';
const API_URL = 'http://fams.demoappstore.com/cardealer/';
// const API_URL = 'http://cardealer.demoappstore.com/cardealer/';
export default (endpoint, method = 'get', headerToken, body) => fetch(`${API_URL}${endpoint}`, {
  headers: { 'content-type': 'application/json', 'authentication': headerToken },
  method,
  body: JSON.stringify(body),
})
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    console.log("request api => "+`${API_URL}${endpoint}`+" Token => "+headerToken+" Body => ",body)
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  })
  .then(
    response => response,
    error => error,
  );
