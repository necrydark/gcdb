import db from "../db";
import { Prisma } from "@prisma/client";

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface FindManyOptions<T> extends PaginationOptions {
  where?: Prisma.Args<T, 'findMany'>['where'];
  select?: Prisma.Args<T, 'findMany'>['select'];
  include?: Prisma.Args<T, 'findMany'>['include'];
}

export interface FindOneOptions<T> {
  where: Prisma.Args<T, 'findFirst'>['where'];
  select?: Prisma.Args<T, 'findFirst'>['select'];
  include?: Prisma.Args<T, 'findFirst'>['include'];
}

export abstract class BaseRepository<T> {
  protected model: any;

  constructor(model: any) {
    this.model = model;
  }

  async create(data: Prisma.Args<T, 'create'>['data']): Promise<T> {
    return this.model.create({ data });
  }

  async createMany(data: Prisma.Args<T, 'createMany'>['data']): Promise<{ count: number }> {
    return this.model.createMany({ data });
  }

  async findById(id: string, options?: Omit<FindOneOptions<T>, 'where'>): Promise<T | null> {
    return this.model.findUnique({
      where: { id },
      ...options
    });
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return this.model.findFirst(options);
  }

  async findMany(options: FindManyOptions<T> = {}): Promise<PaginationResult<T>> {
    const {
      page = 1,
      limit = 10,
      sortBy,
      sortOrder = 'desc',
      where,
      select,
      include
    } = options;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.model.findMany({
        where,
        select,
        include,
        skip,
        take: limit,
        ...(sortBy && {
          orderBy: { [sortBy]: sortOrder }
        })
      }),
      this.model.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  }

  async update(
    id: string,
    data: Prisma.Args<T, 'update'>['data']
  ): Promise<T> {
    return this.model.update({
      where: { id },
      data
    });
  }

  async updateMany(
    where: Prisma.Args<T, 'updateMany'>['where'],
    data: Prisma.Args<T, 'updateMany'>['data']
  ): Promise<{ count: number }> {
    return this.model.updateMany({ where, data });
  }

  async delete(id: string): Promise<T> {
    return this.model.delete({
      where: { id }
    });
  }

  async deleteMany(where: Prisma.Args<T, 'deleteMany'>['where']): Promise<{ count: number }> {
    return this.model.deleteMany({ where });
  }

  async count(where?: Prisma.Args<T, 'count'>['where']): Promise<number> {
    return this.model.count({ where });
  }

  async exists(where: Prisma.Args<T, 'findFirst'>['where']): Promise<boolean> {
    const result = await this.model.findFirst({ where, select: { id: true } });
    return !!result;
  }
}