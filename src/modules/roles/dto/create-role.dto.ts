import { IsString, IsOptional, IsBoolean, IsArray, IsInt, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Nombre único del rol',
    example: 'ADMIN',
    minLength: 2,
    maxLength: 50
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiPropertyOptional({
    description: 'Descripción del rol',
    example: 'Administrador del sistema',
    maxLength: 255
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @ApiPropertyOptional({
    description: 'Indica si es un rol del sistema',
    example: false
  })
  @IsBoolean()
  @IsOptional()
  isSystem?: boolean = false;

  @ApiPropertyOptional({
    description: 'IDs de los permisos asociados al rol',
    example: [1, 2, 3],
    type: [Number]
  })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  @Type(() => Number)
  permissionIds?: number[];
}
