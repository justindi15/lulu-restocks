import type { NextApiRequest, NextApiResponse } from 'next'
import { sendHasRestockedEmail } from '../../utils/email'
import { fetchSubscription } from '../../utils/firestore'
import { sendHasRestockedText } from '../../utils/text'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return notifyUserAndDeleteSubscription(req, res)
        default:
            return res.status(404).send('Request handler not found')
    }
}

const notifyUserAndDeleteSubscription = async (req: NextApiRequest, res: NextApiResponse) => {
    const { subscription } = req.body
    try {
        await sendHasRestockedEmail(subscription)
        await sendHasRestockedText(subscription)
        const sub = await fetchSubscription(subscription.id)
        await sub.ref.delete()
        res.json(`Sent notification for ${subscription}`)
    } catch (error) {
        res.json({error: error.message})
    }
}
