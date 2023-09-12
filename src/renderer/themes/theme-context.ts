import { createContext } from 'react';
import Theme from './enum/theme';

type MyThemeContextType = {
  changeTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<MyThemeContextType | undefined>(undefined);

export default ThemeContext;
