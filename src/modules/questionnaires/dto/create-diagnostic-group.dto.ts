import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { IsUuidId } from '../../../common/decorators/id-validation.decorator';

export class CreateDiagnosticGroupDto {
  @ApiProperty({ description: 'Name of the diagnostic group', maxLength: 100 })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Description of the diagnostic group' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'ID of the questionnaire this group belongs to (UUID)',
  })
  @IsUuidId()
  questionnaireId: string;

  @ApiPropertyOptional({
    description: 'Whether the diagnostic group is active',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
