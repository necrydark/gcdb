// schemas/team.js
import { defineType, defineField } from 'sanity';
import { characterListItem } from './characterListItemType';



export default defineType({
  name: 'team',
  title: 'Team',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Team Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [
        { type: characterListItem.name }, 
      ],
      validation: (Rule) => Rule.min(1).max(4).error('A team must have between 1 and 4 members.'),
    }),
  ],
});