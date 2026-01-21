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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { MedicalStudiesService } from './medical-studies.service';
import { CreateMedicalStudyDto } from './dto/create-medical-study.dto';
import { UpdateMedicalStudyDto } from './dto/update-medical-study.dto';
import { QueryMedicalStudyDto } from './dto/query-medical-study.dto';

@ApiTags('Medical Studies')
@Controller('medical-studies')
export class MedicalStudiesController {
  constructor(
    private readonly medicalStudiesService: MedicalStudiesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new medical study',
    description:
      'Create a new medical study/test (lab, radiology, etc.) for a patient',
  })
  @ApiResponse({
    status: 201,
    description: 'Medical study created successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Patient not found',
  })
  create(@Body() createMedicalStudyDto: CreateMedicalStudyDto) {
    return this.medicalStudiesService.create(createMedicalStudyDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all medical studies with pagination and filters',
    description:
      'Retrieve medical studies with optional filters by patient, type, status, etc.',
  })
  @ApiResponse({
    status: 200,
    description: 'Medical studies retrieved successfully',
  })
  findAll(@Query() queryDto: QueryMedicalStudyDto) {
    return this.medicalStudiesService.findAll(queryDto);
  }

  @Get('patient/:patientId')
  @ApiOperation({
    summary: 'Get all medical studies for a specific patient',
    description: 'Retrieve all active medical studies for a patient',
  })
  @ApiParam({
    name: 'patientId',
    description: 'Patient ID (CUID)',
  })
  @ApiQuery({
    name: 'studyType',
    required: false,
    description: 'Filter by study type',
  })
  @ApiResponse({
    status: 200,
    description: 'Medical studies retrieved successfully',
  })
  findByPatient(
    @Param('patientId') patientId: string,
    @Query('studyType') studyType?: string,
  ) {
    return this.medicalStudiesService.findByPatient(patientId, studyType);
  }

  @Get('patient/:patientId/pending')
  @ApiOperation({
    summary: 'Get pending medical studies for a patient',
    description: 'Retrieve studies that are pending completion',
  })
  @ApiParam({
    name: 'patientId',
    description: 'Patient ID (CUID)',
  })
  @ApiResponse({
    status: 200,
    description: 'Pending studies retrieved successfully',
  })
  getPendingStudies(@Param('patientId') patientId: string) {
    return this.medicalStudiesService.getPendingStudies(patientId);
  }

  @Get('patient/:patientId/completed')
  @ApiOperation({
    summary: 'Get completed medical studies for a patient',
    description: 'Retrieve studies that have been completed or reviewed',
  })
  @ApiParam({
    name: 'patientId',
    description: 'Patient ID (CUID)',
  })
  @ApiResponse({
    status: 200,
    description: 'Completed studies retrieved successfully',
  })
  getCompletedStudies(@Param('patientId') patientId: string) {
    return this.medicalStudiesService.getCompletedStudies(patientId);
  }

  @Get('patient/:patientId/type/:studyType')
  @ApiOperation({
    summary: 'Get medical studies by type for a patient',
    description: 'Retrieve all studies of a specific type for a patient',
  })
  @ApiParam({
    name: 'patientId',
    description: 'Patient ID (CUID)',
  })
  @ApiParam({
    name: 'studyType',
    description: 'Type of study',
  })
  @ApiResponse({
    status: 200,
    description: 'Studies retrieved successfully',
  })
  getStudiesByType(
    @Param('patientId') patientId: string,
    @Param('studyType') studyType: string,
  ) {
    return this.medicalStudiesService.getStudiesByType(patientId, studyType);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a medical study by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Medical Study ID (UUID)',
  })
  @ApiResponse({
    status: 200,
    description: 'Medical study found',
  })
  @ApiResponse({
    status: 404,
    description: 'Medical study not found',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicalStudiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a medical study',
  })
  @ApiParam({
    name: 'id',
    description: 'Medical Study ID (UUID)',
  })
  @ApiResponse({
    status: 200,
    description: 'Medical study updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Medical study not found',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMedicalStudyDto: UpdateMedicalStudyDto,
  ) {
    return this.medicalStudiesService.update(id, updateMedicalStudyDto);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Change medical study status',
    description: 'Change status between "pending", "completed", and "reviewed"',
  })
  @ApiParam({
    name: 'id',
    description: 'Medical Study ID (UUID)',
  })
  @ApiQuery({
    name: 'status',
    enum: ['pending', 'completed', 'reviewed'],
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Medical study status changed successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Medical study not found',
  })
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('status') status: 'pending' | 'completed' | 'reviewed',
  ) {
    return this.medicalStudiesService.changeStatus(id, status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Soft delete a medical study',
    description: 'Mark medical study as inactive (soft delete)',
  })
  @ApiParam({
    name: 'id',
    description: 'Medical Study ID (UUID)',
  })
  @ApiResponse({
    status: 200,
    description: 'Medical study deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Medical study not found',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicalStudiesService.remove(id);
  }

  @Delete(':id/hard')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Permanently delete a medical study',
    description:
      'Hard delete - removes medical study from database permanently',
  })
  @ApiParam({
    name: 'id',
    description: 'Medical Study ID (UUID)',
  })
  @ApiResponse({
    status: 200,
    description: 'Medical study permanently deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Medical study not found',
  })
  hardDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicalStudiesService.hardDelete(id);
  }
}
