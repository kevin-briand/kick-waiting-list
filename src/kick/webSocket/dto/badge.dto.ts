import BadgeType from '../enum/badge-type';

export type BadgeDto = {
  type: BadgeType;
  text: string;
  count: number;
};
