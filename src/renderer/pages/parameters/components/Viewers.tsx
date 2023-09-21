import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { VIEWERS_LIVE_KEY } from '../consts';
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

  const viewersLiveRef = useRef<HTMLInputElement>(null);

  const saveParameters = useCallback(() => {
    setSaved(save);
    if (
      !validForm([
        { ref: viewersLiveRef, translationKey: 'form.label.viewersLive' },
      ])
    ) {
      return;
    }
    localStorage.set(VIEWERS_LIVE_KEY, viewersLiveRef.current!.value);
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
        <H3>{t('form.label.viewers')}</H3>
      </TitleBox>
      <Grid>
        {t('form.label.viewersLive')}
        <Input
          type="number"
          min={0}
          title={t('form.tooltip.viewersLive')}
          defaultValue={localStorage.get(VIEWERS_LIVE_KEY) || 3}
          ref={viewersLiveRef}
        />
      </Grid>
    </>
  );
}

export default MessagePattern;
