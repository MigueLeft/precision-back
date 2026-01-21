import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsCuidId } from '../../../common/decorators/id-validation.decorator';

export class CreateTreatmentDto {
  @ApiProperty({
    description: 'Patient ID (CUID)',
    example: 'clxxx123456789',
  })
  @IsCuidId()
  patientId: string;

  @ApiProperty({
    description: 'Medication name',
    example: 'Metformina',
    maxLength: 200,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  medicationName: string;

  @ApiProperty({
    description: 'Presentation of the medication',
    example: 'Tabletas 850mg',
    required: false,
    maxLength: 200,
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  presentation?: string;

  @ApiProperty({
    description: 'Quantity prescribed',
    example: '30 tabletas',
    required: false,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  quantity?: string;

  @ApiProperty({
    description: 'Dosage instructions',
    example: '1 tableta cada 12 horas con alimentos',
    required: false,
    maxLength: 200,
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  dosage?: string;

  @ApiProperty({
    description: 'Duration of treatment',
    example: '30 días',
    required: false,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  duration?: string;

  @ApiProperty({
    description: 'Status of the treatment',
    example: 'actual',
    enum: ['actual', 'previo'],
    default: 'actual',
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'ID of the prescribing physician',
    example: 'clxxx987654321',
    required: false,
  })
  @IsString()
  @IsOptional()
  prescribedBy?: string;

  @ApiProperty({
    description: 'Additional notes about the treatment',
    example: 'Tomar con abundante agua. Evitar alcohol.',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'Whether the treatment is active',
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
