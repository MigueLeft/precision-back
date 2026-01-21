import {
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  RescueReason,
  RescueStatus,
  RescueCategory,
  RescuePriority,
} from '@prisma/client';

export class QueryRescueDirectoryDto {
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  patientId?: string;

  @IsOptional()
  @IsString()
  originalFollowUpId?: string;

  @IsOptional()
  @IsEnum(RescueReason)
  rescueReason?: RescueReason;

  @IsOptional()
  @IsEnum(RescueStatus)
  status?: RescueStatus;

  @IsOptional()
  @IsEnum(RescueCategory)
  rescueCategory?: RescueCategory;

  @IsOptional()
  @IsEnum(RescuePriority)
  priority?: RescuePriority;

  @IsOptional()
  @IsDateString()
  entryDateFrom?: string;

  @IsOptional()
  @IsDateString()
  entryDateTo?: string;

  @IsOptional()
  @IsDateString()
  lastContactDateFrom?: string;

  @IsOptional()
  @IsDateString()
  lastContactDateTo?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  minPreviousAttempts?: number;

  @IsOptional()
  @IsString()
  sortBy?: string = 'entryDate';

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';
}
