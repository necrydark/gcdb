import { Association } from '@/src/types/associtations'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { findCharacterFromSlug } from '@/src/utils/findCharacter';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
    associations?: Association[];
}

export default function CharacterAssociationsTab({associations}: Props) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Associations</CardTitle>
            <CardDescription>Associations with other characters.</CardDescription>
        </CardHeader>
        <CardContent>
            {associations && associations.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {associations.map((x, idx) => {
                        const char = findCharacterFromSlug(x.slug);
                        return (
                            <div key={idx} className='flex flex-col gap-2'>
                                <Link className='flex gap-2 flex-col md:flex-row items-center' href={char.slug}>
                                    <Image
                                        width={64}
                                        height={64}
                                        className="object-cover"
                                        src={char.imageUrl}
                                        alt={char.name}
                                    />
                                    <div className='flex flex-col gap-1'>
                                    <p className="font-bold text-base hover:opacity-60 transition-all duration-300">
                                        {char.name}
                                    </p>
                                <p className="text-muted-foreground ">
                                    {x.bonus}
                                </p>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className='flex justify-center items-center'>
                    <p className='text-base font-semibold text-center'>No associations available...</p>
                </div>
            )}
        </CardContent>
    </Card>
  )
}
