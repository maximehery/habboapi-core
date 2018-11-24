import { Repository } from 'typeorm';
import { BanEntity } from '../entities/ban.entity';
import { ISearchOptions } from '@habboapi/common';
import { IBan, IBanList } from '../interfaces';
export declare class BanService {
    private readonly banRepository;
    constructor(banRepository: Repository<BanEntity>);
    getAll(searchOptions?: ISearchOptions): Promise<IBanList>;
    getOne(banId: number, relations?: Array<string>): Promise<IBan>;
    put(ban: IBan, staffId: number): Promise<IBan>;
    patch(banId: number, ban: IBan): Promise<IBan>;
    delete(banId: number): Promise<boolean>;
}
