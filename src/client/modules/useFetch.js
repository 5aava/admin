import { useState, useEffect } from "react";
import clientConfig from '../config/config.client';


const useFetch = (url, body) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url, {
      method: 'POST',
      headers: {
        'X-API-KEY': clientConfig.clientkey,
        'X-ACCESS-TOKEN': window.localStorage.getItem('access-token') || null,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ body }),
    })
      .then((res) => res.json())
      .then((json) => setData(json.data));
  }, [url]);

  return [data];
};

export default useFetch;
