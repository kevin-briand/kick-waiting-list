import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import React, { FormEvent, useRef } from 'react';
import ButtonSave from '../../../../components/button/ButtonSave';
import CenteredFlexBox from '../CenteredFlexBox';

const Form = styled.form`
  display: flex;
  gap: 5px;
`;

const Span = styled.span`
  align-self: center;
`;

type RandomDrawListHeaderProps = {
  onClick: (numberOfDraws: number) => void;
};

function RandomDrawListHeader({ onClick }: RandomDrawListHeaderProps) {
  const { t } = useTranslation('translation');
  const limitRef = useRef<HTMLInputElement>(null);

  const handleForm = (ev: FormEvent) => {
    ev.preventDefault();
    onClick(Number.parseInt(limitRef.current?.value ?? '3', 10));
  };

  return (
    <CenteredFlexBox>
      <Form onSubmit={handleForm}>
        <Span>{t('form.limit')}</Span>
        <input type="number" defaultValue={3} ref={limitRef} />
        <ButtonSave>{t('button.draw')}</ButtonSave>
      </Form>
    </CenteredFlexBox>
  );
}

export default RandomDrawListHeader;
