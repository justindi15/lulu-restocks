import React from 'react'

type Option = {
    label: string;
    value: string;
}

type SelectMenuProps = {
    options: Array<Option>
    label: string;
    value: string;
    onChange: Function;
}

export const SelectMenu = ({options, label, value, onChange}: SelectMenuProps) => {
    return(
        <div>
            <label className="block text-md">
                {label}
            </label>
            <select 
                className="mt-1 block w-full pl-3 pr-10 py-3 text-base focus:outline-none sm:text-sm rounded-md"
                value={value}
                onChange={e => onChange(e.target.value)}
                >
                {options.map((({label, value}: Option, index: number)=>(
                    <option key={index} value={value}>{label}</option>
                )))}
            </select>
        </div>
    )
}