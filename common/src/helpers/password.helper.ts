import { compareSync, hashSync } from 'bcryptjs';

export class PasswordHelper
{
    static validatePassword(check: string, against: string)
    {
        return compareSync(check, against);
    }

    static encryptPassword(password: string)
    {
        return hashSync(password);
    }
}