interface Props {
  isDarkTheme: boolean;
  onSetDarkTheme: (isDarkTheme: boolean) => void;
}

export const ThemeSwitch: React.FC<Props> = ({
  isDarkTheme,
  onSetDarkTheme,
}) => {
  return (
    <button
      onClick={() => {
        onSetDarkTheme(!isDarkTheme);
      }}
    >
      <img
        src={
          isDarkTheme
            ? '/assets/icons/icon-sun.svg'
            : '/assets/icons/icon-moon.svg'
        }
        alt='Change color theme'
      />
    </button>
  );
};
