import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

const faqs = [
  {
    question: "Is this really free?",
    answer:
      "Yes. We are completely community-run and do this for Lululemon community",
  },
  {
      question: "When do items restock?",
      answer: "Item's can restock at any time of the day, but we've found that they usually restock from midnight to 6am (PST)."
  },
  {
    question: "Can I track multiple items?",
    answer: "You can track as many items as you want!"
  },
  {
    question: "Do I have to re-track an item if it sells out after I receive an alert?",
    answer: "Yes, once we send you a restock notification we stop looking for restocks on that item so you will have to re-track it if you missed out on the restock for it."
  },
  {
    question: "I didn't receive a verification email. What do I do?",
    answer: "Check your spam folder and add hello@lulurestocks.com to your address list to ensure you receive our emails."
  },
  {
    question: "How often do you check for restocks?",
    answer: "We check for restocks every hour 24/7."
  }
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export const FAQ = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">Frequently asked questions</h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}