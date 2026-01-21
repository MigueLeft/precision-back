import {
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
  IsBoolean,
  IsInt,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ContactMethod, ContactResult } from '@prisma/client';

export class QueryContactAttemptDto {
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
  followUpId?: string;

  @IsOptional()
  @IsInt()
  attemptNumber?: number;

  @IsOptional()
  @IsEnum(ContactMethod)
  contactMethod?: ContactMethod;

  @IsOptional()
  @IsEnum(ContactResult)
  contactResult?: ContactResult;

  @IsOptional()
  @IsDateString()
  contactDateTimeFrom?: string;

  @IsOptional()
  @IsDateString()
  contactDateTimeTo?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  appointmentScheduled?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  rescheduleRequested?: boolean;

  @IsOptional()
  @IsString()
  sortBy?: string = 'contactDateTime';

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';
}
