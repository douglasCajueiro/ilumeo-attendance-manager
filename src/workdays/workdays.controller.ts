import { Controller, Post, Patch, Param } from '@nestjs/common';
import { WorkdaysService } from './workdays.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('WorkDays')
@Controller('')
export class WorkdaysController {
  constructor(private readonly workdaysService: WorkdaysService) { }

  @Post("workday/:employeeId/start")
  create(@Param('employeeId') employeeId: string) {
    return this.workdaysService.startWorkDay(employeeId);
  }

  @Patch('workday/:id/end')
  update(@Param('id') id: string) {
    return this.workdaysService.finishWorkDay(id);
  }
}
