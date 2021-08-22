import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchSubscription } from '../../utils/firestore'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return verifyEmail(req, res)
        default:
            return res.status(404).send('Request handler not found')
    }
}

const verifyEmail = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.body
    try {
        const subscription = await fetchSubscription(id)
        await subscription.ref.update({emailVerified: true})
        res.send(subscription.data())
    } catch (error) {
        res.status(404).send(error.message)
    }
}