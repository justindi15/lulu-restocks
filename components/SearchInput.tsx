import React from 'react'
import { SearchIcon } from '@heroicons/react/outline'

type SearchInputProps = {
    url: string,
    setUrl: Function
}

export const SearchInput = ({url, setUrl}: SearchInputProps) => {

    const placeholder = "https://shop.lululemon.com/p/womens-outerwear/Scuba-Hoodie-IV/_/prod8351383?color=50006&sz=8"

    return (
            <div className="max-w-xl w-full mt-10 flex relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    type="search"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder={placeholder}
                    value={url}
                    onChange={(event)=>setUrl(event.target.value)}
                />
            </div>
    )
}