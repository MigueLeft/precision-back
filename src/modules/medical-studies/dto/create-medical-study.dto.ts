import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsCuidId } from '../../../common/decorators/id-validation.decorator';

export class CreateMedicalStudyDto {
  @ApiProperty({
    description: 'Patient ID (CUID)',
    example: 'clxxx123456789',
  })
  @IsCuidId()
  patientId: string;

  @ApiProperty({
    description: 'Date when the study was performed',
    example: '2025-11-07T10:00:00.000Z',
  })
  @IsDateString()
  studyDate: string;

  @ApiProperty({
    description: 'Type of study',
    example: 'Hematología',
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
    maxLength: 100,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  studyType: string;

  @ApiProperty({
    description: 'Location where the study was performed',
    example: 'Hospital Central - Laboratorio Clínico',
    required: false,
    maxLength: 200,
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  studyLocation?: string;

  @ApiProperty({
    description: 'File path of the result PDF in storage (S3, etc.)',
    example: 'medical-studies/patient-xxx/hematology-2025-11-07.pdf',
    required: false,
  })
  @IsString()
  @IsOptional()
  resultFilePath?: string;

  @ApiProperty({
    description: 'Public or signed URL of the result file',
    example: 'https://s3.amazonaws.com/bucket/medical-studies/...',
    required: false,
  })
  @IsString()
  @IsOptional()
  resultFileUrl?: string;

  @ApiProperty({
    description: 'File path of the image in storage (if applicable)',
    example: 'medical-studies/patient-xxx/rx-torax-2025-11-07.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  imageFilePath?: string;

  @ApiProperty({
    description: 'Public or signed URL of the image',
    example: 'https://s3.amazonaws.com/bucket/medical-studies/...',
    required: false,
  })
  @IsString()
  @IsOptional()
  imageFileUrl?: string;

  @ApiProperty({
    description: 'Specific name of the study',
    example: 'Biometría Hemática Completa',
    required: false,
    maxLength: 200,
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  studyName?: string;

  @ApiProperty({
    description: 'Description or notes about the study',
    example: 'Estudio solicitado para evaluar anemia',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Main findings of the study',
    example:
      'Hemoglobina: 12.5 g/dL (normal)\nHematocrito: 38% (normal)\nLeucocitos: 7,500/μL (normal)',
    required: false,
  })
  @IsString()
  @IsOptional()
  findings?: string;

  @ApiProperty({
    description: 'ID of the physician who ordered the study',
    example: 'clxxx987654321',
    required: false,
  })
  @IsString()
  @IsOptional()
  orderedBy?: string;

  @ApiProperty({
    description: 'ID of the physician who interpreted the study',
    example: 'clxxx987654321',
    required: false,
  })
  @IsString()
  @IsOptional()
  interpretedBy?: string;

  @ApiProperty({
    description: 'Status of the study',
    example: 'completed',
    enum: ['pending', 'completed', 'reviewed'],
    default: 'pending',
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'Whether the study is active',
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
