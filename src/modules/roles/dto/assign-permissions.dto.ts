import { IsArray, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AssignPermissionsDto {
  @ApiProperty({
    description: 'IDs de los permisos a asignar',
    example: [1, 2, 3],
    type: [Number]
  })
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  permissionIds: number[];
}