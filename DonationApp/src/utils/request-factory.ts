import API from './api';

export default {
  post(endpoint: string, data: {} = {}, headers: {} = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      API.post(endpoint, data, { headers })
        .then((response) => {
          resolve({
            data: response.data,
          });
        })
        .catch((error) => {
          reject({
            data: error.response.data,
          });
        });
    });
  },
  put(endpoint: string, data: {} = {}, headers: {} = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      API.put(endpoint, data, { headers })
        .then((response) => {
          resolve({
            data: response.data,
          });
        })
        .catch((error) => {
          reject({
            data: error.response.data,
          });
        });
    });
  },
  get(endpoint: string, params: {} = {}, headers: {} = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      API.get(endpoint, { params: params, headers })
        .then((response: any) => {
          resolve({
            data: response.data,
          });
        })
        .catch((error) => {
          reject({
            data: error.response.data,
          });
        });
    });
  },
  all(ajaxCalls: Promise<any>[]): Promise<any> {
    return new Promise((resolve, reject) => {
      API.all(ajaxCalls)
        .then(API.spread((acct, perms) => {
          // Both requests are now complete
          resolve(acct);
        })).catch((error) => {
        reject(error);
      });
    });
  },
};
