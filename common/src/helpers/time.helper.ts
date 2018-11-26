import * as moment from 'moment';

export class TimeHelper
{
    static timestampNow(): number
    {
        return Math.floor(Date.now() / 1000);
    }

    static addToTimestampNow(seconds: number): number
    {
        return this.timestampNow() + seconds;
    }

    static formatNow(value: string)
    {
        return moment().format(value);
    }
}