import { IsString, IsEmail, IsOptional, IsInt, IsPositive } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan Pérez',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Correo electrónico',
    example: 'juan.perez@email.com',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'Contraseña del usuario',
    example: 'securepassword',
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'ID del rol del usuario',
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  roleId: number; 
}