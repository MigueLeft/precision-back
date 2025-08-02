import { IsString, IsOptional, IsEmail, IsBoolean, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateMedicDto {
  @ApiProperty({
    description: 'Nombre del médico',
    example: 'Juan',
    minLength: 2,
    maxLength: 50
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiProperty({
    description: 'Apellido del médico',
    example: 'Gómez',
    minLength: 2,
    maxLength: 50
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Transform(({ value }) => value?.trim())
  lastName: string;

  @ApiProperty({
    description: 'Número de identificación único',
    example: '12345678',
    minLength: 5,
    maxLength: 20
  })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Transform(({ value }) => value?.trim())
  identification: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono',
    example: '+57 300 123 4567',
    maxLength: 20
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  @Transform(({ value }) => value?.trim())
  phone?: string;

  @ApiProperty({
    description: 'Correo electrónico',
    example: 'juan.gomez@email.com'
  })
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @ApiProperty({
    description: 'ID de la especialidad médica',
    example: 'cluid123'
  })
  @IsString()
  specialtyId: string;

  @ApiProperty({
    description: 'Título profesional',
    example: 'Médico Cirujano'
  })
  @IsString()
  @Transform(({ value }) => value?.trim())
  professionalTitle: string;

  @ApiPropertyOptional({
    description: 'Estado activo del médico',
    example: true,
    default: true
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean = true;

  @ApiPropertyOptional({
    description: 'ID del usuario asociado (opcional)',
    example: 'cluid123'
  })
  @IsString()
  @IsOptional()
  userId?: string;
}