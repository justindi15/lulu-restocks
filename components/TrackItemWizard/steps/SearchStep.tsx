import React, { useState } from 'react'
import { Button } from '../../Button'
import { SearchInput } from '../../SearchInput'
import { Form, STEPS } from '../TrackItemWizard'
import { Transition } from '@headlessui/react'
import { searchForItem } from '../../../utils/searchForItem'

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

        // submit form and handle response
        setIsLoading(true)
        try {
            const item = await searchForItem(url)
            setForm((previousForm: Form)=>({
                ...previousForm,
                item
            }))
            setIsLoading(false)
            setIsShowing(false)
        } catch (error) {
            setIsLoading(false)
            setError(error.message)
        }
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