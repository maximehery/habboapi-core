export interface ISearchOptions
{
    where?: { column: string; operator: 'equals' | 'like' | 'startsWith'; value: string; }[];
    order?: { column: string; sort: 'ASC' | 'DESC'; }[];
    limit?: number;
    page?: number;
    relations?: string[];
}