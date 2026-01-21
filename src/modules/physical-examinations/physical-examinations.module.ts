import { Module } from '@nestjs/common';
import { PhysicalExaminationsService } from './physical-examinations.service';
import { PhysicalExaminationsController } from './physical-examinations.controller';
import { PrismaService } from '../../config/database/prisma.service';

@Module({
  controllers: [PhysicalExaminationsController],
  providers: [PhysicalExaminationsService, PrismaService],
  exports: [PhysicalExaminationsService],
})
export class PhysicalExaminationsModule {}
