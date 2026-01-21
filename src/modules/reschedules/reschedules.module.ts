import { Module } from '@nestjs/common';
import { ReschedulesService } from './reschedules.service';
import { ReschedulesController } from './reschedules.controller';
import { PrismaModule } from '../../config/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReschedulesController],
  providers: [ReschedulesService],
  exports: [ReschedulesService],
})
export class ReschedulesModule {}
