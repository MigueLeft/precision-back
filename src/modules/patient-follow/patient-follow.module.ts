import { Module } from '@nestjs/common';
import { PatientFollowService } from './patient-follow.service';
import { PatientFollowController } from './patient-follow.controller';
import { PrismaModule } from '../../config/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PatientFollowController],
  providers: [PatientFollowService],
  exports: [PatientFollowService],
})
export class PatientFollowModule {}