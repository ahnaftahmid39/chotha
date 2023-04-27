import { useTheme } from 'next-themes';
import ChothaBrand from '../svgs/ChothaBrand';
import ChothaBrandDark from '../svgs/ChothaBrandDark';
import { memo } from 'react';

const BrandIcon = memo(({ size = 160 }) => {
  const { theme, systemTheme } = useTheme();

  let logo = null;
  const width = size;
  const height = size * 1.09375;
  
  if (theme == 'system') {
    if (systemTheme == 'dark') {
      logo = <ChothaBrandDark width={width} height={height} />;
    } else {
      logo = <ChothaBrand width={width} height={height} />;
    }
  } else {
    if (theme == 'dark') {
      logo = <ChothaBrandDark width={width} height={height} />;
    } else {
      logo = <ChothaBrand width={width} height={height} />;
    }
  }
  return logo;
});

BrandIcon.displayName = 'BrandIcon';

export default BrandIcon;
