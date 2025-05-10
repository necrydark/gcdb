import { Association } from '@/src/types/associtations'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { findCharacterFromSlug } from '@/src/utils/findCharacter';
import Link from 'next/link';
import Image from 'next/image';
import { useShowJapanese } from '../eng-jp';

type Props = {
    associations?: Association[];
}

export default function CharacterAssociationsTab({associations}: Props) {
    const { showJapanese} = useShowJapanese();
  return (
    <Card className="bg-purple-400 rounded-[5px] dark:bg-purple-900 text-white dark:border-purple-400">
        <CardHeader>
            <CardTitle>Associations</CardTitle>
            <CardDescription className='text-gray-700 dark:text-gray-300'>Associations with other characters.</CardDescription>
        </CardHeader>
        <CardContent>
            {associations && associations.length > 0 ? (
                <div className='grid md:place-items-start place-items-center gap-6'>
                    {associations.map((x, idx) => {
                        const char = findCharacterFromSlug(x.slug);
                        return (
                            <div key={idx} className='flex items-center gap-4'>
                                <Link className='flex gap-2 flex-col md:flex-row items-center hover:opacity-60 duration-300  p-4 ' href={char.slug}>
                                    <div className='flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border border-muted'>
                                    <Image
                                        width={48}
                                        height={48}
                                        className="object-cover"
                                        src={char.imageUrl}
                                        alt={char.name}
                                    />
                                    </div>
                                    <div>
                                    <h3 className="font-medium">
                                        {showJapanese ? char.jpName : char.name}
                                        <span className='text-muted-foreground text-xs pl-1'>{showJapanese ? char.jpTag : char.tag}</span>
                                    </h3>
                                <p className="text-white md:text-left text-center">
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
                    <h1>No associations available...</h1>
                </div>
            )}
        </CardContent>
    </Card>
  )
}
