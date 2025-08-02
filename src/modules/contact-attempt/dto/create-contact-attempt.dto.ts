import { IsString, IsInt, IsEnum, IsOptional, IsBoolean, IsDateString, Min } from 'class-validator';
import { ContactMethod, ContactResult } from '@prisma/client';

export class CreateContactAttemptDto {
  @IsString()
  followUpId: string;

  @IsInt()
  @Min(1)
  attemptNumber: number;

  @IsOptional()
  @IsEnum(ContactMethod)
  contactMethod?: ContactMethod = ContactMethod.PHONE;

  @IsOptional()
  @IsDateString()
  contactDateTime?: string;

  @IsEnum(ContactResult)
  contactResult: ContactResult;

  @IsOptional()
  @IsInt()
  @Min(0)
  contactDuration?: number;

  @IsOptional()
  @IsString()
  contactNotes?: string;

  @IsOptional()
  @IsString()
  patientResponse?: string;

  @IsOptional()
  @IsBoolean()
  appointmentScheduled?: boolean = false;

  @IsOptional()
  @IsString()
  newAppointmentId?: string;

  @IsOptional()
  @IsBoolean()
  rescheduleRequested?: boolean = false;

  @IsOptional()
  @IsString()
  rescheduleId?: string;
}