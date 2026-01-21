import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryMedicalStudyDto {
  @ApiProperty({
    description: 'Page number',
    required: false,
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    default: 10,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @ApiProperty({
    description: 'Search by study name or description',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Filter by patient ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  patientId?: string;

  @ApiProperty({
    description: 'Filter by study type',
    required: false,
    enum: [
      'Hematología',
      'Radiografía',
      'Tomografía',
      'Resonancia Magnética',
      'Ultrasonido',
      'Electrocardiograma',
      'Laboratorio Clínico',
      'Bioquímica',
      'Microbiología',
      'Patología',
      'Endoscopía',
      'Otro',
    ],
  })
  @IsOptional()
  @IsString()
  studyType?: string;

  @ApiProperty({
    description: 'Filter by status',
    required: false,
    enum: ['pending', 'completed', 'reviewed'],
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({
    description: 'Filter by active status',
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  active?: boolean;

  @ApiProperty({
    description: 'Filter by ordering physician ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  orderedBy?: string;

  @ApiProperty({
    description: 'Filter by interpreting physician ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  interpretedBy?: string;

  @ApiProperty({
    description: 'Field to sort by',
    required: false,
    enum: ['studyDate', 'studyType', 'status', 'createdAt', 'updatedAt'],
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty({
    description: 'Sort order',
    required: false,
    enum: ['asc', 'desc'],
    default: 'desc',
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';
}
