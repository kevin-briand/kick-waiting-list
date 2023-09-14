import ThemeDto from './dto/theme.dto';

export const lightTheme: ThemeDto = {
  colors: {
    text: {
      light: '#FFF',
      dark: '#636365',
    },
    header: '#636365',
    border: '#000',
    shadow: '#000',
    backgroundModal: 'rgba(210, 214, 220, 0.3)',
    buttons: {
      default: '#669bbc',
      error: '#f71735',
      success: '#8ea604',
    },
    background: {
      light: '#D2D6DC',
      dark: '#222',
    },
  },
};

export const darkTheme: ThemeDto = {
  colors: {
    text: {
      light: '#222',
      dark: '#CCC',
    },
    header: '#222',
    border: '#97978D',
    shadow: '#CCC',
    backgroundModal: 'rgba(190, 194, 200, 0.3)',
    buttons: {
      default: '#4c7a99',
      error: '#9a1023',
      success: '#6d7f04',
    },
    background: {
      light: '#333',
      dark: 'rgb(210, 214, 220)',
    },
  },
};
