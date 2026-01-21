import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsDateString } from 'class-validator';
import { CreateContactAttemptDto } from './create-contact-attempt.dto';

export class UpdateContactAttemptDto extends PartialType(
  CreateContactAttemptDto,
) {
  @IsOptional()
  @IsDateString()
  updatedAt?: string;
}
