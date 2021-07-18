import { Form } from "./TrackItemWizard/TrackItemWizard"
import React from 'react'

type ItemDetailsProps = {
    item: Form['item']
}

export const ItemDetails = ({item}: ItemDetailsProps) => {
    return (
        <div className="flex flex-col max-w-sm w-full">
            <div className="flex flex-col mb-5">
                <span className="font-extrabold text-xl pb-2">{item.name}</span>
                <span className="text-xs">{`${item.colourId} | SKU: ${item.sku}`}</span>
            </div>
            <div className="flex flex-col">
                <span>{item.colourString}</span>
                <span className="font-bold">{`Size: ${item.size}`}</span>
            </div>
        </div>
    )
}