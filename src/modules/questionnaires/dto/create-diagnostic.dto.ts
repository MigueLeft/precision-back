import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsHexColor } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsUuidId } from '../../../common/decorators/id-validation.decorator';

export class CreateDiagnosticDto {
  @ApiProperty({
    description: 'ID of the diagnostic group this diagnostic belongs to (UUID)',
  })
  @IsUuidId()
  diagnosticGroupId: string;

  @ApiProperty({ description: 'Name of the diagnostic', maxLength: 100 })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Description of the diagnostic' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Minimum score for this diagnostic',
    type: 'number',
    example: 0.0,
  })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  minScore: number;

  @ApiProperty({
    description: 'Maximum score for this diagnostic',
    type: 'number',
    example: 10.0,
  })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  maxScore: number;

  @ApiPropertyOptional({
    description: 'Severity level of this diagnostic',
    example: 'medium',
    enum: ['low', 'medium', 'high', 'critical'],
  })
  @IsString()
  @IsOptional()
  severity?: string;

  @ApiPropertyOptional({
    description: 'Recommendations for this diagnostic result',
  })
  @IsString()
  @IsOptional()
  recommendations?: string;

  @ApiPropertyOptional({
    description: 'Color code for this diagnostic (hex format)',
    example: '#FF5733',
  })
  @IsString()
  @IsHexColor()
  @IsOptional()
  colorCode?: string;
}
