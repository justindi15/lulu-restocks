import React, { useState } from 'react'
import ItemDetails from '../../ItemDetails/ItemDetails'
import SubscribeForm from '../../SubscribeForm'
import { Form, STEPS } from '../TrackItemWizard'
import { ArrowNarrowLeftIcon } from '@heroicons/react/solid'
import { initialForm } from '../TrackItemWizard'
import { Transition } from '@headlessui/react'

type SubscribeStepProps = {
    setCurrentStep: Function,
    form: Form,
    setForm: Function
}

export const SubscribeStep = ({setCurrentStep, form, setForm}: SubscribeStepProps) => {

    const [transition, setTransition] = useState({isShowing: true, transitionTo: ''})

    const transitionToStep = () => {
        setCurrentStep(transition.transitionTo)
        setForm(initialForm)
    }

    return (
        <Transition
            show={transition.isShowing}
            appear
            enter="transition-opacity ease-in-out duration-900"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in-out duration-900"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={transitionToStep}
        >
            <div className="max-w-6xl w-full pt-20">
                <button type="button" className="invisible md:visible md:pl-8 underline text-sm flex flex-row" onClick={()=>setTransition({isShowing: false, transitionTo: STEPS.SEARCH})}>
                        <ArrowNarrowLeftIcon className="h-5 w-5 pr-1"/>
                        <span>{"search for something else"}</span>
                </button>
                <div className="flex flex-wrap w-full">
                    <div className="w-full md:p-8 md:w-1/2">
                        <img src={form.item.imageUrl} alt={'item'}/>
                    </div>
                    <div className="w-full md:p-8 flex flex-col md:w-1/2">
                        <ItemDetails item={form.item}/>
                        <hr className="max-w-sm my-10 text-lightgray font-bold"/>
                        <SubscribeForm form={form} setForm={setForm} setTransition={setTransition}/>
                    </div>
                </div>
                <button type="button" className="visible md:invisible w-full py-5 underline text-sm flex flex-row justify-center" onClick={()=>setTransition({isShowing: false, transitionTo: STEPS.SEARCH})}>
                        <ArrowNarrowLeftIcon className="h-5 w-5 pr-1"/>
                        <span>{"search for something else"}</span>
                </button>
            </div>
        </Transition>
    )
}