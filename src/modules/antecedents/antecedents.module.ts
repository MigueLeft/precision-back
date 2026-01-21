import { Module } from '@nestjs/common';
import { AntecedentsService } from './antecedents.service';
import { AntecedentsController } from './antecedents.controller';
import { PrismaService } from '../../config/database/prisma.service';

@Module({
  controllers: [AntecedentsController],
  providers: [AntecedentsService, PrismaService],
  exports: [AntecedentsService],
})
export class AntecedentsModule {}
