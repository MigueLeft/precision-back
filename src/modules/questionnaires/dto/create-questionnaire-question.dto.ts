import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsUuidId } from '../../../common/decorators/id-validation.decorator';

export class CreateQuestionnaireQuestionDto {
  @ApiProperty({ description: 'ID of the questionnaire (UUID)' })
  @IsUuidId()
  questionnaireId: string;

  @ApiProperty({
    description: 'ID of the question (UUID)',
  })
  @IsUuidId()
  questionId: string;

  @ApiProperty({
    description: 'Order of the question in the questionnaire',
    type: 'number',
    example: 1,
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  order: number;

  @ApiPropertyOptional({
    description: 'Whether this question is required',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  required?: boolean;

  @ApiPropertyOptional({
    description: 'Section this question belongs to',
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  section?: string;
}
