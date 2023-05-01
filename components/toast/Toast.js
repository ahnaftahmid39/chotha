import styles from './Toast.module.css';

export const ToastTypes = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

const Toast = ({
  children,
  type = 'info' | 'success' | 'error',
  offsetY = '3rem',
  handleClose = () => {},
  show,
  classname,
  style,
  ...props
}) => {
  return (
    show && (
      <div
        onClick={handleClose}
        aria-label={type}
        style={{ '--offsetY': offsetY, ...style }}
        className={`${styles['wrapper']} ${classname}`}
        {...props}
      >
        {children}
      </div>
    )
  );
};

export default Toast;
