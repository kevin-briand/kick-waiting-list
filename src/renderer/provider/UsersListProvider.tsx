import React, {
  createContext,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { UserDto } from '../pages/waiting-list/components/list/dto/user.dto';
import Config from '../utils/config/config';
import useAlertInfo from '../hook/useAlertInfo';
import useAlertError from '../hook/useAlertError';
import UserDtoFixture from '../utils/helpers/fixture/user-dto.fixture';
import UserStatus from '../pages/waiting-list/components/list/enum/user-status';

type UserType = {
  usersList: UserDto[];
  addUser: (user: UserDto) => void;
  deleteUser: (user: string) => void;
  clearList: () => void;
  fakeUsersList: () => void;
  handleNextViewers: () => void;
  handleUserGoingLive: (user: UserDto) => void;
  acceptNewUser: boolean;
  toggleAcceptNewUser: () => void;
};

export const UsersListContext = createContext<UserType>({
  usersList: [],
  addUser: () => null,
  deleteUser: () => null,
  clearList: () => null,
  fakeUsersList: () => null,
  handleNextViewers: () => null,
  handleUserGoingLive: () => null,
  acceptNewUser: false,
  toggleAcceptNewUser: () => null,
});

type UserListProviderProps = {
  children: ReactElement;
};

export function UserListProvider({ children }: UserListProviderProps) {
  const [usersList, setUsersList] = useState<UserDto[]>([]);
  const [openList, setOpenList] = useState<boolean>(false);
  const config = useMemo(() => new Config().getConfig(), []);
  const usersListRef = useRef(usersList);
  const setAlertInfo = useAlertInfo();
  const setAlertError = useAlertError();

  const addUser = useCallback(
    (user: UserDto) => {
      if (!usersList.some((u) => u.username === user.username)) {
        setUsersList((prevState) => [...prevState, user]);
        setAlertInfo('user.added', user);
      }
    },
    [setAlertInfo, setUsersList, usersList]
  );

  const deleteUser = useCallback(
    (user: string) => {
      setUsersList((prevState) => {
        return prevState.filter((u) => u.username !== user);
      });
    },
    [setUsersList]
  );

  const clearList = useCallback(() => {
    setUsersList([]);
  }, [setUsersList]);

  const fakeUsersList = () => {
    const fakeUsers: UserDto[] = [];
    for (let i = 0; i < 50; i += 1) {
      fakeUsers.push(UserDtoFixture());
    }
    setUsersList(fakeUsers);
  };

  const toggleAcceptNewUser = () => setOpenList((prevState) => !prevState);

  const handleNextViewers = useCallback(() => {
    const filteredUsersList = usersList.filter(
      (user) => user.status !== UserStatus.LIVE
    );
    const updatedUsersList = filteredUsersList.map((user, index) => {
      if (index < config.viewersLive) {
        return { username: user.username, status: UserStatus.LIVE };
      }
      return user;
    });
    setUsersList(updatedUsersList);
  }, [config.viewersLive, setUsersList, usersList]);

  const handleUserGoingLive = useCallback(
    (user: UserDto) => {
      if (user.status === UserStatus.LIVE) {
        return;
      }
      if (
        usersList.filter(
          (currentUser) => currentUser.status === UserStatus.LIVE
        ).length >= config.viewersLive
      ) {
        setAlertError('error.liveFull', { nb: config.viewersLive });
        return;
      }
      const updatedUser = {
        username: user.username,
        status: UserStatus.LIVE,
      };
      const updatedUsersList = usersList.map((currentUser) => {
        if (currentUser.username === user.username) {
          return updatedUser;
        }
        return currentUser;
      });
      const finalList = updatedUsersList.sort(
        (userA, userB) => userB.status - userA.status
      );
      setUsersList(finalList);
    },
    [config.viewersLive, setAlertError, setUsersList, usersList]
  );

  useEffect(() => {
    const previousUsers = usersListRef.current;

    if (previousUsers.length > usersList.length) {
      const deletedUser = previousUsers.find(
        (prevUser) =>
          !usersList.some(
            (currentUser) => currentUser.username === prevUser.username
          )
      );

      if (deletedUser) {
        setAlertInfo('user.deleted', deletedUser);
      }
    }

    if (previousUsers.length < usersList.length) {
      const addedUser = usersList.find(
        (currentUser) =>
          !previousUsers.some(
            (prevUser) => prevUser.username === currentUser.username
          )
      );

      if (addedUser) {
        setAlertInfo('user.added', addedUser);
      }
    }

    usersListRef.current = usersList;
  }, [usersList, setAlertInfo]);

  const userListMemo = useMemo(() => {
    return {
      usersList,
      addUser,
      deleteUser,
      clearList,
      fakeUsersList,
      handleNextViewers,
      handleUserGoingLive,
      acceptNewUser: openList,
      toggleAcceptNewUser,
    } as UserType;
  }, [
    addUser,
    clearList,
    deleteUser,
    handleNextViewers,
    handleUserGoingLive,
    openList,
    usersList,
  ]);

  return (
    <UsersListContext.Provider value={userListMemo}>
      {children}
    </UsersListContext.Provider>
  );
}
