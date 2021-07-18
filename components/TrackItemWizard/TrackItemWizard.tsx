import React, { useState } from 'react'
import { FinishStep } from './steps/FinishStep'
import { SearchStep } from './steps/SearchStep'
import { SubscribeStep } from './steps/SubscribeStep'

export enum STEPS {
    SEARCH = '1',
    SUBSCRIBE = '2',
    FINISH = '3'
}

export type Form = {
    email: string,
    country: string,
    phone: string,
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

export const initialForm: Form = {
    email: '',
    country: 'CA',
    phone: '',
    item: {
        url: '',
        sku: '',
        size: '',
        colourId: '',
        productId: '',
        name: '',
        imageUrl: '',
        colourString: ''
    }
}

export const TrackItemWizard = () => {

    const [currentStep, setCurrentStep] = useState(STEPS.SEARCH)
    const [form, setForm] = useState(initialForm)

    switch (currentStep){
        case STEPS.SEARCH:
            return <SearchStep setCurrentStep={setCurrentStep} setForm={setForm}/>
        case STEPS.SUBSCRIBE:
            return <SubscribeStep setCurrentStep={setCurrentStep} form={form} setForm={setForm}/>
        case STEPS.FINISH:
            return <FinishStep setCurrentStep={setCurrentStep}/>
        default:
            return null;
    }
}