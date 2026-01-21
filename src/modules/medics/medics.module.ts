import { Module } from '@nestjs/common';
import { MedicsService } from './medics.service';
import { MedicsController } from './medics.controller';
import { PrismaModule } from '../../config/database/prisma.module';
import { SpecialtiesModule } from '../specialties/specialties.module';

@Module({
  imports: [PrismaModule, SpecialtiesModule],
  controllers: [MedicsController],
  providers: [MedicsService],
  exports: [MedicsService],
})
export class MedicsModule {}
