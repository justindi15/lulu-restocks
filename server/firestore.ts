import {firestore} from "./firebase.js";

export const fetchVerifiedSubscriptions = async () => {
  return firestore.collection("subscriptions").where('emailVerified', '==', true).get();
};

export const fetchSubscription = async (id: string) => {
  return firestore.collection('subscriptions').doc(id).get()
}

export const createSubscription = (subscription) => {
    return firestore.collection("subscriptions").add(subscription)
}