import { Module } from '@nestjs/common';
import { ContactAttemptService } from './contact-attempt.service';
import { ContactAttemptController } from './contact-attempt.controller';
import { PrismaModule } from '../../config/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ContactAttemptController],
  providers: [ContactAttemptService],
  exports: [ContactAttemptService],
})
export class ContactAttemptModule {}