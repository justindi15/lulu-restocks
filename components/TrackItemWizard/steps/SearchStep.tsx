import React, { useState } from 'react'
import { postData } from '../../../utils/api'
import { Button } from '../../Button'
import { SearchInput } from '../../SearchInput'
import { Form, STEPS } from '../TrackItemWizard'
import isUrl from 'is-url'
import { Transition } from '@headlessui/react'
import URL from 'url'

type SearchStepProps = {
    setCurrentStep: Function,
    setForm: Function
}

export const SearchStep = ({ setCurrentStep, setForm }: SearchStepProps) => {

    const [url, setUrl] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isShowing, setIsShowing] = useState(true)

    const goToSubscribe = () => {
        setCurrentStep(STEPS.SUBSCRIBE)
    }

    const submit = async () => {
        setError('')

        try {
            validateUrl(url)   
        } catch (error) {
            setError(error.message)
            return;
        }

        // submit form and handle response
        setIsLoading(true)
        try {
            const response = await postData('/parse', {url: url})
            const item = response.data
            setForm((previousForm: Form)=>({
                ...previousForm,
                item
            }))
            setIsLoading(false)
            setIsShowing(false)
        } catch (error) {
            setIsLoading(false)
            if(error?.response?.data){
                setError(error.response.data)
            }else{
                setError(error.message)
            }
        }
    }

    const validateUrl = (url: string) => {
        const { host, query} = URL.parse(url, true)
        const { sz: size, color: colourId } = query

        if(!isUrl(url)) throw new Error('Not a valid URL')
        if(host !== 'shop.lululemon.com') throw new Error('Not a valid Lululemon item URL')
        if(!size || !colourId) throw new Error('Item is missing size or colour')
    }
    
    return (
        <Transition
                show={isShowing}
                appear
                unmount={false}
                enter="transition-opacity ease-in-out duration-900"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-in-out duration-900"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={goToSubscribe}
            >
            <div className="flex flex-col">
                <span className="font-bold text-3xl text-center max-w-lg">{"Be the first to know when your favorite items restock—"}</span>
                <SearchInput url={url} setUrl={setUrl}/>
                <span className="mb-5 text-lulured">{error.toString()}</span>
                <Button text={'TRACK AN ITEM'} onPress={submit} isLoading={isLoading}/>
            </div>
        </Transition>
    )
}