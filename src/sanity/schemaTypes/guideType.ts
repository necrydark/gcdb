import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

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
        name: "image",
        title: "Image",
        type: "image"
    }),
    defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }],
    }),
    defineField({
        name: "characters",
        title: "Characters",
        type: "array",
        of: [{ type: "reference", to: [{ type: "character"}]}]
    })
  ],
})
