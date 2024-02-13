import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://api.themoviedb.org/3',
  params: {
    api_key: '730bf1f5e636e59914dcd72ec1352ba5',
    language: 'ko-KR',
  },
});

export default instance;
