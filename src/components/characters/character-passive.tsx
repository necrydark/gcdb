import { Passive, Talent, Unity } from '@/src/types/character'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'
import { useShowJapanese } from '../eng-jp'
import { Separator } from '../ui/separator'

type Props = {
    passive?: Passive
    unity?: Unity;
    talent?: Talent;
}

export default function CharacterPassiveTab({passive, unity, talent}: Props) {
    const {showJapanese} = useShowJapanese();
  return (
    <Card className="bg-purple-400 rounded-[5px] dark:bg-purple-900 text-white dark:border-purple-400">
        <CardHeader>
            <CardTitle>Passive Ability</CardTitle>
            <CardDescription className='text-gray-700 dark:text-gray-300'>Characters passive.</CardDescription>
        </CardHeader>
        <CardContent>
            {passive ? (
                <div className='flex items-center md:items-start md:flex-row flex-col gap-4'>
                <Image 
                src={passive?.imageUrl || "/placeholder.svg?height=200&width=200"}
                alt={passive?.name as string}
                width={96}
                height={96}
                className='object-cover'
                />
                <div className='space-y-1'>
                    <h3 className='font-bold md:text-left text-center'>{showJapanese ? passive?.jpName : passive?.name }</h3>
                    <p className="text-sm  text-white">{passive?.description}</p>
                </div>
            </div>
            ) : (
                <div className='flex flex-col justify-center items-center'>
                    <h1>No passive available...</h1>
                </div>
            )}
        </CardContent>
        {unity && (
        <>
         <Separator className="my-8 dark:bg-purple-400" />
            <CardHeader>
            <CardTitle>Unity</CardTitle>
            <CardDescription className='text-gray-700 dark:text-gray-300'>Characters unity.</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="flex flex-col justify-center items-center">
                <Image 
                src={unity.imageUrl as string}
                alt={showJapanese ? unity.jpName as string : unity.name as string} 
                width={256}
                height={128}
                className="object-cover border-4 dark:border-purple-400 border-purple-900" />
                  <div className="mt-3 space-y-2">
                      <h3 className="font-bold text-lg text-center text-white">
                      {showJapanese ? unity.jpName as string : unity.name as string} {" "}
                      </h3>
                      <p className="text-sm font-normal text-white">{unity.description}</p>
                    </div>
              </div>
            </CardContent>
        </>
        )}
           {talent && (
        <>
         <Separator className="my-8 dark:bg-purple-400" />
            <CardHeader>
            <CardTitle>Talent</CardTitle>
            <CardDescription className='text-gray-700 dark:text-gray-300'>Characters Talent.</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="flex flex-col justify-center items-center">
                <Image 
                src={talent.imageUrl as string}
                alt={showJapanese ? talent.jpName as string : talent.name as string} 
                width={256}
                height={128}
                className="object-cover border-4 dark:border-purple-400 border-purple-900" />
                  <div className="mt-3 space-y-2">
                      <h3 className="font-bold text-lg text-center text-white">
                      {showJapanese ? talent.jpName as string : talent.name as string} {" "}
                      </h3>
                      <p className="text-sm font-normal text-white">{talent.description}</p>
                    </div>
              </div>
            </CardContent>
        </>
        )}

    </Card>
  )
}
