import { ReflectMetadata } from '@nestjs/common';

import { IPermission } from '../interfaces/permissions.type';

export const Permission = (...permissions: IPermission[]) => ReflectMetadata('permissions', permissions);