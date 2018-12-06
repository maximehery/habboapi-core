import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SessionInterceptor implements NestInterceptor
{
    intercept(context: ExecutionContext, call$: Observable<any>): Observable<any>
    {
        const req = context.switchToHttp().getRequest();

        return call$.pipe(map(res =>
        {
            if(typeof res === 'object' && req.path != '/config.json' && req.user) res.session = req.user;

            return res;
        }));
    }
}