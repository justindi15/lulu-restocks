import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createSubscription } from '../../utils/firestore'
import { sendVerifyEmail } from '../../utils/email'
import { getEnvVar } from '../../utils/getEnvVar'

const PARTNERIZE_USERNAME = getEnvVar(process.env.PARTNERIZE_USERNAME)
const PARTNERIZE_PASSWORD = getEnvVar(process.env.PARTNERIZE_PASSWORD)
const PARTNERIZE_ID = getEnvVar(process.env.PARTNERIZE_ID)

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return createNewSubscription(req, res)
        default:
            return res.status(404).send('Request handler not found')
    }
}

const createNewSubscription = async (req: NextApiRequest, res: NextApiResponse) => {
    const subscription = req.body

    // validate request body
    // validate(subscription)
    // if error res.status(400)
    const affiliateLink = await createAffiliateLink(subscription.item.url)
    // if subscription with email already exists then set emailVerified to true for this subscription
    // send user to now tracking screen if email already verified
    const newSubscriptionRef = await createSubscription({
        ...subscription,
        createdAt: new Date(), 
        affiliateLink, 
        emailVerified: false
    })
    try {
        await sendVerifyEmail(subscription.email, newSubscriptionRef.id)   
    } catch (error) {
        console.error('failed to send verification email', error.message)
    }
    res.send('ok')
}

const createAffiliateLink = async (itemUrl: string) => {
    try {
        const url = `https://api.partnerize.com/v2/publishers/${PARTNERIZE_ID}/links`
        const body = {
            campaign_id: "1100l489",
            destination_url: itemUrl
        }
        const config = {
            auth: {
                username: PARTNERIZE_USERNAME,
                password: PARTNERIZE_PASSWORD
            }
        }
        const response = await axios.post(url, body, config)
        const { link } = response.data
        const { tracking_short_url } = link
        return tracking_short_url   
    } catch (error) {
        console.error('error creating affiliate link: ', error.message)
        return `https://prf.hn/click/camref:1011ljccC/destination:${itemUrl}`
    }
}