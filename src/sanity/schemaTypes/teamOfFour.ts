// schemas/teamOfFour.js
import { defineType, defineField } from 'sanity';
import { characterListItem } from './characterListItemType'; // Import the characterListItem

export const teamOfFour = defineType({
  name: 'teamOfFour',
  title: 'Team of Four',
  type: 'object', // This is an object representing one team
  fields: [
    defineField({
      name: 'teamName',
      title: 'Team Name (Optional)',
      type: 'string',
      description: 'A name for this specific team combination.'
    }),
    defineField({
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [
        {
            name: "member",
        title: "Character",
        type: characterListItem.name
        }
      ],
      // Validation to enforce exactly 4 members
      validation: (Rule) =>
        Rule.min(4).max(4).error('Each team must have exactly 4 members.'),
    }),
    defineField({
      name: 'teamNotes',
      title: 'Team Notes',
      type: 'text',
      description: 'Specific notes or strategies for this team.',
    }),
  ],
  preview: {
    select: {
      title: 'teamName',
      members: 'members',
    },
    prepare({ title, members }) {
      const memberCount = members ? members.length : 0;
      const subtitle = members ? members.join(', ') : 'No members selected';
      return {
        title: title || `Unnamed Team (${memberCount}/4)`,
        subtitle: subtitle,
      };
    },
  },
});