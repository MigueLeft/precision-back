import { IsString, IsEnum, IsOptional, IsDateString, IsInt, Min } from 'class-validator';
import { RescueReason, RescueStatus, RescueCategory, RescuePriority } from '@prisma/client';

export class CreateRescueDirectoryDto {
  @IsString()
  patientId: string;

  @IsString()
  originalFollowUpId: string;

  @IsEnum(RescueReason)
  rescueReason: RescueReason;

  @IsOptional()
  @IsDateString()
  entryDate?: string;

  @IsOptional()
  @IsDateString()
  exitDate?: string;

  @IsOptional()
  @IsEnum(RescueStatus)
  status?: RescueStatus = RescueStatus.ACTIVE;

  @IsOptional()
  @IsEnum(RescueCategory)
  rescueCategory?: RescueCategory = RescueCategory.STANDARD;

  @IsOptional()
  @IsEnum(RescuePriority)
  priority?: RescuePriority = RescuePriority.LOW;

  @IsOptional()
  @IsDateString()
  lastContactDate?: string;

  @IsOptional()
  @IsDateString()
  lastAttemptDate?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  totalPreviousAttempts?: number = 0;

  @IsOptional()
  @IsString()
  rescueNotes?: string;

  @IsOptional()
  @IsDateString()
  reactivatedAt?: string;

  @IsOptional()
  @IsString()
  reactivationNotes?: string;
}