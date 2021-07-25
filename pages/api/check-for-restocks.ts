import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { fetchVerifiedSubscriptions } from '../../server/firestore'
import { sendHasRestockedEmail } from '../../server/email'
import { sendHasRestockedText } from '../../server/text'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return checkForRestocks(req, res)
        default:
            return res.status(404).send('Request handler not found')
    }
}

const checkForRestocks = async (req: NextApiRequest, res: NextApiResponse) => {
    const subscriptions = await fetchVerifiedSubscriptions()
    const jobs = subscriptions.docs.map(checkSubscription)

    const results = await Promise.all(jobs)
    const errors = results.filter(job => job.error)
    const available = results.filter(job => job.available)
    available.forEach(async (subscription)=>{
        await sendHasRestockedEmail(subscription)
        await sendHasRestockedText(subscription)
    })
    res.json({ results, errors, available })   
}

export const checkSubscription = async (subscriptionDoc: any) => {
    const subscription = subscriptionDoc.data()
    try{
        const { item, country } = subscription;
        const { sku, productId } = item
        const url = `https://shop.lululemon.com/api/shipinventory?skus=${sku}&productId=${productId}&sl=${country}&locale=en_${country}`
        const response = await axios.get(url, {
            headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36"
            }
        })
        const available = response.data[sku].available
        if(available){
            await subscriptionDoc.ref.delete()
        }
        return({ ...subscription, available })
    } catch(error) {
        return({ ...subscription, error: error.message })
    }
}