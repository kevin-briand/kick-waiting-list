import React from 'react';
import { AlertMessageDto } from './dto/alert-message-dto';
import AlertType from './dto/alert-type';

// eslint-disable-next-line import/prefer-default-export
export const AlertMessageContext = React.createContext<AlertMessageDto>({
  alertMessage: { message: '', type: AlertType.SUCCESS },
  setAlertMessage: () => null,
});
