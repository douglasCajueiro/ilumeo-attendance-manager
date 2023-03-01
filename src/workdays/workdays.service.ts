import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkdaysService {
  constructor(private prisma: PrismaService) { }

  async startWorkDay(employeeId: string) {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const date = currentDate.getDate()

    const workDayHasAlreadyStarted = await this.prisma.workDay.findFirst({ where: { work_day_start: { gte: new Date(year, month, date) } } })

    if (workDayHasAlreadyStarted) {
      throw new HttpException('The work day has already started for this employee', HttpStatus.BAD_REQUEST)
    }

    return this.prisma.workDay.create({
      data:
      {
        employee_id: employeeId,
        work_day_start: currentDate
      }
    })
  }

  async finishWorkDay(id: string) {
    const date = new Date()
    const workDayToEnd = await this.prisma.workDay.findFirst({ where: { id, work_day_end: null } })

    if (workDayToEnd) {
      return await this.prisma.workDay.update({ where: { id }, data: { work_day_end: date } })
    }

    throw new HttpException('This work day was already finished', HttpStatus.BAD_REQUEST)
  }
}
