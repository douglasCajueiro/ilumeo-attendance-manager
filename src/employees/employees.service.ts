import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) { }

  async getHistory(employeeCode: string) {

    const employeeHistory = await this.prisma.employee.findFirst({
      where: { code: employeeCode }, select: {
        workDays: true,
        id: true
      }
    })
    if (!employeeHistory) throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    return employeeHistory
  }
}
