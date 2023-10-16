import { ThemeSwitch } from './ThemeSwitch';

interface Props {
  isDarkTheme: boolean;
  onSetDarkTheme: (isDarkTheme: boolean) => void;
}

export const Header: React.FC<Props> = ({ isDarkTheme, onSetDarkTheme }) => {
  return (
    <>
      <header className='card'>
        <h1>TODO</h1>
        <ThemeSwitch
          isDarkTheme={isDarkTheme}
          onSetDarkTheme={onSetDarkTheme}
        />
      </header>
    </>
  );
};
