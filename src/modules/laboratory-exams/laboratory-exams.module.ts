import { Module } from '@nestjs/common';
import { LaboratoryExamsService } from './laboratory-exams.service';
import { LaboratoryExamsController } from './laboratory-exams.controller';
import { PrismaModule } from '../../config/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LaboratoryExamsController],
  providers: [LaboratoryExamsService],
  exports: [LaboratoryExamsService],
})
export class LaboratoryExamsModule {}
