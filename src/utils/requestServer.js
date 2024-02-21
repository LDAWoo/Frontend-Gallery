import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL_BACKEND,
});

export const get = async (path, options = {}, token) => {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        ...options.headers,
      }
    : options.headers;

  const response = await request.get(path, {
    ...options,
    headers,
  });

  return response.data;
};

export const post = async (path, data = {}, token, options = {}) => {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      }
    : options.headers || {};

  const response = await request.post(path, data, { headers });

  return response.data;
};

export const put = async (path, data = {}, token, options = {}) => {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      }
    : options.headers || {};

  const response = await request.put(path, data, { headers });
  return response.data;
};

export const Delete = async (path, data = {}, token, options = {}) => {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      }
    : options.headers || {};

  const response = await request.delete(path, data, { headers });
  return response.data;
};

export default request;
