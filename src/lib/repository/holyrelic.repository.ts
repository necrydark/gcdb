import { BaseRepository, FindManyOptions, FindOneOptions } from './base';
import { HolyRelic, Prisma } from '@prisma/client';
import db from '../db';

export interface HolyRelicFilters {
  name?: string;
  beast?: string;
  enhancable?: boolean;
  location?: string;
}

export interface HolyRelicWithRelations extends HolyRelic {
  materials?: any[];
  enhanceMaterials?: any[];
  characters?: any[];
  collection?: any[];
}

export class HolyRelicRepository extends BaseRepository<HolyRelic> {
  constructor() {
    super(db.holyRelic);
  }

  async findByName(name: string): Promise<HolyRelic | null> {
    return this.findOne({
      where: { name }
    });
  }

  async findWithRelations(options: FindManyOptions<HolyRelic> = {}): Promise<any> {
    return this.findMany({
      ...options,
      include: {
        materials: true,
        enhanceMaterials: true,
        characters: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            slug: true,
            rarity: true,
            attribute: true
          }
        },
        collection: true,
        ...(options.include as any)
      }
    });
  }

  async findWithFilters(
    filters: HolyRelicFilters,
    options: FindManyOptions<HolyRelic> = {}
  ): Promise<any> {
    const where: Prisma.HolyRelicWhereInput = {};

    if (filters.name) {
      where.name = {
        contains: filters.name,
        mode: 'insensitive'
      };
    }

    if (filters.beast) {
      where.beast = filters.beast as any;
    }

    if (filters.enhancable !== undefined) {
      where.enhancable = filters.enhancable;
    }

    return this.findMany({
      ...options,
      where: { ...where, ...(options.where as any) }
    });
  }

  async getByBeast(beast: string, options: FindManyOptions<HolyRelic> = {}): Promise<any> {
    return this.findMany({
      ...options,
      where: {
        beast: beast as any,
        ...(options.where as any)
      }
    });
  }

  async getEnhancable(options: FindManyOptions<HolyRelic> = {}): Promise<any> {
    return this.findMany({
      ...options,
      where: {
        enhancable: true,
        ...(options.where as any)
      }
    });
  }

  async search(query: string, options: FindManyOptions<HolyRelic> = {}): Promise<any> {
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
            effect: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            attack: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            defense: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            hp: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ],
        ...(options.where as any)
      }
    });
  }

  async findByCharacterId(characterId: string): Promise<HolyRelic | null> {
    const character = await db.character.findUnique({
      where: { id: characterId },
      include: { holyRelic: true }
    });
    
    return character?.holyRelic || null;
  }

  async getBasicInfo(options: FindManyOptions<HolyRelic> = {}): Promise<any> {
    return this.findMany({
      ...options,
      select: {
        id: true,
        name: true,
        imageUrl: true,
        effect: true,
        attack: true,
        defense: true,
        hp: true,
        enhancable: true,
        enhanceAttack: true,
        enhanceDefense: true,
        enhanceHp: true,
        beast: true,
        ...(options.select as any)
      }
    });
  }
}

export const holyRelicRepository = new HolyRelicRepository();