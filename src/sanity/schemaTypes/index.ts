import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { characterType } from './characterType'
import { guideType } from './guideType'
import { teamOfFour } from './teamOfFour'
import { characterListItem } from './characterListItemType'
import { difficultyType } from './difficultyType'
import { tagType } from './tagType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, characterType, guideType, teamOfFour, difficultyType, tagType],
}
