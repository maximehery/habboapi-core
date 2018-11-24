export interface ISearchOptions
{
    where?: Array<{ column: string; operator: 'equals' | 'like'; value: string; }>,
    order?: Array<{ column: string; sort: 'ASC' | 'DESC'; }>,
    limit?: number;
    page?: number;
    relations?: Array<string>;
}