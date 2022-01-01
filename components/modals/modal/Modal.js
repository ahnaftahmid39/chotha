import styles from './Modal.module.css';

const Modal = ({ modal, className, children, ...props }) => {
  return (
    <div hidden={!modal}>
      <div className={styles.modalbg}></div>
      <div className={`${className} ${styles.modal}`} {...props}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
