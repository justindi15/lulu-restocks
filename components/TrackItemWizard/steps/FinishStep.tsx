import { CheckCircleIcon } from '@heroicons/react/solid'
import { Transition } from '@headlessui/react'
import React, { useState } from 'react'
import { STEPS } from '../TrackItemWizard'

type FinishStepProps = {
    setCurrentStep: Function
}

export const FinishStep = ({ setCurrentStep }: FinishStepProps) => {

    const [isShowing, setIsShowing] = useState(true)

    const goToSearch = () => {
        setCurrentStep(STEPS.SEARCH)
    }

    return(
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
        afterLeave={goToSearch}
        >
            <div className="space-y-20 flex flex-col items-center">
                <div className="flex flex-col items-center">
                    <CheckCircleIcon className="w-14 h-14 text-green-500"/>
                    <span className="font-extrabold text-2xl text-center">We sent you a verification email!</span>
                    <span className="max-w-xs text-center mt-5">Tip: check your spam inbox and add <span className="font-bold">hello@lulurestocks.com</span> to your address list to ensure you receive our emails.</span>
                </div>

                <button type="button" className="underline font-bold" onClick={()=>setIsShowing(false)}>
                            <span>{"Track another item"}</span>
                </button>
            </div>
        </Transition>
    )
}