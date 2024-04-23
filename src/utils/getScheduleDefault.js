import { ScheduleDefault } from '~/constants/schedule';
import dayjs from 'dayjs';

export default function AdjustScheduleForCurrentWeek(currentTime) {
    const currentDay = currentTime.getDay();
    const mondayThisWeek = new Date(currentTime);
    mondayThisWeek.setDate(mondayThisWeek.getDate() - currentDay + 1);

    const mondayDefault = new Date(ScheduleDefault[0].fromTime);

    const dateDiff = Math.round((mondayThisWeek - mondayDefault) / (1000 * 60 * 60 * 24));

    return ScheduleDefault.map((item) => {
        const fromTime = new Date(item.fromTime);
        fromTime.setDate(fromTime.getDate() + dateDiff);

        const toTime = new Date(item.toTime);
        toTime.setDate(toTime.getDate() + dateDiff);

        return {
            fromTime: fromTime,
            toTime: toTime,
            action: item.action,
            date: parseInt(dayjs(fromTime).format('YYYYMMDD'), 10),
        };
    });
}
