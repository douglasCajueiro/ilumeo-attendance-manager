import { Module } from '@nestjs/common';
import { WorkdaysService } from './workdays.service';
import { WorkdaysController } from './workdays.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [WorkdaysController],
  providers: [WorkdaysService],
  imports: [PrismaModule],
})
export class WorkdaysModule {}
