import { ReflectMetadata } from '@nestjs/common';

export const Permission = (...permissions: string[]) => ReflectMetadata('permissions', permissions);