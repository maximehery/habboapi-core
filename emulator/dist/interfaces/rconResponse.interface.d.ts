import { IRconResponseStatus } from './rconResponseStatus.enum';
export interface IRconResponse {
    status: IRconResponseStatus;
    message: string;
}
