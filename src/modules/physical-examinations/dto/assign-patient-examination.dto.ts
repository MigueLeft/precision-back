import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class AssignPatientExaminationDto {
  @ApiProperty({
    description: 'ID del paciente',
    example: 'uuid-del-paciente',
  })
  @IsUUID()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({
    description: 'ID del examen físico',
    example: 'uuid-del-examen-fisico',
  })
  @IsUUID()
  @IsNotEmpty()
  physicalExaminationId: string;

  @ApiProperty({
    description: 'Fecha cuando se realizó el examen',
    example: '2024-09-26T10:30:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  examinationDate: string;

  @ApiProperty({
    description: 'Notas específicas para este examen del paciente',
    example: 'Examen de rutina, paciente en buen estado general',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
