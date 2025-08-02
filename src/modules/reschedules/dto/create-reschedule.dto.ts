import { IsString, IsDateString, IsOptional, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotPastDate } from 'src/common/dtos/validators/not-past-date.validator';

export class CreateRescheduleDto {
  @ApiProperty({
    description: 'ID de la cita a reprogramar',
    example: 'appointmentId123',
  })
  @IsString()
  appointmentId: string;

  @ApiProperty({
    description: 'Fecha y hora original de la cita',
    example: '2023-10-01T10:00:00Z',
  })
  @IsDateString()
  previousDateTime: string;

  @ApiProperty({
    description: 'Nueva fecha y hora programada - No puede ser anterior al día actual',
    example: '2023-10-02T14:00:00Z',
  })
  @IsDateString()
  @IsNotPastDate({
    message: 'La nueva fecha de reprogramación no puede ser anterior al día actual',
  })
  newDateTime: string;

  @ApiProperty({
    description: 'Razón de la reprogramación',
    enum: ['patient_request', 'medic_unavailable', 'emergency', 'system_error', 'other'],
    example: 'patient_request',
  })
  @IsString()
  @IsIn(['patient_request', 'medic_unavailable', 'emergency', 'system_error', 'other'])
  rescheduleReason: string;

  @ApiProperty({
    description: 'Quién solicitó la reprogramación',
    enum: ['PATIENT', 'MEDIC', 'SYSTEM'],
    example: 'PATIENT',
  })
  @IsString()
  @IsIn(['PATIENT', 'MEDIC', 'SYSTEM'])
  requestedBy: string;

  @ApiPropertyOptional({
    description: 'Notas adicionales sobre la reprogramación',
    example: 'El paciente tuvo una emergencia familiar',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}