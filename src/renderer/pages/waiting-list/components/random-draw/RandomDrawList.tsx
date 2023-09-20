import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserDto } from '../list/dto/user.dto';
import UsersList from '../list/UsersList';
import RandomDraw from '../../../../utils/random/random-draw';
import RandomDrawListHeader from './RandomDrawListHeader';
import ConfirmModal from '../../../../components/modal/ConfirmModal';
import LocalStorage from '../../../../utils/local-storage/local-storage';

export const DRAW_LIST_KEY = 'drawList';

type RandomDrawListProps = {
  usersList: UserDto[];
};

const localStorage = new LocalStorage();

function RandomDrawList({ usersList }: RandomDrawListProps) {
  const { t } = useTranslation('translation');
  const [result, setResult] = useState<UserDto[]>([]);
  const [open, setOpen] = useState(false);
  const [numberOfDraws, setNumberOfDraws] = useState<number>(0);

  const handleClick = (numOfDraws: number) => {
    setNumberOfDraws(numOfDraws);
    if (result.length > 0 && !open) {
      setOpen(true);
      return;
    }
    setResult(RandomDraw<UserDto>(usersList, numOfDraws));
  };

  const handleConfirmDialog = (accept: boolean) => {
    setOpen(false);
    if (!accept) {
      return;
    }
    handleClick(numberOfDraws);
  };

  useEffect(() => {
    if (localStorage.has(DRAW_LIST_KEY)) {
      setResult(JSON.parse(localStorage.get(DRAW_LIST_KEY)));
    }
  }, []);

  useEffect(() => {
    localStorage.set(DRAW_LIST_KEY, JSON.stringify(result));
  }, [result]);

  return (
    <>
      <ConfirmModal
        title={t('confirm.clearList.title')}
        open={open}
        close={handleConfirmDialog}
        confirmMessage={t('confirm.clearList.content')}
      />
      <RandomDrawListHeader onClick={handleClick} />
      <UsersList users={result} prefixNumber />
    </>
  );
}

export default RandomDrawList;
