import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const employee1 = await prisma.employee.upsert({
        where: { code: "4SXXSMf" },
        update: {},
        create: { code: "4SXXSMf" }
    });

    const employee2 = await prisma.employee.upsert({
        where: { code: "Somebody" },
        update: {},
        create: { code: "Somebody" }
    });

    const employee1WorkDays = [];

    const workDaysSeed = [
        {
            work_day_start: new Date(2023, 2, 25, 9, 0),
            work_day_end: new Date(2023, 2, 25, 17, 0)
        }, {
            work_day_start: new Date(2023, 2, 26, 9, 0),
            work_day_end: new Date(2023, 2, 26, 17, 0)
        },
        , {
            work_day_start: new Date(2023, 2, 27, 9, 0),
            work_day_end: new Date(2023, 2, 27, 17, 0)
        }
    ]

    workDaysSeed.forEach(async ({ work_day_start, work_day_end }) => {
        const workDay = await prisma.workDay.upsert({
            where: { work_day_start: work_day_start },
            update: {},
            create: {
                employee_id: employee1.id,
                work_day_start: work_day_start,
                work_day_end: work_day_end
            }
        })
        employee1WorkDays.push(workDay)
    })

    console.log({ employee1, employee2, employee1WorkDays });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });