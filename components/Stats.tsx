import React from 'react'

export const Stats = () => {
    return (
      <section className="bg-unsaturatedred">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Never miss out on a restock again</h2>
            <p className="mt-3 text-xl text-gray-300 sm:mt-4">
              Get restock alerts sent directly to your phone or inbox.
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-300">Free</dt>
              <dd className="order-1 text-5xl font-extrabold text-white">100%</dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-300">Checks</dt>
              <dd className="order-1 text-5xl font-extrabold text-white">24/7</dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-300">Items Tracked</dt>
              <dd className="order-1 text-5xl font-extrabold text-white">180+</dd>
            </div>
          </dl>
        </div>
      </section>
    )
  }