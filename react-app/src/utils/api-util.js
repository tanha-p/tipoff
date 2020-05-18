import axios from 'axios';

export default axios.create({
  baseURL: `/api/v1`,
  timeout: 2 * 60 * 1000 // 2 mins
});