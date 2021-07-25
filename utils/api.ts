import axios, { AxiosRequestConfig } from 'axios'
import * as env from 'env-var'

const API_URL = env.get('NEXT_PUBLIC_BACKEND_URL').required().asString()

export const postData = (endpoint: string, body: any, config?: AxiosRequestConfig) => axios.post(`${API_URL}${endpoint}`, body, config)