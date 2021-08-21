import axios, { AxiosRequestConfig } from 'axios'
import { getEnvVar } from './getEnvVar'

const API_URL = getEnvVar(process.env.NEXT_PUBLIC_BACKEND_URL)
console.log(API_URL)

export const postData = (endpoint: string, body: any, config?: AxiosRequestConfig) => axios.post(`${API_URL}${endpoint}`, body, config)