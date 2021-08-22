import React, { useEffect, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { postData } from '../../utils/api';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { Form } from '../../components/TrackItemWizard/TrackItemWizard';
import { ExclamationCircleIcon } from '@heroicons/react/solid'

function VerifyEmailPage() {

  const [isLoading, setIsLoading] = useState(true)
  const [subscription, setSubscription] = useState<Form>()
  const [error, setError] = useState('')
  const router = useRouter()
  const { id } = router.query;

  useEffect(()=>{
    if(id){
      setError('')
      postData('/api/verify-email', {id}).then((res)=>{
      setSubscription(res.data)
      setIsLoading(false)
      }).catch((error)=>{
        setIsLoading(false)
        if(error?.response?.data){
          setError(error.response.data)
        }else{
            setError(error.message)
        }
      })
    }
  }, [id])

  return (
      <section className="bg-luluwhite flex items-center justify-center min-h-screen py-24 px-10">
      {
        isLoading ? (
          <LoadingIndicator css={'h-10 w-10 text-luluwhite text-lulured'}/>
        ) : error ? (
          <div className="p-3 bg-pink-100 border-lulured border flex flex-row space-x-2 align-center">
            <ExclamationCircleIcon className="h-5 w-5 text-lulured"/>
            <span>{error.toString()}</span>
          </div>
        ) : (
          <div className="space-y-20 flex flex-col items-center">
            <div className="flex flex-col items-center">
                <CheckCircleIcon className="w-14 h-14 text-green-500"/>
                <span className="font-extrabold text-2xl mb-5">{`You're all set!`}</span>
                {
                  subscription && subscription.item && (
                    <span className="max-w-sm text-center">
                    {`We'll send restock notifications for `}
                    <span className="font-bold">{subscription.item.name}</span> 
                    {' in '}<span className="font-bold">size {subscription.item.size}</span>{', '}
                    <span className="font-bold">{subscription.item.colourString}</span>{' to '}
                    <span className="font-bold">{subscription?.email}</span>
                  </span>
                  )
                }
            </div>

            <Link href={'/'} passHref>
              <span className="underline font-bold">{"Track another item"}</span>
            </Link>
          </div>
        )
      }
      </section>
  );
}

export default VerifyEmailPage;