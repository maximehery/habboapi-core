import * as bcryptjs from 'bcryptjs';

export class PasswordHelper
{
    static validatePassword(check: string, against: string)
    {
        return bcryptjs.compareSync(check, against);
    }

    static encryptPassword(password: string)
    {
        return bcryptjs.hashSync(password);
    }
}