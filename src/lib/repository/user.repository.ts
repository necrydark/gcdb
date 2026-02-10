import { BaseRepository, FindManyOptions, FindOneOptions } from './base';
import { User, Prisma } from '@prisma/client';
import db from '../db';

export interface UserFilters {
  email?: string;
  username?: string;
  role?: string;
  isTwoFactorEnabled?: boolean;
  hasSubscription?: boolean;
}

export interface UserWithRelations extends User {
  accounts?: any[];
  sessions?: any[];
  collection?: any[];
  comments?: any[];
  userProgress?: any[];
}

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(db.user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({
      where: { email }
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.findOne({
      where: { username }
    });
  }

  async findByDisplayUsername(displayUsername: string): Promise<User | null> {
    return this.findOne({
      where: { displayUsername }
    });
  }

  async findByIdWithRelations(id: string): Promise<UserWithRelations | null> {
    return this.findOne({
      where: { id },
      include: {
        accounts: true,
        sessions: true,
        collection: true,
        comments: true,
        userProgress: {
          include: {
            achievement: true
          }
        }
      }
    });
  }

  async findWithFilters(
    filters: UserFilters,
    options: FindManyOptions<User> = {}
  ): Promise<any> {
    const where: Prisma.UserWhereInput = {};

    if (filters.email) {
      where.email = {
        contains: filters.email,
        mode: 'insensitive'
      };
    }

    if (filters.username) {
      where.username = {
        contains: filters.username,
        mode: 'insensitive'
      };
    }

    if (filters.role) {
      where.role = filters.role as any;
    }

    if (filters.isTwoFactorEnabled !== undefined) {
      where.isTwoFactorEnabled = filters.isTwoFactorEnabled;
    }

    if (filters.hasSubscription !== undefined) {
      if (filters.hasSubscription) {
        where.NOT = {
          stripeSubscriptionId: null
        };
      } else {
        where.stripeSubscriptionId = null;
      }
    }

    return this.findMany({
      ...options,
      where: { ...where, ...(options.where as any) }
    });
  }

  async updateRole(id: string, role: Prisma.UserUpdateInput['role']): Promise<User> {
    return this.update(id, { role });
  }

  async updateStripeInfo(
    id: string,
    stripeData: {
      stripeCustomerId?: string;
      stripeSubscriptionId?: string;
      stripePriceId?: string;
      stripeCurrentEndPeriod?: Date;
      subscriptionStatus?: string;
    }
  ): Promise<User> {
    return this.update(id, stripeData);
  }

  async search(query: string, options: FindManyOptions<User> = {}): Promise<any> {
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
            username: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            displayUsername: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            email: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ],
        ...(options.where as any)
      }
    });
  }

  async getPublicProfile(id: string): Promise<Omit<User, 'password' | 'accounts'> | null> {
    return this.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        bio: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        username: true,
        displayUsername: true,
        boxCC: true,
        ingameRank: true,
        role: true,
        isTwoFactorEnabled: true,
        collection: {
          select: {
            id: true,
            characterId: true,
            relicId: true,
            createdAt: true
          }
        }
      }
    });
  }

  async getUsersWithSubscription(): Promise<User[]> {
    return this.findMany({
      where: {
        NOT: {
          stripeSubscriptionId: null
        }
      }
    }).then(result => result.data);
  }

  async getUsersByRole(role: string): Promise<User[]> {
    return this.findMany({
      where: { role: role as any }
    }).then(result => result.data);
  }
}

export const userRepository = new UserRepository();