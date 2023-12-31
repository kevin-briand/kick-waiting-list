import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  CLEAR_LIST_COMMAND_KEY,
  LIVE_COMMAND_KEY,
  CLOSE_LIST_COMMAND_KEY,
  MODERATOR_COMMANDS_KEY,
  NEXT_LIVE_COMMAND_KEY,
  ONLY_BOTRIX_KEY,
  OPEN_LIST_COMMAND_KEY,
  REMOVE_PLAYER_COMMAND_KEY,
  SUBSCRIBE_KEY,
  UNSUBSCRIBE_KEY,
} from '../consts';
import LocalStorage from '../../../utils/local-storage/local-storage';
import Grid from './components/Grid';
import TitleBox from './components/TitleBox';
import H3 from './components/H3';
import useValidForm from '../../../hook/useValidForm';
import Input from '../../../components/input/Input';
import H4 from './components/H4';

type MessagePatternProps = {
  save?: number;
  datasSaved: () => void;
};

function MessagePattern({ save, datasSaved }: MessagePatternProps) {
  const localStorage = useMemo(() => new LocalStorage(), []);
  const { t } = useTranslation('translation');
  const [saved, setSaved] = useState<number>();
  const { validForm } = useValidForm();

  const subscribeRef = useRef<HTMLInputElement>(null);
  const unsubscribeRef = useRef<HTMLInputElement>(null);
  const onlyBotrixRef = useRef<HTMLInputElement>(null);
  const moderatorCommandsRef = useRef<HTMLInputElement>(null);
  const rmPlayerCommandRef = useRef<HTMLInputElement>(null);
  const clearListCommandRef = useRef<HTMLInputElement>(null);
  const liveCommandRef = useRef<HTMLInputElement>(null);
  const nextLiveCommandRef = useRef<HTMLInputElement>(null);
  const openListCommandRef = useRef<HTMLInputElement>(null);
  const closeListCommandRef = useRef<HTMLInputElement>(null);

  const saveParameters = useCallback(() => {
    setSaved(save);
    if (
      !validForm([
        { ref: subscribeRef, translationKey: 'form.label.subscribe' },
        { ref: unsubscribeRef, translationKey: 'form.label.unsubscribe' },
        { ref: onlyBotrixRef, translationKey: 'form.label.onlyBotrix' },
        {
          ref: moderatorCommandsRef,
          translationKey: 'form.label.moderatorCommands',
        },
        {
          ref: rmPlayerCommandRef,
          translationKey: 'form.label.rmPlayerCommand',
        },
        {
          ref: clearListCommandRef,
          translationKey: 'form.label.clearListCommand',
        },
        {
          ref: liveCommandRef,
          translationKey: 'form.label.liveCommand',
        },
        {
          ref: nextLiveCommandRef,
          translationKey: 'form.label.nextLiveCommand',
        },
        {
          ref: openListCommandRef,
          translationKey: 'form.label.openListCommand',
        },
        {
          ref: closeListCommandRef,
          translationKey: 'form.label.closeListCommand',
        },
      ])
    ) {
      return;
    }
    localStorage.set(SUBSCRIBE_KEY, subscribeRef.current!.value);
    localStorage.set(UNSUBSCRIBE_KEY, unsubscribeRef.current!.value);
    localStorage.set(
      ONLY_BOTRIX_KEY,
      onlyBotrixRef.current?.checked ? 'true' : ''
    );
    localStorage.set(
      MODERATOR_COMMANDS_KEY,
      moderatorCommandsRef.current?.checked ? 'true' : ''
    );
    localStorage.set(
      REMOVE_PLAYER_COMMAND_KEY,
      rmPlayerCommandRef.current!.value
    );
    localStorage.set(
      CLEAR_LIST_COMMAND_KEY,
      clearListCommandRef.current!.value
    );
    localStorage.set(LIVE_COMMAND_KEY, liveCommandRef.current!.value);
    localStorage.set(NEXT_LIVE_COMMAND_KEY, nextLiveCommandRef.current!.value);
    localStorage.set(OPEN_LIST_COMMAND_KEY, openListCommandRef.current!.value);
    localStorage.set(
      CLOSE_LIST_COMMAND_KEY,
      closeListCommandRef.current!.value
    );

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
        <H3>{t('form.label.messagePattern')}</H3>
      </TitleBox>
      <Grid>
        {t('form.label.subscribe')}
        <Input
          type="text"
          title={t('form.tooltip.subscribe')}
          defaultValue={
            localStorage.get(SUBSCRIBE_KEY) || t('form.defaultValue.subscribe')
          }
          ref={subscribeRef}
        />
        {t('form.label.unsubscribe')}
        <Input
          type="text"
          title={t('form.tooltip.unsubscribe')}
          defaultValue={
            localStorage.get(UNSUBSCRIBE_KEY) ||
            t('form.defaultValue.unsubscribe')
          }
          ref={unsubscribeRef}
        />
        {t('form.label.onlyBotrix')}
        <Input
          type="checkbox"
          title={t('form.tooltip.onlyBotrix')}
          defaultChecked={Boolean(localStorage.get(ONLY_BOTRIX_KEY))}
          ref={onlyBotrixRef}
        />
      </Grid>
      <TitleBox>
        <H4>{t('form.label.moderatorCommand')}</H4>
      </TitleBox>
      <Grid>
        {t('form.label.moderatorCommands')}
        <Input
          type="checkbox"
          title={t('form.tooltip.moderatorCommands')}
          defaultChecked={Boolean(localStorage.get(MODERATOR_COMMANDS_KEY))}
          ref={moderatorCommandsRef}
        />
        {t('form.label.rmPlayerCommand')}
        <Input
          type="text"
          title={t('form.tooltip.rmPlayerCommand')}
          defaultValue={
            localStorage.get(REMOVE_PLAYER_COMMAND_KEY) ||
            t('form.defaultValue.rmPlayerCommand')
          }
          ref={rmPlayerCommandRef}
        />
        {t('form.label.clearListCommand')}
        <Input
          type="text"
          title={t('form.tooltip.clearListCommand')}
          defaultValue={
            localStorage.get(CLEAR_LIST_COMMAND_KEY) ||
            t('form.defaultValue.clearListCommand')
          }
          ref={clearListCommandRef}
        />
        {t('form.label.liveCommand')}
        <Input
          type="text"
          title={t('form.tooltip.liveCommand')}
          defaultValue={
            localStorage.get(LIVE_COMMAND_KEY) ||
            t('form.defaultValue.liveCommand')
          }
          ref={liveCommandRef}
        />
        {t('form.label.nextLiveCommand')}
        <Input
          type="text"
          title={t('form.tooltip.nextLiveCommand')}
          defaultValue={
            localStorage.get(NEXT_LIVE_COMMAND_KEY) ||
            t('form.defaultValue.nextLiveCommand')
          }
          ref={nextLiveCommandRef}
        />
        {t('form.label.openListCommand')}
        <Input
          type="text"
          title={t('form.tooltip.openListCommand')}
          defaultValue={
            localStorage.get(OPEN_LIST_COMMAND_KEY) ||
            t('form.defaultValue.openListCommand')
          }
          ref={openListCommandRef}
        />
        {t('form.label.closeListCommand')}
        <Input
          type="text"
          title={t('form.tooltip.closeListCommand')}
          defaultValue={
            localStorage.get(CLOSE_LIST_COMMAND_KEY) ||
            t('form.defaultValue.closeListCommand')
          }
          ref={closeListCommandRef}
        />
      </Grid>
    </>
  );
}

export default MessagePattern;
