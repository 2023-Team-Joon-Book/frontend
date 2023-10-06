import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1'
//   import.meta.env.MODE === 'development'
//     ? '/api'
//     : 'http://3.35.88.150:8000/api';

export const baseInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL, // 기본 URL 설정
})

//axios대신 baseInstance

//authInstance
