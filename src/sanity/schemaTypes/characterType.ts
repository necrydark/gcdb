
import React from 'react';
import { defineField, defineType } from 'sanity';

export const characterType = defineType({
  name: 'characters',
  title: 'Character',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL',
      type: 'url', // Assuming this is a string URL
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'imageUrl', // Still selecting the URL string
    },
    prepare({title, media}) {
      return {
        title: title,
        media: media
          ? React.createElement('img', {
              src: media, // No need for 'as string' if 'media' is already typed as string
              alt: title || 'Character Image', // Provide a fallback alt text
              style: {
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              },
            })
          : undefined,
      }
    }
  },
});