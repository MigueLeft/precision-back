import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateQuestionnaireDto {
  @ApiProperty({
    description: 'Unique code identifier for the questionnaire (e.g., im1)',
    maxLength: 50,
    example: 'im1',
  })
  @IsString()
  code: string;

  @ApiProperty({ description: 'Name of the questionnaire', maxLength: 200 })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the questionnaire',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Version of the questionnaire',
    default: '1.0',
    maxLength: 10,
  })
  @IsString()
  @IsOptional()
  version?: string;

  @ApiProperty({
    description: 'Whether the questionnaire is active',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
