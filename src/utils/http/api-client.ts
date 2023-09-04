import axios, { Axios } from 'axios';

class ApiClient extends Axios {
  constructor(baseURL: string) {
    super({
      ...axios.defaults,
      baseURL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
}

export default ApiClient;
