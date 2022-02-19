import styles from './ThemeSwitchButton.module.css';
import { useTheme } from 'next-themes';

/*
  NGL, style for this button was inspired from reactnavigation.org, But I implemented it myself.
*/
const ThemeSwitchButton = ({}) => {
  const { theme, setTheme } = useTheme();
  const handleThemeChange = () => {
    if (theme != 'dark') setTheme('dark');
    else setTheme('light');
  };
  return (
    <div className={styles['parent']} onClick={handleThemeChange}>
      <svg
        width={16}
        height={16}
        viewBox='0 0 183 183'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M91.5 0L111.293 30.5848L145.282 17.4749L143.318 53.8524L178.522 63.2249L155.55 91.5L178.522 119.775L143.318 129.148L145.282 165.525L111.293 152.415L91.5 183L71.7075 152.415L37.7176 165.525L39.6825 129.148L4.47833 119.775L27.45 91.5L4.47833 63.2249L39.6825 53.8524L37.7176 17.4749L71.7075 30.5848L91.5 0Z'
          fill='#FFE177'
        />
        <circle cx='91' cy='91' r='72' fill='#FFC700' />
      </svg>
      <svg
        width={16}
        height={16}
        viewBox='0 0 116 124'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0.770294 104.23C7.42948 110.889 15.4085 116.081 24.1942 119.472C32.98 122.863 42.3782 124.378 51.7845 123.92C61.1909 123.462 70.3973 121.04 78.8118 116.811C87.2264 112.582 94.6629 106.639 100.643 99.3641C106.624 92.0892 111.015 83.6433 113.536 74.5695C116.058 65.4957 116.652 55.9947 115.281 46.6775C113.911 37.3602 110.606 28.4328 105.579 20.4692C100.552 12.5056 93.9144 5.68197 86.0926 0.437103L88.4687 14.9519C96.9415 66.7085 52.6699 111.777 0.770294 104.23V104.23Z'
          fill='#A6C4FF'
        />
      </svg>
      <div className={styles['thumb']}></div>
    </div>
  );
};

export default ThemeSwitchButton;
