import React, { useState } from 'react'
import { postData } from '../utils/api'
import { Button } from './Button'
import { Input } from './Input'
import { SelectMenu } from './SelectMenu'
import { Form, STEPS } from './TrackItemWizard/TrackItemWizard'
import * as yup from 'yup';
import { ExclamationCircleIcon } from '@heroicons/react/solid'

type SubscribeFormProps = {
    form: Form,
    setForm: Function,
    setTransition: Function
}

export const SubscribeForm = ({form, setForm, setTransition}: SubscribeFormProps) => {

    const selectOptions = [{value: 'CA', label: 'Canada'}, {value: 'US', label: 'USA'}]
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const submit = async () => {
        setError('')

        const data = {
            ...form,
            phone: reformatPhone(form.phone)
        }
        try {
            await formSchema.validate(data)
        } catch (error) {
            setError(error.errors[0])
            return;
        }

        try {
            setIsLoading(true)
            await postData('/subscription', data)
            setIsLoading(false)
            setTransition({isShowing: false, transitionTo: STEPS.FINISH})
        } catch (error) {
            setIsLoading(false)
            if(error?.response?.data){
                setError(error.response.data)
            }else{
                setError(error.message)
            }
        }
    }

    const reformatPhone = (maskedPhone: string) => {
        return maskedPhone.replace(/[- _)(]/g, '')
    }

    const setEmail = (email: string) => {
        setForm((previousForm: Form) => ({
            ...previousForm,
            email
        }))
    }
    
    const setCountry = (country: string) => {
        setForm((previousForm: Form) => ({
            ...previousForm,
            country
        }))
    }

    const setPhone = (phone: string) => {
        setForm((previousForm: Form) => ({
            ...previousForm,
            phone
        }))
    }

    return (
        <div className="flex flex-col max-w-sm w-full space-y-10">
            <div className="space-y-3">
                <span className="font-bold text-3xl">Get notified when this item restocks</span>
                <Input
                    label={'Email Address'}
                    value={form.email}
                    onChange={setEmail}
                    type={'text'}
                    placeholder={'you@example.com'}
                />
                <SelectMenu 
                    label={'Location'}
                    options={selectOptions}
                    value={form.country}
                    onChange={setCountry}
                />
                <Input
                    label={'Phone (optional)'}
                    value={form.phone}
                    onChange={setPhone}
                    type={'text'}
                    mask={'+1 (999)-999-9999'}
                    placeholder={'+ 1 (999)-999-9999'}
                />
            </div>
            <div className="flex flex-col w-full">
                {error && (
                <div className="p-3 mb-3 bg-pink-100 border-lulured border flex flex-row space-x-2 align-center">
                    <ExclamationCircleIcon className="h-5 w-5 text-lulured"/>
                    <span>{error.toString()}</span>
                </div>
                )}
                <Button onPress={submit} text={'SUBSCRIBE TO RESTOCKS'} isLoading={isLoading}/>
            </div>
        </div>
    )
}

const formSchema = yup.object().shape({
    email: yup.string().email().required(),
    country: yup.string().matches(/(CA|US)/).required(),
    phone: yup.string().matches(/^\+1\d{10}$/, { message:"must be a valid phone number", excludeEmptyString: true }).optional(),
    item: yup.object().shape({
        url: yup.string().url().required(),
        sku: yup.string().required(),
        size: yup.string().required(),
        colourId: yup.string().required(),
        productId: yup.string().required(),
        name: yup.string().required(),
        imageUrl: yup.string().required(),
        colourString: yup.string().required()
    })
});
