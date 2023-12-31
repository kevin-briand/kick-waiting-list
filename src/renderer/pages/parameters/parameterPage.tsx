import styled from 'styled-components';
import React, { FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../../components/Container';
import useAlertInfo from '../../hook/useAlertInfo';
import ButtonSave from '../../components/button/ButtonSave';
import General from './components/General';
import UserInfo from './components/UserInfo';
import MessagePattern from './components/MessagePattern';
import Advanced from './components/Advanced';
import FixedWidthFlexBox from './components/components/FixedWidthFlexBox';
import Obs from './components/obs';
import Viewers from './components/Viewers';
import useAppWebSocket from '../../hook/useAppWebSocket';
import Config from '../../utils/config/config';

const BoutonBox = styled(FixedWidthFlexBox)`
  justify-content: center;
`;

const FORM_SECTION_COUNT = 6;

function ParameterPage() {
  const { t } = useTranslation('translation');
  const [advancedEnabled, setAdvancedEnabled] = useState<boolean>(false);
  const setAlertInfo = useAlertInfo();
  const [save, setSave] = useState<number | undefined>(undefined);
  const [saveCounter, setSaveCounter] = useState<number>(0);
  const { sendMessage } = useAppWebSocket();

  const datasSaved = () => {
    setSaveCounter((prevState) => prevState + 1);
  };

  const handleForm = (ev: FormEvent) => {
    ev.preventDefault();
    setSaveCounter(0);
    setSave(Date.now());
  };

  useEffect(() => {
    if (saveCounter === FORM_SECTION_COUNT) {
      setSaveCounter(0);
      sendMessage(new Config().getConfig());
      setAlertInfo('form.saved');
    }
  }, [saveCounter, sendMessage, setAlertInfo]);

  return (
    <Container>
      <form onSubmit={handleForm}>
        <General save={save} datasSaved={datasSaved} />
        <UserInfo
          save={save}
          advancedEnabled={advancedEnabled}
          datasSaved={datasSaved}
        />
        <MessagePattern save={save} datasSaved={datasSaved} />
        <Viewers save={save} datasSaved={datasSaved} />
        <Obs save={save} datasSaved={datasSaved} />
        <Advanced
          save={save}
          advancedEnabled={advancedEnabled}
          setAdvancedEnabled={setAdvancedEnabled}
          datasSaved={datasSaved}
        />
        <BoutonBox>
          <ButtonSave type="submit">{t('form.label.save')}</ButtonSave>
        </BoutonBox>
      </form>
    </Container>
  );
}

export default ParameterPage;
