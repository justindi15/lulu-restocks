import axios, { AxiosRequestConfig } from 'axios'
import { getEnvVar } from './getEnvVar'

export const postData = (endpoint: string, body: any, config?: AxiosRequestConfig) => axios.post(endpoint, body, config)