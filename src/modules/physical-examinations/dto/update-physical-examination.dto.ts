import { PartialType } from '@nestjs/swagger';
import { CreatePhysicalExaminationDto } from './create-physical-examination.dto';

export class UpdatePhysicalExaminationDto extends PartialType(
  CreatePhysicalExaminationDto,
) {}
