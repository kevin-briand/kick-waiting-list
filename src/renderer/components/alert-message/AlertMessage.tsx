import React, { useContext, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { AlertMessageContext } from './AlertMessageContext';
import { AlertMessageDto } from './dto/alert-message-dto';
import AlertType from './dto/alert-type';

const SnackBar = styled.div`
  visibility: visible;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 30px;
  left: 0;
  bottom: 0;
  text-align: center;
  background-color: ${(props) => props.color || props.theme.button.error.base};
  color: white;
`;

// eslint-disable-next-line no-undef
let timeout: NodeJS.Timeout;
const TIMEOUT_DELAY = 6000;

function AlertMessage() {
  const { alertMessage, setAlertMessage } =
    useContext<AlertMessageDto>(AlertMessageContext);
  const theme = useTheme();

  useEffect(() => {
    if (alertMessage.message === '') {
      return;
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setAlertMessage({ message: '', type: AlertType.SUCCESS });
    }, TIMEOUT_DELAY);
  }, [alertMessage, setAlertMessage]);

  return alertMessage.message ? (
    <SnackBar
      color={
        alertMessage.type === AlertType.SUCCESS
          ? theme.button.success.base
          : theme.button.error.base
      }
      dangerouslySetInnerHTML={{ __html: alertMessage.message }}
    />
  ) : null;
}

export default AlertMessage;
