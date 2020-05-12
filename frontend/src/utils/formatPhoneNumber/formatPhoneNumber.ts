export const formatPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber.length !== 9) {
    return phoneNumber;
  }

  return phoneNumber
    .split('')
    .map((digit, index) =>
      index !== 8 && index % 3 === 2 ? `${digit}-` : digit
    )
    .join('');
};
