import { Module } from '@nestjs/common';
import { RescueDirectoryService } from './rescue-directory.service';
import { RescueDirectoryController } from './rescue-directory.controller';
import { PrismaModule } from '../../config/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RescueDirectoryController],
  providers: [RescueDirectoryService],
  exports: [RescueDirectoryService],
})
export class RescueDirectoryModule {}