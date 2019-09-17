import axios from "axios";

export default axios.create({
  baseURL: "https://api.rsh.im/api/",
  responseType: "json",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 5000
});
