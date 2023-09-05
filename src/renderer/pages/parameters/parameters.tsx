import styled from 'styled-components';
import React, { FormEvent, useRef } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import Container from '../../components/Container';
import useAlertError from '../../hook/useAlertError';
import LocalStorage from '../../utils/local-storage/local-storage';
import {
  BOTRIX_DEFAULT_ID,
  BOTRIX_ID_KEY,
  CHAT_ID_KEY,
  LANGUAGE_DEFAULT,
  LANGUAGE_KEY,
  ONLY_BOTRIX_KEY,
  SUBSCRIBE_KEY,
  UNSUBSCRIBE_KEY,
  USERNAME_KEY,
  USERNAME_PATTERN_DEFAULT,
  USERNAME_PATTERN_KEY,
} from './consts';
import getChannelInfo from '../../../kick/api/get-channel-info';
import useAlertInfo from '../../hook/useAlertInfo';
import AVAILABLE_LANGUAGES from '../../utils/locale/available_languages';
import Button from '../../components/button/Button';
import ButtonSave from '../../components/button/ButtonSave';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-auto-rows: 2em;
  gap: 5px 0;
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
  font-size: 1em;
`;

const InlineBox = styled.div`
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  gap: 5px;
`;

const H3 = styled.h3`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid gray;
  max-width: 600px;
  margin: 10px auto;
`;

const BoutonBox = styled(InlineBox)`
  justify-content: center;
`;

function Parameters() {
  const localStorage = new LocalStorage();
  const { t } = useTranslation('translation');
  const languageRef = useRef<HTMLSelectElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLInputElement>(null);
  const subscribeRef = useRef<HTMLInputElement>(null);
  const unsubscribeRef = useRef<HTMLInputElement>(null);
  const onlyBotrixRef = useRef<HTMLInputElement>(null);
  const usernamePatternRef = useRef<HTMLInputElement>(null);
  const botrixIdRef = useRef<HTMLInputElement>(null);
  const setAlertError = useAlertError();
  const setAlertInfo = useAlertInfo();

  const validForm = (): boolean => {
    return !!(
      languageRef.current?.value &&
      usernameRef.current?.value &&
      chatRef.current?.value &&
      subscribeRef.current?.value &&
      unsubscribeRef.current?.value &&
      subscribeRef.current?.value !== unsubscribeRef.current?.value &&
      usernamePatternRef.current?.value &&
      botrixIdRef.current?.value
    );
  };

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

  const handleForm = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validForm()) {
      setAlertError('form.emptyField');
      return;
    }
    const language = languageRef.current?.value || '';
    const username = usernameRef.current?.value || '';
    const chatId = chatRef.current?.value || '';
    const subscribe = subscribeRef.current?.value || '';
    const unsubscribe = unsubscribeRef.current?.value || '';
    const onlyBotrix = onlyBotrixRef.current?.checked ? 'true' : '';
    const usernamePattern = usernamePatternRef.current?.value || '';
    const botrixId = botrixIdRef.current?.value || '';

    if (
      !localStorage.has(LANGUAGE_KEY) ||
      localStorage.get(LANGUAGE_KEY) !== language
    ) {
      i18n.changeLanguage(language);
    }
    localStorage.set(LANGUAGE_KEY, language);
    localStorage.set(USERNAME_KEY, username);
    localStorage.set(CHAT_ID_KEY, chatId);
    localStorage.set(SUBSCRIBE_KEY, subscribe);
    localStorage.set(UNSUBSCRIBE_KEY, unsubscribe);
    localStorage.set(ONLY_BOTRIX_KEY, onlyBotrix);
    localStorage.set(USERNAME_PATTERN_KEY, usernamePattern);
    localStorage.set(BOTRIX_ID_KEY, botrixId);
    setAlertInfo('form.saved');
  };

  return (
    <Container>
      <form onSubmit={handleForm}>
        <H3>{t('form.label.language')}</H3>
        <Grid>
          {t('form.label.language')}
          <select
            id="language"
            name="language"
            ref={languageRef}
            defaultValue={localStorage.get(LANGUAGE_KEY) || LANGUAGE_DEFAULT}
            onChange={(event) => i18n.changeLanguage(event.target.value)}
          >
            {AVAILABLE_LANGUAGES.map((language) => (
              <option key={language.value} value={language.value}>
                {language.name}
              </option>
            ))}
          </select>
        </Grid>
        <H3>{t('form.label.userInfo')}</H3>
        <Grid>
          {t('form.label.username')}
          <input
            type="text"
            id="username"
            name="username"
            ref={usernameRef}
            defaultValue={localStorage.get(USERNAME_KEY) || ''}
          />
          {t('form.label.chatId')}
          <InlineBox>
            <input
              type="number"
              id="chatId"
              name="chatId"
              ref={chatRef}
              defaultValue={localStorage.get(CHAT_ID_KEY) || ''}
            />
            <Button type="button" onClick={handleGetChatId}>
              {t('form.label.getChatId')}
            </Button>
          </InlineBox>
        </Grid>
        <H3>{t('form.label.messagePattern')}</H3>
        <Grid>
          {t('form.label.subscribe')}
          <input
            type="text"
            id="subscribe"
            name="subscribe"
            defaultValue={
              localStorage.get(SUBSCRIBE_KEY) ||
              t('form.defaultValue.subscribe')
            }
            ref={subscribeRef}
          />
          {t('form.label.unsubscribe')}
          <input
            type="text"
            id="unsubscribe"
            name="unsubscribe"
            defaultValue={
              localStorage.get(UNSUBSCRIBE_KEY) ||
              t('form.defaultValue.unsubscribe')
            }
            ref={unsubscribeRef}
          />
          {t('form.label.onlyBotrix')}
          <input
            type="checkbox"
            id="onlyBotrix"
            name="onlyBotrix"
            defaultChecked={Boolean(localStorage.get(ONLY_BOTRIX_KEY))}
            ref={onlyBotrixRef}
          />
        </Grid>
        <H3>{t('form.label.advanced')}</H3>
        <Grid>
          {t('form.label.usernamePattern')}
          <input
            type="text"
            id="uPattern"
            name="uPattern"
            defaultValue={
              localStorage.get(USERNAME_PATTERN_KEY) || USERNAME_PATTERN_DEFAULT
            }
            ref={usernamePatternRef}
          />
          {t('form.label.botrixId')}
          <input
            type="number"
            id="uPattern"
            name="uPattern"
            defaultValue={localStorage.get(BOTRIX_ID_KEY) || BOTRIX_DEFAULT_ID}
            ref={botrixIdRef}
          />
        </Grid>
        <BoutonBox>
          <ButtonSave type="submit">{t('form.label.save')}</ButtonSave>
        </BoutonBox>
      </form>
    </Container>
  );
}

export default Parameters;
