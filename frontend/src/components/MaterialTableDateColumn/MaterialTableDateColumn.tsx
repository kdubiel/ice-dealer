import React from 'react';
import moment from 'moment';

interface Props {
  date: string;
}

const MaterialTableDateColumn = ({ date }: Props) => (
  <span>{moment(parseInt(date)).format('DD.MM.YYYY, hh:mm:ss')}</span>
);

export default MaterialTableDateColumn;
