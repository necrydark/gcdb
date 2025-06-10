import db from '@/src/lib/db'
import Image from 'next/image';
import React from 'react'

async function getSubscribers() {
    const res = await db.user.findMany({
        select: {
            subscriptionStatus: true,
            stripePriceId: true,
            username: true,
            image: true,
        }
    })
     return res;
}

export default async function SubscribersPage() {

    const subscribers = await getSubscribers();

    if(!subscribers) {
        return <div className='min-h-screen flex justify-center items-center'>No Subscribers Yet</div>
    }
  return (
    <div className='container max-w-6xl pt-[7rem] mx-auto p-4'>
     <div className='mb-[2rem]'>
     <h1 className="text-4xl md:text-5xl text-white font-bold mb-1 text-center">Subscribers</h1>
     <p className="text-center text-white text-lg">Thank you to all our subscribers!</p>
     </div>

       <div className='flex flex-col gap-6'>
        {/* <div>
        <h1 className="text-4xl md:text-5xl text-white font-bold mb-4 text-center">SSR</h1>
        {subscribers.filter(sub => sub.stripePriceId === process.env.NEXT_PUBLIC_PREMIUM_PRICE_ID).map((sub, idx) => (
            <div key={idx} className='grid md:grid-cols-4 grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                    <Image 
                    src={sub.image ?? "https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"}
                    alt={`${sub.username}'s Image`}
                    width={75}
                    height={75}
                    className='rounded-full object-cover mx-auto' />
                    <h1 className='text-white text-2xl text-center'>{sub.username}</h1>
                </div>
            </div>
        ))}
        </div> */}
        <div>
        <h1 className="text-4xl md:text-5xl text-white font-bold mb-4 text-center">SR</h1>
        {subscribers.filter(sub => sub.stripePriceId === process.env.NEXT_PUBLIC_BASIC_PRICE_ID).map((sub, idx) => (
            <div key={idx} className='grid md:grid-cols-4 grid-cols-2 gap-6'>
            <h1 className='text-white text-2xl'>{sub.username}</h1>
            </div>
        ))}
        </div>
       </div>
    </div>
  )
}
