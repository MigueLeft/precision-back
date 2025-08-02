import { PartialType } from '@nestjs/swagger'; 
import { IsOptional, IsDateString } from 'class-validator';
import { CreatePatientFollowDto } from './create-patient-follow.dto';

export class UpdatePatientFollowDto extends PartialType(CreatePatientFollowDto) {
  @IsOptional()
  @IsDateString()
  updatedAt?: string;
}