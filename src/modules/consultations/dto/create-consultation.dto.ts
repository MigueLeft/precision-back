import {
  IsString,
  IsOptional,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateConsultationDto {
  @ApiProperty({
    description: 'ID de la cita asociada a la consulta',
    example: 'clm123abc456def',
  })
  @IsString()
  @IsNotEmpty()
  appointmentId: string;

  @ApiProperty({
    description: 'Fecha y hora de realización de la consulta',
    example: '2024-01-15T10:30:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  realizationDateTime: string;

  @ApiPropertyOptional({
    description: 'Anamnesis o motivo de consulta clínico',
    example: 'Dolor abdominal agudo en epigastrio desde hace 3 días',
  })
  @IsString()
  @IsOptional()
  anamnesis?: string;

  @ApiPropertyOptional({
    description: 'Tratamiento indicado al paciente',
    example: 'Omeprazol 20mg cada 12 horas por 7 días',
  })
  @IsString()
  @IsOptional()
  indicatedTreatment?: string;

  @ApiPropertyOptional({
    description: 'Procedimientos realizados durante la consulta',
    example: 'Examen físico completo, palpación abdominal',
  })
  @IsString()
  @IsOptional()
  performedProcedures?: string;

  @ApiPropertyOptional({
    description: 'Recetas emitidas durante la consulta',
    example: 'Receta N° 001234 - Omeprazol 20mg',
  })
  @IsString()
  @IsOptional()
  issuedPrescriptions?: string;

  @ApiPropertyOptional({
    description: 'Indicaciones específicas para el paciente',
    example: 'Dieta blanda, evitar alimentos irritantes',
  })
  @IsString()
  @IsOptional()
  patientInstructions?: string;

  @ApiPropertyOptional({
    description: 'Fecha sugerida para el próximo control',
    example: '2024-01-30T10:00:00Z',
  })
  @IsDateString()
  @IsOptional()
  suggestedNextControl?: string;

  @ApiPropertyOptional({
    description: 'Notas médicas adicionales',
    example: 'Paciente presenta mejoría respecto a consulta anterior',
  })
  @IsString()
  @IsOptional()
  additionalMedicalNotes?: string;

  @ApiProperty({
    description: 'ID del usuario que registra la consulta',
    example: 'clm789xyz123abc',
  })
  @IsString()
  @IsNotEmpty()
  registeredByUserId: string;
}
