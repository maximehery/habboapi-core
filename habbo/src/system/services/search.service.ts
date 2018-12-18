import { Injectable } from '@nestjs/common';

import { RoomService } from '../../room';
import { UserService } from '../../user';

import { ISystemSearch } from '../interfaces';

@Injectable()
export class SearchService
{
    constructor(
        private readonly roomService: RoomService,
        private readonly userService: UserService) {}

    async search(value: string): Promise<ISystemSearch>
    {
        let searchResults: ISystemSearch = {};

        const userResults = await this.userService.getAll({
            where: [
                {
                    column: 'username',
                    operator: 'startsWith',
                    value: value
                }
            ],
            limit: 5,
            page: 1
        });

        const roomResults = await this.roomService.getAll({
            where: [
                {
                    column: 'name',
                    operator: 'startsWith',
                    value: value
                }
            ],
            limit: 5,
            page: 1
        });

        searchResults.users = userResults.data;
        searchResults.rooms = roomResults.data;

        return searchResults;
    }
}