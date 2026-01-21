import { PartialType } from '@nestjs/swagger';
import { CreateExamCatalogDto } from './create-exam-catalog.dto';

export class UpdateExamCatalogDto extends PartialType(CreateExamCatalogDto) {}
