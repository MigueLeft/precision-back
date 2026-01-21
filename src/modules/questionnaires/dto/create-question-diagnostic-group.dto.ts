import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsObject } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateQuestionDiagnosticGroupDto {
  @ApiProperty({
    description: 'ID of the question',
  })
  @IsString()
  questionId: string;

  @ApiProperty({ description: 'ID of the diagnostic group' })
  @IsString()
  diagnosticGroupId: string;

  @ApiPropertyOptional({
    description: 'Weight of this question in the diagnostic group calculation',
    type: 'number',
    example: 1.0,
    default: 1.0,
  })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  weight?: number;

  @ApiPropertyOptional({
    description:
      'Scoring rules specific to this question-diagnostic group relationship',
    example: { multiplier: 2, condition: 'if_positive' },
  })
  @IsObject()
  @IsOptional()
  scoringRules?: any;
}
