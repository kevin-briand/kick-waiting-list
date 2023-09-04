import ApiClient from '../../utils/http/api-client';

class ApiKick extends ApiClient {
  constructor() {
    super('https://kick.com/api/v2/');
  }
}

export default ApiKick;
