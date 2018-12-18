import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter
{
    private httpRequest: any;
    private httpResponse: any;
    private httpStatus: number;

    catch(error: Error | any, host: ArgumentsHost)
    {
        this.httpRequest    = host.switchToHttp().getRequest();
        this.httpResponse   = host.switchToHttp().getResponse();
        this.httpStatus     = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        return this.httpResponse.status(this.httpStatus).send({ status: this.httpStatus, message: error.message.message || error.message, session: this.httpRequest.user });
    }
}