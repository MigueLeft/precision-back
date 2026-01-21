import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsObject,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsUuidId } from '../../../common/decorators/id-validation.decorator';

export class CreateAnswerDto {
  @ApiProperty({
    description: 'ID of the patient questionnaire session (UUID)',
  })
  @IsUuidId()
  patientQuestionnaireId: string;

  @ApiProperty({
    description: 'ID of the question being answered (UUID)',
  })
  @IsUuidId()
  questionId: string;

  @ApiPropertyOptional({ description: 'Text value for text-based answers' })
  @IsOptional()
  @IsString()
  textValue?: string;

  @ApiPropertyOptional({
    description: 'Numeric value for numeric answers',
    type: 'number',
    example: 2.5,
  })
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  numericValue?: number;

  @ApiPropertyOptional({ description: 'Boolean value for yes/no questions' })
  @IsOptional()
  @IsBoolean()
  booleanValue?: boolean;

  @ApiPropertyOptional({ description: 'Date value for date questions' })
  @IsOptional()
  @IsDateString()
  dateValue?: string;

  @ApiPropertyOptional({
    description: 'JSON value for multiple choice selections',
    example: ['option1', 'option2'],
  })
  @IsOptional()
  @IsObject()
  jsonValue?: any;

  @ApiPropertyOptional({
    description: 'Calculated score for this answer',
    type: 'number',
  })
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  score?: number;
}
