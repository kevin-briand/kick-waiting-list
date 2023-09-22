import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { CHAT_ID_KEY, USERNAME_KEY } from '../consts';
import LocalStorage from '../../../utils/local-storage/local-storage';
import useAlertInfo from '../../../hook/useAlertInfo';
import Button from '../../../components/button/Button';
import getChannelInfo from '../../../../kick/api/get-channel-info';
import useAlertError from '../../../hook/useAlertError';
import Grid from './components/Grid';
import FixedWidthFlexBox from './components/FixedWidthFlexBox';
import TitleBox from './components/TitleBox';
import H3 from './components/H3';
import useValidForm from '../../../hook/useValidForm';
import Input from '../../../components/input/Input';

type UserInfoProps = {
  save?: number;
  advancedEnabled: boolean;
  datasSaved: () => void;
};

const ChatIdInput = styled(Input)`
  flex-grow: 1;
  width: 25%;
`;

function UserInfo({ save, advancedEnabled, datasSaved }: UserInfoProps) {
  const localStorage = useMemo(() => new LocalStorage(), []);
  const { t } = useTranslation('translation');
  const setAlertInfo = useAlertInfo();
  const setAlertError = useAlertError();
  const [saved, setSaved] = useState<number>();
  const { validForm } = useValidForm();

  const usernameRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLInputElement>(null);

  const handleGetChatId = async () => {
    if (!usernameRef.current?.value) {
      setAlertError('form.emptyUsername');
      return;
    }
    setAlertInfo('form.getChannelId');
    if (chatRef.current) {
      chatRef.current.value =
        (await getChannelInfo(usernameRef.current.value.replace('_', '-'))
          .then((data) => {
            setAlertInfo('form.successGetChannelId');
            return data.id.toString();
          })
          .catch(() => setAlertError('form.failGetChannelId'))) || '';
    }
  };

  const saveParameters = useCallback(() => {
    setSaved(save);
    if (
      !validForm([
        { ref: usernameRef, translationKey: 'form.label.username' },
        { ref: chatRef, translationKey: 'form.label.chatId' },
      ])
    ) {
      return;
    }
    localStorage.set(USERNAME_KEY, usernameRef.current!.value);
    localStorage.set(CHAT_ID_KEY, chatRef.current!.value);
    datasSaved();
  }, [datasSaved, localStorage, save, validForm]);

  useEffect(() => {
    if (!save || save === saved) {
      return;
    }
    saveParameters();
  }, [save, saveParameters, saved]);

  return (
    <>
      <TitleBox>
        <H3>{t('form.label.userInfo')}</H3>
      </TitleBox>
      <Grid>
        {t('form.label.username')}
        <Input
          type="text"
          title={t('form.tooltip.username')}
          ref={usernameRef}
          defaultValue={localStorage.get(USERNAME_KEY) || ''}
        />
        {t('form.label.chatId')}
        <FixedWidthFlexBox>
          <ChatIdInput
            type="number"
            disabled={!advancedEnabled}
            title={t('form.tooltip.chatId')}
            ref={chatRef}
            defaultValue={localStorage.get(CHAT_ID_KEY) || ''}
          />
          <Button type="button" onClick={handleGetChatId}>
            {t('form.label.getChatId')}
          </Button>
        </FixedWidthFlexBox>
      </Grid>
    </>
  );
}

export default UserInfo;
