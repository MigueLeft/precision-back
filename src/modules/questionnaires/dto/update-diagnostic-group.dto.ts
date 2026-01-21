import { PartialType } from '@nestjs/swagger';
import { CreateDiagnosticGroupDto } from './create-diagnostic-group.dto';

export class UpdateDiagnosticGroupDto extends PartialType(
  CreateDiagnosticGroupDto,
) {}
