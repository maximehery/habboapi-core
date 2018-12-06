import { Routes } from 'nest-router';

import { HabboModule, CatalogModule, ChatlogModule, GroupModule, ItemModule, ModerationModule, RoomModule, SystemModule, UserModule } from '@habboapi/habbo';

import { SecurityModule } from '@habboapi/security';

import { PluginsModule } from './plugins/plugins.module';
import { PluginName } from './plugins/pluginName/pluginName.module';

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
                path: '/system',
                module: SystemModule
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
    },
    {
        path: '/plugin',
        module: PluginsModule,
        children: [
            {
                path: '/pluginName',
                module: PluginName
            }
        ]
    }
];