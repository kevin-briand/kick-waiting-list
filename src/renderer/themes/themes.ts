import ThemeDto from './dto/theme.dto';

export const lightTheme: ThemeDto = {
  primary: '#D2D6DC',
  secondary: '#636365',
  tertiary: '#97978D',
  text: 'white',
  button: {
    default: {
      base: '#669bbc',
      hover: '#669bbc',
      active: '#29335c',
    },
    success: {
      base: '#8ea604',
      hover: '#8ea604',
      active: 'darkgreen',
    },
    error: {
      base: '#f71735',
      hover: '#f71735',
      active: 'darkred',
    },
  },
};

export const darkTheme: ThemeDto = {
  primary: '#2B2F35',
  secondary: '#C1C1C3',
  tertiary: '#69696C',
  text: 'white',
  button: {
    default: {
      base: '#669bbc',
      hover: '#669bbc',
      active: '#29335c',
    },
    success: {
      base: '#8ea604',
      hover: '#8ea604',
      active: 'darkgreen',
    },
    error: {
      base: '#f71735',
      hover: '#f71735',
      active: 'darkred',
    },
  },
};
