import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { QuestionnairesService } from './questionnaires.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';
import { QueryQuestionnaireDto } from './dto/query-questionnaire.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateQuestionnaireQuestionDto } from './dto/create-questionnaire-question.dto';
import { CreateDiagnosticGroupDto } from './dto/create-diagnostic-group.dto';
import { UpdateDiagnosticGroupDto } from './dto/update-diagnostic-group.dto';
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto';
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto';
import { CreatePatientQuestionnaireDto } from './dto/create-patient-questionnaire.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import {
  BatchAnswerDto,
  ProcessedQuestionnaireResultDto,
} from './dto/batch-answer.dto';

@ApiTags('Questionnaires')
@Controller('questionnaires')
export class QuestionnairesController {
  constructor(private readonly questionnairesService: QuestionnairesService) {}

  // === Questionnaires Endpoints ===
  @Post()
  @ApiOperation({ summary: 'Create a new questionnaire' })
  @ApiResponse({
    status: 201,
    description: 'Questionnaire created successfully',
  })
  createQuestionnaire(@Body() createQuestionnaireDto: CreateQuestionnaireDto) {
    return this.questionnairesService.createQuestionnaire(
      createQuestionnaireDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all questionnaires with pagination and filtering',
  })
  @ApiResponse({
    status: 200,
    description: 'Questionnaires retrieved successfully',
  })
  findAllQuestionnaires(@Query() queryDto: QueryQuestionnaireDto) {
    return this.questionnairesService.findAllQuestionnaires(queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a questionnaire by ID' })
  @ApiParam({ name: 'id', description: 'Questionnaire ID' })
  @ApiResponse({ status: 200, description: 'Questionnaire found' })
  @ApiResponse({ status: 404, description: 'Questionnaire not found' })
  findQuestionnaireById(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionnairesService.findQuestionnaireById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a questionnaire' })
  @ApiParam({ name: 'id', description: 'Questionnaire ID' })
  @ApiResponse({
    status: 200,
    description: 'Questionnaire updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Questionnaire not found' })
  updateQuestionnaire(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateQuestionnaireDto: UpdateQuestionnaireDto,
  ) {
    return this.questionnairesService.updateQuestionnaire(
      id,
      updateQuestionnaireDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a questionnaire' })
  @ApiParam({ name: 'id', description: 'Questionnaire ID' })
  @ApiResponse({
    status: 200,
    description: 'Questionnaire deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Questionnaire not found' })
  removeQuestionnaire(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionnairesService.removeQuestionnaire(id);
  }

  // === Questions Endpoints ===
  @Post('questions')
  @ApiOperation({ summary: 'Create a new question' })
  @ApiResponse({ status: 201, description: 'Question created successfully' })
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionnairesService.createQuestion(createQuestionDto);
  }

  @Get('questions')
  @ApiOperation({ summary: 'Get all questions with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Questions retrieved successfully' })
  findAllQuestions(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.questionnairesService.findAllQuestions(page, limit, search);
  }

  @Get('questions/:id')
  @ApiOperation({ summary: 'Get a question by ID' })
  @ApiParam({ name: 'id', description: 'Question ID' })
  @ApiResponse({ status: 200, description: 'Question found' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  findQuestionById(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionnairesService.findQuestionById(id);
  }

  @Patch('questions/:id')
  @ApiOperation({ summary: 'Update a question' })
  @ApiParam({ name: 'id', description: 'Question ID' })
  @ApiResponse({ status: 200, description: 'Question updated successfully' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  updateQuestion(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionnairesService.updateQuestion(id, updateQuestionDto);
  }

  @Delete('questions/:id')
  @ApiOperation({ summary: 'Delete a question' })
  @ApiParam({ name: 'id', description: 'Question ID' })
  @ApiResponse({ status: 200, description: 'Question deleted successfully' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  removeQuestion(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionnairesService.removeQuestion(id);
  }

  // === Questionnaire Questions Relations ===
  @Post(':id/questions')
  @ApiOperation({ summary: 'Add a question to a questionnaire' })
  @ApiParam({ name: 'id', description: 'Questionnaire ID' })
  @ApiResponse({
    status: 201,
    description: 'Question added to questionnaire successfully',
  })
  addQuestionToQuestionnaire(
    @Body() createQuestionnaireQuestionDto: CreateQuestionnaireQuestionDto,
  ) {
    return this.questionnairesService.addQuestionToQuestionnaire(
      createQuestionnaireQuestionDto,
    );
  }

  @Delete('questionnaire-questions/:id')
  @ApiOperation({ summary: 'Remove a question from a questionnaire' })
  @ApiParam({ name: 'id', description: 'QuestionnaireQuestion relation ID' })
  @ApiResponse({
    status: 200,
    description: 'Question removed from questionnaire successfully',
  })
  removeQuestionFromQuestionnaire(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionnairesService.removeQuestionFromQuestionnaire(id);
  }

  // === Diagnostic Groups ===
  @Post('diagnostic-groups')
  @ApiOperation({ summary: 'Create a diagnostic group' })
  @ApiResponse({
    status: 201,
    description: 'Diagnostic group created successfully',
  })
  createDiagnosticGroup(
    @Body() createDiagnosticGroupDto: CreateDiagnosticGroupDto,
  ) {
    return this.questionnairesService.createDiagnosticGroup(
      createDiagnosticGroupDto,
    );
  }

  @Patch('diagnostic-groups/:id')
  @ApiOperation({ summary: 'Update a diagnostic group' })
  @ApiParam({ name: 'id', description: 'Diagnostic group ID' })
  @ApiResponse({
    status: 200,
    description: 'Diagnostic group updated successfully',
  })
  updateDiagnosticGroup(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDiagnosticGroupDto: UpdateDiagnosticGroupDto,
  ) {
    return this.questionnairesService.updateDiagnosticGroup(
      id,
      updateDiagnosticGroupDto,
    );
  }

  // === Diagnostics ===
  @Post('diagnostics')
  @ApiOperation({ summary: 'Create a diagnostic' })
  @ApiResponse({ status: 201, description: 'Diagnostic created successfully' })
  createDiagnostic(@Body() createDiagnosticDto: CreateDiagnosticDto) {
    return this.questionnairesService.createDiagnostic(createDiagnosticDto);
  }

  @Patch('diagnostics/:id')
  @ApiOperation({ summary: 'Update a diagnostic' })
  @ApiParam({ name: 'id', description: 'Diagnostic ID' })
  @ApiResponse({ status: 200, description: 'Diagnostic updated successfully' })
  updateDiagnostic(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDiagnosticDto: UpdateDiagnosticDto,
  ) {
    return this.questionnairesService.updateDiagnostic(id, updateDiagnosticDto);
  }

  // === Patient Questionnaires ===
  @Post('patient-questionnaires')
  @ApiOperation({ summary: 'Start a new patient questionnaire session' })
  @ApiResponse({
    status: 201,
    description: 'Patient questionnaire session created successfully',
  })
  createPatientQuestionnaire(
    @Body() createPatientQuestionnaireDto: CreatePatientQuestionnaireDto,
  ) {
    return this.questionnairesService.createPatientQuestionnaire(
      createPatientQuestionnaireDto,
    );
  }

  @Get('patients/:patientId/questionnaires')
  @ApiOperation({ summary: 'Get all questionnaires completed by a patient' })
  @ApiParam({ name: 'patientId', description: 'Patient ID' })
  @ApiResponse({
    status: 200,
    description: 'Patient questionnaires retrieved successfully',
  })
  findPatientQuestionnaires(@Param('patientId') patientId: string) {
    return this.questionnairesService.findPatientQuestionnaires(patientId);
  }

  // === Answers ===
  @Post('answers')
  @ApiOperation({ summary: 'Submit an answer to a question' })
  @ApiResponse({ status: 201, description: 'Answer submitted successfully' })
  createAnswer(@Body() createAnswerDto: CreateAnswerDto) {
    return this.questionnairesService.createAnswer(createAnswerDto);
  }

  @Get('patient-questionnaires/:id/answers')
  @ApiOperation({
    summary: 'Get all answers for a patient questionnaire session',
  })
  @ApiParam({ name: 'id', description: 'Patient questionnaire ID' })
  @ApiResponse({ status: 200, description: 'Answers retrieved successfully' })
  findAnswersByPatientQuestionnaire(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionnairesService.findAnswersByPatientQuestionnaire(id);
  }

  // === Batch Answer Processing ===
  @Post('batch-answers')
  @ApiOperation({
    summary: 'Process multiple answers at once for a questionnaire',
    description:
      'Saves answers quickly and returns response. Relations (antecedents, symptoms, diagnostics) are processed in background.',
  })
  @ApiResponse({
    status: 201,
    description:
      'Answers processed successfully. Relations will be processed in background.',
    type: ProcessedQuestionnaireResultDto,
  })
  processBatchAnswers(
    @Body() batchAnswerDto: BatchAnswerDto,
  ): Promise<ProcessedQuestionnaireResultDto> {
    return this.questionnairesService.processBatchAnswers(batchAnswerDto);
  }

  // === Check Relations Processing Status ===
  @Get('patient-questionnaires/:id/relations-status')
  @ApiOperation({
    summary: 'Check the status of relations processing',
    description:
      'Returns the current status of background relations processing (pending, processing, completed, failed)',
  })
  @ApiParam({
    name: 'id',
    description: 'Patient Questionnaire ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Status retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        relationsProcessed: { type: 'boolean', example: true },
        relationsProcessingStatus: {
          type: 'string',
          enum: ['pending', 'processing', 'completed', 'failed'],
          example: 'completed',
        },
        relationsProcessingError: {
          type: 'string',
          nullable: true,
          example: null,
        },
        relationsProcessedAt: {
          type: 'string',
          format: 'date-time',
          nullable: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Patient questionnaire not found',
  })
  getRelationsProcessingStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionnairesService.getRelationsProcessingStatus(id);
  }

  // === Get Complete Patient Questionnaire Details ===
  @Get('patient-questionnaires/:id/details')
  @ApiOperation({
    summary: 'Get complete details of a patient questionnaire',
    description:
      'Returns all details including answers, diagnostics, and processing status. Call this after background processing is completed.',
  })
  @ApiParam({
    name: 'id',
    description: 'Patient Questionnaire ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Details retrieved successfully',
    type: ProcessedQuestionnaireResultDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Patient questionnaire not found',
  })
  getPatientQuestionnaireDetails(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionnairesService.getPatientQuestionnaireDetails(id);
  }

  // === Reprocess Questionnaire Relations ===
  @Post('patient-questionnaires/:id/reprocess-relations')
  @ApiOperation({
    summary: 'Reprocess relations for a patient questionnaire',
    description:
      'Reprocesses antecedents, symptoms, physical examination, and diagnostics for a questionnaire that failed or needs to be updated. Useful when background processing fails.',
  })
  @ApiParam({
    name: 'id',
    description: 'Patient Questionnaire ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Reprocessing started successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: {
          type: 'string',
          example:
            'Reprocessing started successfully. Relations will be recreated in background.',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Patient questionnaire not found',
  })
  reprocessQuestionnaireRelations(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ success: boolean; message: string }> {
    return this.questionnairesService.reprocessQuestionnaireRelations(id);
  }
}
