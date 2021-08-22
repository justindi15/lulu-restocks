import URL from 'url'
import isUrl from 'is-url'
import axios from 'axios'

export const searchForItem = async (url: string) => {
    validateUrl(url)
    
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
        return itemData   
    } catch (error) {
        console.log(error.message)
        throw new Error('We could not find this item. Please try something else.')
    }
}

const validateUrl = (url: string) => {
    const { host, query} = URL.parse(url, true)
    const { sz: size, color: colourId } = query

    if(!isUrl(url)) throw new Error('Not a valid URL')
    if(host !== 'shop.lululemon.com') throw new Error('Not a valid Lululemon item URL')
    if(!size || !colourId) throw new Error('Item URL is missing size or colour')
}

const fetchProductData = async (url: string) => {
    const response = await axios.get(url)
    return response.data.data
}

const parseProductData = (productData: any, colorCode: any, size: any) => {
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