import {
  IsArray,
  ValidateNested,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsUuidId,
  IsCuidId,
} from '../../../common/decorators/id-validation.decorator';

class AnswerItemDto {
  @ApiProperty({ description: 'Question ID (UUID)' })
  @IsUuidId()
  questionId: string;

  @ApiProperty({ description: 'Answer text', required: false })
  @IsOptional()
  @IsString()
  answerText?: string;

  @ApiProperty({ description: 'Answer value', required: false })
  @IsOptional()
  @IsNumber()
  answerValue?: number;

  @ApiProperty({ description: 'Boolean answer', required: false })
  @IsOptional()
  @IsBoolean()
  answerBoolean?: boolean;

  @ApiProperty({ description: 'Score for this answer', required: false })
  @IsOptional()
  @IsNumber()
  score?: number;
}

export class BatchAnswerDto {
  @ApiProperty({
    description:
      'Patient ID (CUID) - Required. Patient must be created before filling the questionnaire.',
    required: false,
    example: 'clxxx123',
  })
  @IsOptional()
  @IsCuidId()
  patientId?: string;

  @ApiProperty({ description: 'Questionnaire ID (UUID)' })
  @IsUuidId()
  questionnaireId: string;

  @ApiProperty({ description: 'Array of answers', type: [AnswerItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerItemDto)
  answers: AnswerItemDto[];
}

export class ProcessedQuestionnaireResultDto {
  @ApiProperty({ description: 'Patient questionnaire session ID' })
  patientQuestionnaireId: string;

  @ApiProperty({ description: 'Patient information' })
  patient: any;

  @ApiProperty({ description: 'Questionnaire information' })
  questionnaire: any;

  @ApiProperty({ description: 'All answers submitted with question details' })
  answers: {
    id: string;
    questionText: string;
    questionCode: string;
    questionType: string;
    textValue?: string;
    numericValue?: number;
    booleanValue?: boolean;
    score: number;
    answeredAt: Date;
    readableAnswer: string;
  }[];

  @ApiProperty({ description: 'Calculated diagnostics based on scoring' })
  diagnostics: {
    group: string;
    name: string;
    description?: string;
    score: number;
    threshold: number;
    risk: 'low' | 'medium' | 'high';
  }[];

  @ApiProperty({ description: 'Summary of the assessment' })
  summary: {
    totalScore: number;
    maxPossibleScore: number;
    scorePercentage: number;
    completedAt: Date;
    overallRisk: 'low' | 'medium' | 'high';
    relationsProcessingStatus?:
      | 'pending'
      | 'processing'
      | 'completed'
      | 'failed';
  };

  @ApiProperty({ description: 'Detailed breakdown by section' })
  answersBySection?: {
    sectionName: string;
    questions: {
      questionText: string;
      answer: string;
      score: number;
    }[];
    sectionScore: number;
    maxSectionScore: number;
  }[];
}
