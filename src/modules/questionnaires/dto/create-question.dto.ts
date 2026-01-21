import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsObject,
  IsEnum,
} from 'class-validator';
import { QuestionType } from '@prisma/client';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'Unique code identifier for the question (e.g., im1_a_1_1)',
    maxLength: 50,
    example: 'im1_a_1_1',
  })
  @IsString()
  code: string;

  @ApiProperty({ description: 'Text of the question' })
  @IsString()
  questionText: string;

  @ApiProperty({
    description: 'Type of the question',
    enum: QuestionType,
    example: QuestionType.MULTIPLE_CHOICE,
  })
  @IsEnum(QuestionType)
  questionType: QuestionType;

  @ApiPropertyOptional({
    description:
      'Options for the question (for multiple/single choice questions)',
    example: {
      options: ['Option 1', 'Option 2', 'Option 3'],
      scores: [1, 2, 3],
    },
  })
  @IsOptional()
  @IsObject()
  options?: Record<string, any>;

  @ApiPropertyOptional({
    description:
      'Input type for UI rendering (radio, checkbox, text, range, etc.)',
    maxLength: 50,
    example: 'radio',
  })
  @IsOptional()
  @IsString()
  inputType?: string;

  @ApiPropertyOptional({
    description: 'Whether the question has a score',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  hasScore?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the question is active',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
