import React from 'react'

export const Title = ({text}:{text: string}) => (
    <div className="flex flex-col my-8">
        <h1 className="text-2xl lg:text-3xl font-semibold">{text}</h1>
        <hr className="border-lulured border-t-4 border-solid"></hr>
    </div>
)