import axios, { AxiosRequestConfig } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const getData = (endpoint: string, config?: AxiosRequestConfig) => {
    return axios.get(`${API_URL}${endpoint}`)
}

export const postData = (endpoint: string, body: any, config?: AxiosRequestConfig) => {

    // const testItem = {
    //     colourId: "50006",
    //     colourString: "Le Tigre Camo WP Deep Coal Multi",
    //     imageUrl: "https://images.lululemon.com/is/image/lululemon/LW4BQDS_050006_1",
    //     name: "Scuba Hoodie *Light Cotton Fleece",
    //     productId: "prod8351133",
    //     size: "8",
    //     sku: "127700780",
    //     url: "https://shop.lululemon.com/p/womens-outerwear/Scuba-Hoodie-IV/_/prod8351383?color=50006&sz=8",
    // }


    return axios.post(`${API_URL}${endpoint}`, body, config)
    // return {
    //     data: testItem
    // }
}