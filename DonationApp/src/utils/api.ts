import axios from 'axios';

export default axios.create({
  baseURL: 'http://donation.majalspace.com/api/',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 8000,
});
