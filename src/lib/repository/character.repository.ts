import { BaseRepository, FindManyOptions, FindOneOptions } from './base';
import { Character, Prisma } from '@prisma/client';
import db from '../db';

export interface CharacterFilters {
  name?: string;
  jpName?: string;
  attribute?: string;
  race?: string;
  rarity?: string;
  game?: string;
  crossover?: boolean;
  event?: string;
}

export interface CharacterWithRelations extends Character {
  stats?: any[];
  skills?: any[];
  holyRelic?: any;
  ultimate?: any;
  combinedUltimate?: any;
  passiveSkill?: any;
  unity?: any;
  talent?: any;
  grace?: any;
}

export class CharacterRepository extends BaseRepository<Character> {
  constructor() {
    super(db.character);
  }

  async findBySlug(slug: string): Promise<Character | null> {
    return this.findOne({
      where: { slug },
      include: {
        stats: true,
        skills: {
          include: {
            skillRanks: true
          }
        },
        holyRelic: true,
        ultimate: true,
        combinedUltimate: true,
        passiveSkill: true,
        unity: true,
        talent: true,
        grace: true,
        characterFriendshipRewards: {
          include: {
            friendshipLevel: true
          }
        }
      }
    });
  }

  async findByTag(tag: string): Promise<Character | null> {
    return this.findOne({
      where: { tag },
      include: {
        stats: true,
        skills: true
      }
    });
  }

  async findWithFilters(
    filters: CharacterFilters,
    options: FindManyOptions<Character> = {}
  ): Promise<any> {
    const where: Prisma.CharacterWhereInput = {};

    if (filters.name) {
      where.name = {
        contains: filters.name,
        mode: 'insensitive'
      };
    }

    if (filters.jpName) {
      where.jpName = {
        contains: filters.jpName,
        mode: 'insensitive'
      };
    }

    if (filters.attribute) {
      where.attribute = filters.attribute as any;
    }

    if (filters.race) {
      where.race = {
        has: filters.race as any
      };
    }

    if (filters.rarity) {
      where.rarity = filters.rarity as any;
    }

    if (filters.game) {
      where.game = filters.game as any;
    }

    if (filters.crossover !== undefined) {
      where.Crossover = filters.crossover ? 'Crossover' : 'NotCrossover';
    }

    if (filters.event) {
      where.event = filters.event as any;
    }

return this.findMany({
      ...options,
      where: { ...where, ...(options.where as any) }
    });
  }

  async findWithRelations(
    options: FindManyOptions<Character> = {}
  ): Promise<any> {
    return this.findMany({
      ...options,
      include: {
        stats: true,
        skills: {
          include: {
            skillRanks: true
          }
        },
        holyRelic: true,
        ultimate: true,
        combinedUltimate: true,
        passiveSkill: true,
        unity: true,
        talent: true,
        grace: true,
        ...(options.include as any)
      }
    });
  }

  async getBasicInfo(options: FindManyOptions<Character> = {}): Promise<any> {
    return this.findMany({
      ...options,
      select: {
        id: true,
        name: true,
        imageUrl: true,
        tag: true,
        slug: true,
        attribute: true,
        race: true,
        rarity: true,
        game: true,
        Crossover: true,
        collection: true,
        ...(options.select as any)
      }
    });
  }

  async getByGame(game: string, options: FindManyOptions<Character> = {}): Promise<any> {
    return this.findMany({
      ...options,
      where: {
        game: game as any,
        ...(options.where as any)
      }
    });
  }

  async getByRarity(rarity: string, options: FindManyOptions<Character> = {}): Promise<any> {
    return this.findMany({
      ...options,
      where: {
        rarity: rarity as any,
        ...(options.where as any)
      }
    });
  }

  async getByAttribute(attribute: string, options: FindManyOptions<Character> = {}): Promise<any> {
    return this.findMany({
      ...options,
      where: {
        attribute: attribute as any,
        ...(options.where as any)
      }
    });
  }

  async search(query: string, options: FindManyOptions<Character> = {}): Promise<any> {
    return this.findMany({
      ...options,
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            jpName: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            tag: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            jpTag: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ],
        ...(options.where as any)
      }
    });
  }
}

export const characterRepository = new CharacterRepository();