import { ReflectMetadata } from '@nestjs/common';

/**
 * Determines if the PermissionGuard should resolve based upon the required permission(s)
 * 
 * If this decorator is not set, the guard will always resolve
 * 
 * @param permissions comma seperated list of required permissions
 * 
 * @example
    ```
    @Controller('someController')
    @UseGuards(PermissionGuard)
    export class SomeController {
        @Get('someRoute')
        @HttpCode(HttpStatus.OK)
        @Permission('permission1', 'permission2')
        doSomething(): string {}
    }```
 */
export const Permission = (...permissions: string[]) => ReflectMetadata('permissions', permissions);