import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ONLY_BOTRIX_KEY, SUBSCRIBE_KEY, UNSUBSCRIBE_KEY } from '../consts';
import LocalStorage from '../../../utils/local-storage/local-storage';
import Grid from './components/Grid';
import TitleBox from './components/TitleBox';
import H3 from './components/H3';
import useValidForm from '../../../hook/useValidForm';
import Input from '../../../components/input/Input';

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

  const saveParameters = useCallback(() => {
    setSaved(save);
    if (
      !validForm([
        { ref: subscribeRef, translationKey: 'form.label.subscribe' },
        { ref: unsubscribeRef, translationKey: 'form.label.unsubscribe' },
        { ref: onlyBotrixRef, translationKey: 'form.label.onlyBotrix' },
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
    </>
  );
}

export default MessagePattern;
