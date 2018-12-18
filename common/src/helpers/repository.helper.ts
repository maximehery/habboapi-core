import { Repository, Equal, Like } from 'typeorm';

import { ISearchOptions } from '../interfaces';

export class RepositoryHelper
{
    static async search(repository: Repository<any>, searchOptions?: ISearchOptions)
    {
        const search = {
            where:      searchOptions && searchOptions.where || null,
            order:      searchOptions && searchOptions.order || null,
            limit:      searchOptions && searchOptions.limit && searchOptions.limit <= 20 ? +searchOptions.limit : 20,
            page:       searchOptions && +searchOptions.page || 1,
            relations:  searchOptions && searchOptions.relations
        };

        let searchWhereOptions = {};
        let searchOrderOptions = {};

        if(search.where && search.where.length >= 1)
        {
            search.where.forEach(where =>
            {
                if(!where.column || !where.operator || !where.value) throw new Error('no_results');
                
                const columnMetadata = repository.metadata.columns.find(column => column.propertyName == where.column && column.isSelect == true);

                if(!columnMetadata) throw new Error('invalid_search_column');

                if(where.operator == 'equals') searchWhereOptions[columnMetadata.propertyName]          = Equal(where.value);
                else if(where.operator == 'like') searchWhereOptions[columnMetadata.propertyName]       = Like(`%${where.value}%`);
                else if(where.operator == 'startsWith') searchWhereOptions[columnMetadata.propertyName] = Like(`${where.value}%`);
                else throw new Error('invalid_search_operator');

                return;
            });
        }

        if(search.order && search.order.length >= 1)
        {
            search.order.forEach(order =>
            {
                if(!order.column || !order.sort) throw new Error('invalid_order');

                const columnMetadata = repository.metadata.columns.find(column => column.propertyName == order.column && column.isSelect == true);

                if(!columnMetadata) throw new Error('invalid_order_column');

                if(order.sort == 'ASC' || order.sort == 'DESC') return searchOrderOptions[columnMetadata.propertyName] = order.sort;
                else throw new Error('invalid_order_type');
            });
        }

        const result = await repository.findAndCount({
            where: searchWhereOptions,
            order: searchOrderOptions,
            take: search.limit,
            skip: (search.page - 1) * search.limit,
            relations: search.relations
        });

        let nextPage        = search.page + 1;
        let previousPage    = search.page - 1;
        let totalPages      = Math.ceil(+result[1] / search.limit);
        let totalItems      = +result[1];

        return {
            data: result[0],
            pagination: {
                currentPage: search.page,
                nextPage: nextPage > totalPages ? search.page > totalPages ? 1 : search.page : nextPage,
                previousPage: previousPage > totalPages ? 1 : previousPage || 1,
                totalPages: totalPages,
                totalItems: totalItems
            }
        };
    }

    static async random(repository: Repository<any>, limit?: number)
    {
        return await repository
            .createQueryBuilder()
            .orderBy('RAND()')
            .limit(limit || 10)
            .getMany();
    }
}