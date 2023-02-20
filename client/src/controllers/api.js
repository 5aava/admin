import ClientConfig from '../config/config.client';


export function callApi (endpoint, body) {

  const protocol = ClientConfig.server.protocol;
  const host = ClientConfig.server.host;
  const port = ClientConfig.server.port;
  const url = `${protocol}://${host}:${port}`;
  //const token = localStorage.getItem('token') || null;

  body = {
    ...body,
    clientkey: ClientConfig.clientkey,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-client': ClientConfig.clientkey,
    },
    body: JSON.stringify(body),
  };

  const token = localStorage.getItem('token');
  if (token !== null && token.length > 15) {
    options.headers['x-api-auth'] = token;
  }

  return fetch(url + endpoint, options)
    .then(response => response.json().then(data => ({
      data,
      response,
    }))).then(({ data, response }) => {
      if (response.status == '401') {
        localStorage.removeItem('token');
        window.location.reload('/');
        return Promise.reject(JSON.stringify(data));
      } else {return data;}
    }).catch(err => {
      console.log(err);
    });
}


export function callApiGet (url) {

  const options = {
    method: 'GET',
  };

  return fetch(url, options)
    .then(response => response.json().then(data => ({
      data,
      response,
    }))).then(({ data, response }) => {

      return data;
    }).catch(err => {
      console.log(err);
    });
}
