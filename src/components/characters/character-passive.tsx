import { Passive } from '@/src/types/character'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'
import { useShowJapanese } from '../eng-jp'

type Props = {
    passive?: Passive
}

export default function CharacterPassiveTab({passive}: Props) {
    const {showJapanese} = useShowJapanese();
    console.log(passive)
  return (
    <Card>
        <CardHeader>
            <CardTitle>Passive Ability</CardTitle>
            <CardDescription>Characters passive.</CardDescription>
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
                    <h3 className='font-medium md:text-left text-center'>{showJapanese ? passive?.jpName : passive?.name }</h3>
                    <p className="text-sm text-muted-foreground">{passive?.description}</p>
                </div>
            </div>
            ) : (
                <div className='flex flex-col justify-center items-center'>
                    <h1>No passive available...</h1>
                </div>
            )}
        </CardContent>
    </Card>
  )
}
