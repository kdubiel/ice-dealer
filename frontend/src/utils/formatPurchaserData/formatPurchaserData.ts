export interface PurchaserData {
  name: string;
  email: string;
}

export const formatPurchaserData = ({ name, email }: PurchaserData) =>
  `${name}, ${email}`;
