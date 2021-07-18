import React from 'react'
import InputMask from 'react-input-mask'

type InputProps = {
    value: string;
    onChange: Function;
    type: string;
    label: string;
    error?: string;
    placeholder?: string;
    mask?: any;
}

export const Input = (props: InputProps) => {
    const { label, onChange, error, mask, ...inputProps } = props
    return(
        <div>
            <label className="block text-md">
                {label}
            </label>
            <div className="mt-1">
                <InputMask
                    mask={mask || ""}
                    {...inputProps}
                    onChange={(event)=>onChange(event.target.value)}
                    className={`block p-3 w-full border-${error ? 'red' : 'black'} focus:outline-none sm:text-sm rounded-md`}
                />
            </div>
            <p className="mt-2 text-sm text-lulured-600">
                {error}
            </p>
        </div>
    )
}