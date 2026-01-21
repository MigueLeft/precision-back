import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsInt,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';
import { FollowUpType, FollowUpStatus, FollowUpPriority } from '@prisma/client';

export class CreatePatientFollowDto {
  @IsString()
  patientId: string;

  @IsOptional()
  @IsString()
  originAppointmentId?: string;

  @IsOptional()
  @IsString()
  resultingAppointmentId?: string;

  @IsOptional()
  @IsEnum(FollowUpType)
  followUpType?: FollowUpType = FollowUpType.POST_CONSULTATION;

  @IsOptional()
  @IsEnum(FollowUpStatus)
  status?: FollowUpStatus = FollowUpStatus.PENDING;

  @IsOptional()
  @IsEnum(FollowUpPriority)
  priority?: FollowUpPriority = FollowUpPriority.NORMAL;

  @IsDateString()
  scheduledContactDate: string;

  @IsOptional()
  @IsDateString()
  actualContactDate?: string;

  @IsOptional()
  @IsDateString()
  nextContactDate?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  attemptCount?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  maxAttempts?: number = 3;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsOptional()
  @IsDateString()
  completedAt?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean = true;
}
