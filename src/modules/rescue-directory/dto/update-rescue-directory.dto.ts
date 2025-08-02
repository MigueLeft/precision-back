import { PartialType } from '@nestjs/swagger'; 
import { IsOptional, IsDateString } from 'class-validator';
import { CreateRescueDirectoryDto } from './create-rescue-directory.dto';

export class UpdateRescueDirectoryDto extends PartialType(CreateRescueDirectoryDto) {
  @IsOptional()
  @IsDateString()
  updatedAt?: string;
}