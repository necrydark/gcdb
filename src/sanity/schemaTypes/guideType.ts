import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import { teamOfFour } from './teamOfFour';



export const guideType = defineType({
  name: 'guide',
  title: 'Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: "Title",
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "A brief description of the guide.",
      validation: (Rule) => Rule.max(200).warning('Description should be under 200 characters.')
    }),
    defineField({
        name: "image",
        title: "Image",
        type: "image"
    }),
    defineField({
            name: 'content',
            title: 'Content',
            type: "blockContent"
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: 'reference', to: [{ type: "category"}]}],
    }),
    defineField({
      name: "teams", // Changed from 'characters' to 'teams'
      title: "Recommended Teams",
      type: "array",
      of: [
        { type: teamOfFour.name } // Each item in this array is a 'teamOfFour' object
      ],
      description: 'Define multiple recommended teams for this guide. Each team requires exactly 4 characters.',
      validation: (Rule) => Rule.min(1).error('At least one team is required for a guide.'), // At least one team
  })
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'image',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
