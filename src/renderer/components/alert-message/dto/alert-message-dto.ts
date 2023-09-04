import { AlertDto } from './alert-dto';

export type AlertMessageDto = {
  alertMessage: AlertDto;
  setAlertMessage: (message: AlertDto) => void;
};
