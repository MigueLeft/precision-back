import { PartialType } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateRescheduleDto } from './create-reschedule.dto';

export class UpdateRescheduleDto extends PartialType(CreateRescheduleDto) {
  @ApiPropertyOptional({
    description: 'Estado de la reprogramación',
    enum: ['pending', 'completed'],
    example: 'completed',
  })
  @IsOptional()
  @IsString()
  @IsIn(['pending', 'completed'])
  rescheduleStatus?: string;
}