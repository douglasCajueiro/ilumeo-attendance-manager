import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeesModule } from './employees/employees.module';
import { WorkdaysModule } from './workdays/workdays.module';

@Module({
  imports: [PrismaModule, EmployeesModule, WorkdaysModule],
  providers: [AppService],
})
export class AppModule {}
