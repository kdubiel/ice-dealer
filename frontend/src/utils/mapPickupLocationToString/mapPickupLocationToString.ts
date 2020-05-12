import { BasePickupLocation } from 'gql/types';

export default (pickupLocation?: BasePickupLocation): string => {
  if (!pickupLocation) {
    return '';
  }

  const { zipCode, city, streetName, buildingNumber } = pickupLocation;

  const hasAdditionalData = streetName || buildingNumber;

  const additionalText = hasAdditionalData
    ? `, ul. ${streetName}${buildingNumber ? ' ' + buildingNumber : ''}`
    : '';

  return `${zipCode ? zipCode + ' ' : ''}${city}${additionalText}`;
};
