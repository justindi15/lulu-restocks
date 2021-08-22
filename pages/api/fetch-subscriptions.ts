import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchVerifiedSubscriptions } from '../../utils/firestore'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return fetchSubscriptions(req, res)
        default:
            return res.status(404).send('Request handler not found')
    }
}

const fetchSubscriptions = async (req: NextApiRequest, res: NextApiResponse) => {
    const subscriptions = await fetchVerifiedSubscriptions()
    const subscriptionDocs = subscriptions.docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        return {...data, id}
    })
    return res.json({subscriptions: subscriptionDocs})
}