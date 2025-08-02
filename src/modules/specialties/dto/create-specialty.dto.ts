import { IsString, IsOptional, IsBoolean, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateSpecialtyDto {
  @ApiProperty({
    description: 'Nombre de la especialidad',
    example: 'Cardiología',
    minLength: 2,
    maxLength: 100
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiPropertyOptional({
    description: 'Descripción de la especialidad',
    example: 'Especialidad médica enfocada en el diagnóstico y tratamiento de enfermedades del corazón y sistema cardiovascular',
    maxLength: 500
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  @Transform(({ value }) => value?.trim())
  description?: string;

  @ApiPropertyOptional({
    description: 'Estado activo de la especialidad',
    example: true,
    default: true
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean = true;
}