import { Twilio } from "twilio";
import { Subscription } from "../types/subscription";
import { getEnvVar } from "../utils/getEnvVar";

const TWILIO_ACCOUNT_SID = getEnvVar(process.env.TWILIO_ACCOUNT_SID)
const TWILIO_AUTH_TOKEN = getEnvVar(process.env.TWILIO_AUTH_TOKEN)
const TWILIO_PHONE_NUMBER = getEnvVar(process.env.TWILIO_PHONE_NUMBER)

const twilio = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

export const sendHasRestockedText = (subscription: Subscription) => {
    // TODO:
    // - phone validation
    if(subscription.phone){
        const { phone, item, affiliateLink } = subscription
        return twilio.messages.create({
            to: phone,
            from: TWILIO_PHONE_NUMBER,
            body: `${item.name} in size ${item.size}, ${item.colourString}, is now back in stock! ${affiliateLink}`
        })
    }
}

