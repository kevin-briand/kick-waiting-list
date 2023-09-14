import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { API_KEY, PORT_DEFAULT, PORT_KEY } from '../consts';
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

function Obs({ save, datasSaved }: MessagePatternProps) {
  const localStorage = useMemo(() => new LocalStorage(), []);
  const { t } = useTranslation('translation');
  const [saved, setSaved] = useState<number>();
  const { validForm } = useValidForm();

  const activateObsApiRef = useRef<HTMLInputElement>(null);
  const obsPortRef = useRef<HTMLInputElement>(null);

  const setServerState = (start: boolean) => {
    const status = start ? 'start' : 'stop';
    window.electron.ipcRenderer.sendMessage('api', {
      status,
      port: Number.parseInt(obsPortRef.current!.value, 10),
    });
  };

  const saveParameters = useCallback(() => {
    setSaved(save);
    if (
      !validForm([
        { ref: activateObsApiRef, translationKey: 'form.label.port' },
        { ref: obsPortRef, translationKey: 'form.label.activateObsApi' },
      ])
    ) {
      return;
    }
    localStorage.set(API_KEY, activateObsApiRef.current?.checked ? 'true' : '');
    localStorage.set(PORT_KEY, obsPortRef.current!.value);
    datasSaved();
    setServerState(activateObsApiRef.current!.checked);
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
        <H3>{t('form.label.obs')}</H3>
      </TitleBox>
      <Grid>
        {t('form.label.activateObsApi')}
        <Input
          type="checkbox"
          title={t('form.tooltip.activateObsApi')}
          defaultChecked={Boolean(localStorage.get(API_KEY))}
          ref={activateObsApiRef}
        />
        {t('form.label.port')}
        <Input
          type="number"
          title={t('form.tooltip.port')}
          defaultValue={localStorage.get(PORT_KEY) || PORT_DEFAULT}
          ref={obsPortRef}
        />
      </Grid>
    </>
  );
}

export default Obs;
