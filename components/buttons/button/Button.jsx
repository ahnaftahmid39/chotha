import React from 'react';

import styles from './Button.module.css';

const VARIANTS = {
  default: 'default',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
  info: 'info',
};

const BUTTON_TYPES = {
  filled: 'filled',
  outlined: 'outlined',
};

/**
 * @param buttonType - Button types { "filled" | "outlined" }
 * @param variant - Button variants { "default" | "success" | "danger" | "warning" | "info"}
 * @param className
 * @param type
 * @param onClick
 */
const Button = React.forwardRef(
  (
    {
      children,
      variant = VARIANTS.default,
      buttonType = BUTTON_TYPES.filled,
      className,
      type,
      onClick,
      ...props
    },
    ref
  ) => {
    const tc = buttonType == 'outlined' ? 'outlined' : 'filled';
    const c = className
      ? `${styles['button']} ${styles[tc]} ${className} `
      : `${styles['button']} ${styles[tc]}`;
    return (
      <button
        ref={ref}
        data-variant={variant}
        type={type}
        onClick={onClick}
        className={c}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
