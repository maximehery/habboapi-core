import { Routes } from 'nest-router';

import { HabboModule, CatalogModule, ChatlogModule, GroupModule, ItemModule, ModerationModule, RoomModule, UserModule } from '@habboapi/habbo';

import { SecurityModule } from '@habboapi/security';

export const routes: Routes = [
    {
        path: '/habbo',
        module: HabboModule,
        children: [
            {
                path: '/catalog',
                module: CatalogModule
            },
            {
                path: '/chatlog',
                module: ChatlogModule
            },
            {
                path: '/group',
                module: GroupModule
            },
            {
                path: '/item',
                module: ItemModule
            },
            {
                path: '/moderation',
                module: ModerationModule
            },
            {
                path: '/room',
                module: RoomModule
            },
            {
                path: '/user',
                module: UserModule
            }
        ]
    },
    {
        path: '/security',
        module: SecurityModule
    }
];