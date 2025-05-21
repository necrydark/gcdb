import { defineType } from 'sanity';

export const characterType = defineType({
  name: 'character',
  title: 'Character',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    },
    {
      name: 'tag',
      title: 'Tag',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
  ],
});
