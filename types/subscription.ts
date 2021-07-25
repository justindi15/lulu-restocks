export type Subscription = {
    email: string,
    country: 'CA' | 'US',
    phone: string,
    affiliateLink: string,
    createdAt: Date,
    emailVerified: boolean,
    item: {
        url: string,
        sku: string,
        size: string,
        colourId: string,
        productId: string,
        name: string,
        imageUrl: string,
        colourString: string
    }
}