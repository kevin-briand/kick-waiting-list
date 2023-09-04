import AlertType from './alert-type';
import { Values } from '../../../../utils/type/type';

export type AlertDto = {
  message: string;
  type: Values<typeof AlertType>;
};
