export class Encode
{
    static decodeInt32(bytes: any): number
    {
        if(bytes.length < 4) return -1;

        if(bytes[0] < 0 || bytes[1] < 0 || bytes[2] < 0 || bytes[3] < 0) return -2;
        
        return (bytes[0] * 16777216) + (bytes[1] * 65536) + (bytes[2] * 256) + (bytes[3]);
    }

    static encodeInt32(number: number): number[]
    {
        if(number < 0) return [0, 0, 0, 0];

        return [
            Math.floor(+number / 16777216),
            Math.floor(+number % 16777216 / 65536),
            Math.floor(+number % 16777216 % 65536 / 256),
            +number % 16777216 % 65536 % 256
        ];
    }

    static decodeInt16(bytes: any): number
    {
        if(bytes.length < 2) return -1;
        
        if(bytes[0] < 0 || bytes[1] < 0) return -2;
        
        return (bytes[0] * 256) + (bytes[1]);
    }
    
    static encodeInt16(number: number): number[]
    {
        if(number < 0) return [0, 0];

        return [
            Math.floor(+number / 256),
            +number % 256
        ];
    }

    static decodeBoolean(bytes: any): boolean
    {
        if(bytes.length !== 1) return false;

        return parseInt(bytes[0]) === 1;
    }

    static encodeBoolean(flag: boolean): number
    {
        return flag ? 1 : 0;
    }

    static stringToBytes(string: string): any[]
    {
        if(string.length == 0) return [];

        let bytes = [];

        for(let i = 0; i < string.length; ++i)
        {
            let byte = string.charCodeAt(i);

            bytes = bytes.concat([byte]);
        }

        return bytes;
    }

    static bytesToString(bytes: any): string
    {
        let string = '';

        if(bytes.length == 0) return string;

        for(var i = 0; i < bytes.length; i++)
        {
            string += String.fromCharCode(bytes[i]);
        }

        return string;
    }
}