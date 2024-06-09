import { Model, Document, PipelineStage } from 'mongoose';
import { IList, IPaginationResponse } from 'src/common/typings';

export abstract class BaseService<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async create(createDto: any): Promise<T> {
    const createdEntity = new this.model(createDto);
    return createdEntity.save();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findOne(query: Record<string, unknown>): Promise<T> {
    return this.model.findById(query).exec();
  }

  async update(id: string, updateDto: any): Promise<T> {
    return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async paginateData(
    pipeline: PipelineStage[],
    options: IList,
  ): Promise<IPaginationResponse> {
    const page: number = +(options?.pageNo ?? 1);
    const pageSize: number = +(options?.limit ?? 10);
    const sortOrder: number = +(options?.sortOrder ?? -1);

    const pipelineQuery: any = [
      {
        $facet: {
          paginatedResults: [
            {
              $sort: {
                [options?.sortBy ?? 'updatedAt']: sortOrder || '-1',
              },
            },
            ...pipeline,
            { $skip: (page - 1) * pageSize },
            { $limit: pageSize },
          ],
          totalCount: [
            ...pipeline,
            {
              $count: 'count',
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$totalCount',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          data: '$paginatedResults',
          totalItems: {
            $ifNull: ['$totalCount.count', 0],
          },
        },
      },
    ];

    const paginatedData = await this.model.aggregate(pipelineQuery);

    return {
      data: paginatedData[0]?.data || [],
      totalItems: paginatedData[0]?.totalItems || 0,
      totalPages: Math.ceil(paginatedData[0]?.totalItems / pageSize) || 1,
      currentPage: page,
    };
  }
}
