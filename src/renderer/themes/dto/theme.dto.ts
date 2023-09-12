type ThemeDto = {
  primary: string;
  secondary: string;
  tertiary: string;
  text: string;
  button: {
    default: {
      base: string;
      hover: string;
      active: string;
    };
    success: {
      base: string;
      hover: string;
      active: string;
    };
    error: {
      base: string;
      hover: string;
      active: string;
    };
  };
};

export default ThemeDto;
