import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  BOTRIX_DEFAULT_ID,
  BOTRIX_ID_KEY,
  USERNAME_PATTERN_DEFAULT,
  USERNAME_PATTERN_KEY,
} from '../consts';
import LocalStorage from '../../../utils/local-storage/local-storage';
import Grid from './components/Grid';
import H3 from './components/H3';
import useValidForm from '../../../hook/useValidForm';
import TitleBox from './components/TitleBox';

type AdvancedProps = {
  save?: number;
  advancedEnabled: boolean;
  setAdvancedEnabled: (enabled: boolean) => void;
  datasSaved: () => void;
};

function Advanced({
  save,
  advancedEnabled,
  setAdvancedEnabled,
  datasSaved,
}: AdvancedProps) {
  const localStorage = useMemo(() => new LocalStorage(), []);
  const { t } = useTranslation('translation');
  const [saved, setSaved] = useState<number>();
  const { validForm } = useValidForm();

  const usernamePatternRef = useRef<HTMLInputElement>(null);
  const botrixIdRef = useRef<HTMLInputElement>(null);
  const enAdvancedRef = useRef<HTMLInputElement>(null);

  const handleAdvanced = () => {
    if (!enAdvancedRef.current) {
      return;
    }
    setAdvancedEnabled(enAdvancedRef.current.checked);
  };

  const saveParameters = useCallback(() => {
    setSaved(save);
    if (
      !validForm([
        {
          ref: usernamePatternRef,
          translationKey: 'form.label.usernamePattern',
        },
        { ref: botrixIdRef, translationKey: 'form.label.botrixId' },
      ])
    ) {
      return;
    }
    const usernamePattern = usernamePatternRef.current?.value || '';
    const botrixId = botrixIdRef.current?.value || '';

    localStorage.set(USERNAME_PATTERN_KEY, usernamePattern);
    localStorage.set(BOTRIX_ID_KEY, botrixId);
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
        <input
          type="checkbox"
          onChange={handleAdvanced}
          ref={enAdvancedRef}
          checked={advancedEnabled}
        />
        <H3 onClick={handleAdvanced}>{t('form.label.advanced')}</H3>
      </TitleBox>
      <Grid>
        {t('form.label.usernamePattern')}
        <input
          type="text"
          title={t('form.tooltip.usernamePattern')}
          defaultValue={
            localStorage.get(USERNAME_PATTERN_KEY) || USERNAME_PATTERN_DEFAULT
          }
          disabled={!advancedEnabled}
          ref={usernamePatternRef}
        />
        {t('form.label.botrixId')}
        <input
          type="number"
          title={t('form.tooltip.idBotrix')}
          defaultValue={localStorage.get(BOTRIX_ID_KEY) || BOTRIX_DEFAULT_ID}
          disabled={!advancedEnabled}
          ref={botrixIdRef}
        />
      </Grid>
    </>
  );
}

export default Advanced;
