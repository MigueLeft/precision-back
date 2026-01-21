import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsIP } from 'class-validator';
import {
  IsUuidId,
  IsCuidId,
} from '../../../common/decorators/id-validation.decorator';

export class CreatePatientQuestionnaireDto {
  @ApiProperty({ description: 'ID of the patient (CUID)' })
  @IsCuidId()
  patientId: string;

  @ApiProperty({ description: 'ID of the questionnaire (UUID)' })
  @IsUuidId()
  questionnaireId: string;

  @ApiPropertyOptional({
    description: 'IP address of the source',
    example: '192.168.1.1',
  })
  @IsOptional()
  @IsIP()
  sourceIp?: string;

  @ApiPropertyOptional({ description: 'Device information', maxLength: 100 })
  @IsOptional()
  @IsString()
  device?: string;
}
