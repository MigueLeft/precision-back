import { PartialType } from '@nestjs/swagger';
import { CreateConsultationDto } from './create-consultation.dto';
import { IsOptional, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateConsultationDto extends PartialType(CreateConsultationDto) {
  @ApiPropertyOptional({
    description: 'Estado activo de la consulta',
    example: true
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}