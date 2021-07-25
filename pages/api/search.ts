import type { NextApiRequest, NextApiResponse } from 'next'
import URL from 'url'
import isUrl from 'is-url'
import axios from 'axios'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return searchForItem(req, res)
        default:
            return res.status(404).send('Request handler not found')
    }
}

const searchForItem = async (req: NextApiRequest, res: NextApiResponse) => {
    const { url } = req.body

    try {
        validateUrl(url)
    } catch (error) {
        res.status(401).send(error.message)
        return;
    }
    
    const { protocol, host, path, query} = URL.parse(url, true)
    const fetchUrl = `${protocol}//${host}/api${path}`
    let { sz: size, color: colourId } = query
    if(size === 'ONESIZE'){
        size = 'ONE SIZE'
    }
    try {
        const productData = await fetchProductData(fetchUrl)
        const { id: sku, productId, name, imageUrl, colourString } = parseProductData(productData, colourId, size)
        const itemData = {
            url,
            sku,
            size,
            colourId,
            productId,
            name,
            imageUrl,
            colourString
        }
        res.send(itemData)   
    } catch (error) {
        console.log(error.message)
        res.status(404).send('We could not find this item. Please try something else.')
    }
    return;
}

const validateUrl = (url: string) => {
    const { host, query} = URL.parse(url, true)
    const { sz: size, color: colourId } = query

    if(!isUrl(url)) throw new Error('Not a valid URL')
    if(host !== 'shop.lululemon.com') throw new Error('Not a valid Lululemon item URL')
    if(!size || !colourId) throw new Error('Item URL is missing size or colour')
}

export const fetchProductData = async (url: string) => {
    const response = await axios.get(url)
    return response.data.data
}

export const parseProductData = (productData: any, colorCode: any, size: any) => {
    const childSkus = [...productData.attributes['child-skus']]
    const skuData = childSkus.find(childSku => childSku.size === size && childSku['color-code'] === colorCode)

    if(!skuData){
        throw new Error('could not find item with given color/size')
    }

    const name = productData.attributes['product-summary']['display-name'];

    const productCarousel = [...productData.attributes['product-carousel']]
    const carouselData = productCarousel.find(carouselItem => carouselItem['color-code'] === colorCode)
    const colourString = carouselData['swatch-color-name']
    const imageUrl = carouselData['image-info'][0]

    return {...skuData, name, colourString, imageUrl}
}