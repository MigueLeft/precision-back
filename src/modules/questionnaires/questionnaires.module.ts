import { Module } from '@nestjs/common';
import { QuestionnairesService } from './questionnaires.service';
import { QuestionnairesController } from './questionnaires.controller';
import { PrismaService } from '../../config/database/prisma.service';

@Module({
  controllers: [QuestionnairesController],
  providers: [QuestionnairesService, PrismaService],
  exports: [QuestionnairesService],
})
export class QuestionnairesModule {}
