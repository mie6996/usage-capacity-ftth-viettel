import axios from 'axios';

const client = axios.create({
  baseURL: process.env.VIETTEL_API,
  // add cookie to request
  withCredentials: true,

  // add header to request

  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
