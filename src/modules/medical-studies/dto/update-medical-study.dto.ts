import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateMedicalStudyDto } from './create-medical-study.dto';

export class UpdateMedicalStudyDto extends PartialType(
  OmitType(CreateMedicalStudyDto, ['patientId'] as const),
) {}
