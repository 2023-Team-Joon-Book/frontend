import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1'
//   import.meta.env.MODE === 'development'
//     ? '/api'
//     : 'http://3.35.88.150:8000/api';

export const baseInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL, // 기본 URL 설정
})
const token = localStorage.getItem('accessToken')
if (token) {
    baseInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const updateToken = (token: string) => {
  baseInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

//axios대신 baseInstance

//authInstance
