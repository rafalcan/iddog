import axios from "axios";
import { TOKEN } from "providers/Auth";

const API = axios.create({
  baseURL: 'https://api-iddog.idwall.co/'
});

API.interceptors.request.use(async config => {
  const token = localStorage.getItem(TOKEN);

  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});

export default API;
