import { IsString, IsDateString, IsOptional, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotPastDate } from 'src/common/dtos/validators/not-past-date.validator';


export class CreateAppointmentDto {
  @ApiProperty({
    description: 'ID del paciente',
    example: 'patientId123',
  })
  @IsString()
  patientId: string;

  @ApiProperty({
    description: 'ID del médico',
    example: 'medicId123',
  })
  @IsString()
  medicId: string;

  @ApiProperty({
    description: 'Fecha y hora de la cita - No puede ser anterior al día actual',
    example: '2024-12-01T10:00:00Z',
  })
  @IsDateString()
  @IsNotPastDate({
    message: 'La fecha de la cita no puede ser anterior al día actual'
  })
  dateTime: string;

  @ApiProperty({
    description: 'Tipo de cita',
    example: 'first_time',
  })
  @IsString()
  appointmentType: string;

  @ApiProperty({
    description: 'Estado de la cita',
    example: 'pending',
  })
  @IsString()
  appointmentStatus: string;

  @ApiProperty({
    description: 'Modalidad de la cita',
    example: 'presencial',
    enum: ['presencial', 'online'],
    default: 'presencial',
  })
  @IsString()
  @IsIn(['presencial', 'online'], {
    message: 'La modalidad debe ser presencial u online'
  })
  modality: string = 'presencial';

  @ApiPropertyOptional({
    description: 'Razón de la cita',
    example: 'Consulta general',
  })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional({
    description: 'Notas adicionales',
    example: 'El paciente tiene antecedentes de alergias.',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}