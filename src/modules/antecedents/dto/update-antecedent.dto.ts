import { PartialType } from '@nestjs/swagger';
import { CreateAntecedentDto } from './create-antecedent.dto';

export class UpdateAntecedentDto extends PartialType(CreateAntecedentDto) {}
