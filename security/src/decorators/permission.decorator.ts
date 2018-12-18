import { ReflectMetadata } from '@nestjs/common';

const PermissionDecorator = (...permissions: string[]) => ReflectMetadata('permissions', permissions);

export const Permission = PermissionDecorator;