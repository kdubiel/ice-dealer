import { Order } from 'gql/types';
import { TFunction } from 'i18next';
import moment from 'moment';
import { formatPhoneNumber, mapPickupLocationToString } from 'utils';

export const mapOrdersToCsvData = (orders: Order[], t: TFunction) => {
  return orders.map(({ amount, pickupLocation, createdAt, purchaser }) => ({
    [t('labels:amount')]: amount,
    [t('labels:pickupLocation')]: mapPickupLocationToString(pickupLocation),
    [t('labels:createdAt')]: moment(parseInt(createdAt, 10)).format(
      'YYYY-MM-DD, HH:mm'
    ),
    [t('labels:purchaser')]: `${purchaser.name}, ${purchaser.email}`,
    [t('labels:contact')]: formatPhoneNumber(purchaser.phoneNumber),
  }));
};
