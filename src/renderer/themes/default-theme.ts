import ThemeDto from './dto/theme.dto';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeDto {}
}
