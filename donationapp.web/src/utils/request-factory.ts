import API from './api';
import axios from 'axios';

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
            data: error.message,
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
            data: error.message,
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
            data: error.message,
          });
        });
    });
  },
  all(ajaxCalls: Promise<any>[]): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.all(ajaxCalls)
        .then(axios.spread((acct, perms) => {
          // Both requests are now complete
          resolve(acct);
        })).catch((error) => {
        reject(error);
      });
    });
  },
};
