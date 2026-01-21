import { Module } from '@nestjs/common';
import { MedicalStudiesService } from './medical-studies.service';
import { MedicalStudiesController } from './medical-studies.controller';
import { PrismaModule } from '../../config/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MedicalStudiesController],
  providers: [MedicalStudiesService],
  exports: [MedicalStudiesService],
})
export class MedicalStudiesModule {}
