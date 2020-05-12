import moment from 'moment';

export const materialTableFilterDate = (filter: string, timestamp: string) =>
  moment(parseInt(timestamp))
    .format('DD.MM.YYYY, hh:mm:ss')
    .includes(filter);
