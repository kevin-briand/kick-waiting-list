import { useContext } from 'react';
import { UsersListContext } from '../provider/UsersListProvider';

function useUsersList() {
  return useContext(UsersListContext);
}

export default useUsersList;
