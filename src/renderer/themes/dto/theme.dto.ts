type ThemeDto = {
  colors: {
    text: {
      light: string;
      dark: string;
    };
    header: string;
    border: string;
    shadow: string;
    backgroundModal: string;
    buttons: {
      default: string;
      error: string;
      success: string;
      disabled: string;
    };
    background: {
      light: string;
      dark: string;
    };
  };
};

export default ThemeDto;
