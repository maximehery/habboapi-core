import { Module } from '@nestjs/common';

import { PluginName } from './pluginName';

@Module({
    imports: [
        PluginName
    ]
})
export class PluginsModule {}