// components/CharacterPreview.js
import Image from 'next/image';
import React from 'react';

interface CharacterValue {
    value: {
        media?: string;
        title: string;
    }
}

const CharacterPreview: React.FC<CharacterValue> = ({ value }) => {
  if (!value) {
    return <div>No character selected</div>;
  }

  const { title, media} = value;

  return (
    <div className='flex items-center'>
      {media && (
        <Image
          src={media}
          alt={title}
          height={50}
          width={50}
          className='mr-[10px] object-cover'
        />
      )}
      <span>{value.title}</span>
    </div>
  );
};

export default CharacterPreview;
