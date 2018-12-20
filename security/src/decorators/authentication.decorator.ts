import { ReflectMetadata } from '@nestjs/common';

/**
 * Determines if the AuthenticationGuard should resolve based upon the required authentication state
 * 
 * If this decorator is not set, the guard will always resolve
 * 
 * @param required true (login_required), false (guest_only), null (ignore)
 * 
 * @example
    ```
    @Controller('someController')
    @UseGuards(AuthenticationGuard)
    export class SomeController {
        @Get('someRoute')
        @HttpCode(HttpStatus.OK)
        @Authentication(true) // true, false, null
        doSomething(): string {}
    }```
 */
export const Authentication = (required: boolean) => ReflectMetadata('authenticationRequired', required);