import axios from "axios";

const serve = axios.create({ baseURL: '', timeout: 20000 });

serve.interceptors.request.use(config => {
  config.headers.toKen = '';
  return config;
}, err => Promise.reject(err));

serve.interceptors.response.use(response => {
  return response && response.data;
}, err => {

  return Promise.reject(err);
});

export default serve;
