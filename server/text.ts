import { Twilio } from "twilio";
import * as env from 'env-var';
const TWILIO_ACCOUNT_SID = env.get('TWILIO_ACCOUNT_SID').required().asString();
const TWILIO_AUTH_TOKEN = env.get('TWILIO_AUTH_TOKEN').required().asString();
const TWILIO_PHONE_NUMBER = env.get('TWILIO_PHONE_NUMBER').required().asString();

const twilio = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

export const sendHasRestockedText = (subscription) => {
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

