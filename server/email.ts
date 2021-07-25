import sgMail from "@sendgrid/mail";
import * as env from 'env-var'
import { Subscription } from "../types/subscription";
const SENDGRID_API_KEY = env.get('SENDGRID_API_KEY').required().asString()
const FRONTEND_URL = env.get('FRONTEND_URL').required().asString()

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendHasRestockedEmail = async (subscription: Subscription) => {
  const msg = {
    to: subscription.email,
    from: {
      email: 'hello@lulurestocks.com',
      name: 'Lulu Restocks'
    },
    templateId: "d-bc5bfe03345b49d18f2bc029b3cf05fc",
    dynamic_template_data: subscription,
    asm:{
      groupId: 169327,
      groupsToDisplay: [169326, 169327],
      }
  };
  return sgMail.send(msg);
};

export const sendVerifyEmail = async (email: string, id: string) => {
    const msg = {
        to: email, 
        from: {
          email: 'hello@lulurestocks.com',
          name: 'Lulu Restocks'
        },
        templateId: "d-a14727ffc61947998815ef1a08bd81da",
        dynamic_template_data: {
            "verifyUrl": `${FRONTEND_URL}/verify/${id}` 
            },
        asm:{
              groupId: 169326,
              groupsToDisplay: [169326, 169327],
              }
        };
        return sgMail.send(msg);
}