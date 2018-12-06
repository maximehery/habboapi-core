import { Injectable, OnModuleInit } from '@nestjs/common';

import { CatalogItemService, CatalogPageService } from '../../catalog';
import { ChatlogPrivateService, ChatlogRoomService } from '../../chatlog';
import { GroupService, GroupMemberService } from '../../group';
import { ItemService, ItemBaseService } from '../../item';
import { BanService } from '../../moderation';
import { RoomService } from '../../room';
import { UserService } from '../../user';

import { ISystemStatistics } from '../interfaces';

@Injectable()
export class StatisticsService implements OnModuleInit
{
    private statistics: ISystemStatistics;

    constructor(
        private readonly catalogItemService: CatalogItemService,
        private readonly catalogPageService: CatalogPageService,
        private readonly chatlogPrivateService: ChatlogPrivateService,
        private readonly chatlogRoomService: ChatlogRoomService,
        private readonly groupService: GroupService,
        private readonly groupMemberService: GroupMemberService,
        private readonly itemService: ItemService,
        private readonly itemBaseService: ItemBaseService,
        private readonly banService: BanService,
        private readonly roomService: RoomService,
        private readonly userService: UserService) {}

    async onModuleInit()
    {
        try
        {
            const totalCatalogItems     = await this.catalogItemService.totalItems();
            const totalCatalogPages     = await this.catalogPageService.totalPages();
            const totalChatlogPrivate   = await this.chatlogPrivateService.totalChatlogs();
            const totalChatlogRoom      = await this.chatlogRoomService.totalChatlogs();
            const totalGroups           = await this.groupService.totalGroups();
            const totalGroupMemberships = await this.groupMemberService.totalMemberships();
            const totalItems            = await this.itemService.totalItems();
            const totalItemsBase        = await this.itemBaseService.totalItems();
            const totalBans             = await this.banService.totalBans();
            const totalRooms            = await this.roomService.totalRooms();
            const totalUsers            = await this.userService.totalUsers();

            this.statistics = {
                totalCatalogItems,
                totalCatalogPages,
                totalChatlogPrivate,
                totalChatlogRoom,
                totalGroups,
                totalGroupMemberships,
                totalItems,
                totalItemsBase,
                totalBans,
                totalRooms,
                totalUsers
            };
        }

        catch(err)
        {
            console.log(err);
        }
    }

    get systemStatistics()
    {
        return this.statistics;
    }
}