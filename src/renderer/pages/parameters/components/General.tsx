import i18n from 'i18next';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_DEFAULT, LANGUAGE_KEY, THEME_KEY } from '../consts';
import AVAILABLE_LANGUAGES from '../../../utils/locale/available_languages';
import Theme from '../../../themes/enum/theme';
import LocalStorage from '../../../utils/local-storage/local-storage';
import themeContext from '../../../themes/theme-context';
import Grid from './components/Grid';
import TitleBox from './components/TitleBox';
import H3 from './components/H3';
import useValidForm from '../../../hook/useValidForm';

type GeneralProps = {
  save?: number;
  datasSaved: () => void;
};

function General({ save, datasSaved }: GeneralProps) {
  const localStorage = useMemo(() => new LocalStorage(), []);
  const { t } = useTranslation('translation');
  const [saved, setSaved] = useState<number>();
  const { validForm } = useValidForm();

  const languageRef = useRef<HTMLSelectElement>(null);
  const themeRef = useRef<HTMLSelectElement>(null);
  const theme = useContext(themeContext);

  const saveParameters = useCallback(() => {
    setSaved(save);
    if (
      !validForm([
        { ref: languageRef, translationKey: 'form.label.language' },
        { ref: themeRef, translationKey: 'form.label.theme' },
      ])
    ) {
      return;
    }
    localStorage.set(LANGUAGE_KEY, languageRef.current!.value);
    localStorage.set(THEME_KEY, themeRef.current!.value);
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
        <H3>{t('form.label.general')}</H3>
      </TitleBox>
      <Grid>
        {t('form.label.language')}
        <select
          ref={languageRef}
          defaultValue={localStorage.get(LANGUAGE_KEY) ?? LANGUAGE_DEFAULT}
          onChange={(event) => i18n.changeLanguage(event.target.value)}
        >
          {AVAILABLE_LANGUAGES.map((language) => (
            <option key={language.value} value={language.value}>
              {language.name}
            </option>
          ))}
        </select>
        {t('form.label.theme')}
        <select
          ref={themeRef}
          defaultValue={localStorage.get(THEME_KEY) ?? Theme.LIGHT.toString()}
          onChange={(event) => {
            const selectedValue = Number.parseInt(event.target.value, 10);
            if (!Number.isNaN(selectedValue) && selectedValue in Theme) {
              theme?.changeTheme(selectedValue);
            }
          }}
        >
          {Object.entries(Theme).map(([key, value]) => {
            if (Number.isNaN(Number.parseInt(key, 10))) {
              return (
                <option key={value} value={value.toString()}>
                  {key.toLowerCase()}
                </option>
              );
            }
            return null;
          })}
        </select>
      </Grid>
    </>
  );
}

export default General;
