import clientConfig from '../config/config.client';


export default async function privateFetcher (url, body){
  return await fetch(url, {
    method: 'POST',
    headers: {
      'X-API-KEY': clientConfig.clientkey,
      'X-ACCESS-TOKEN': window.localStorage.getItem('access-token') || null,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ body }),
  })
    .then((res) => res.json())
    .then((json) => json.data);
}
