import styles from './Modal.module.css';

const Modal = ({ modal, className, children, ...props }) => {
  if (!modal) return null;
  return (
    <>
      <div className={styles.modalbg}></div>
      <div className={`${className} ${styles.modal}`} {...props}>
        {children}
      </div>
    </>
  );
};

export default Modal;
