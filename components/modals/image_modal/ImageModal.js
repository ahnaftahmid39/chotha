import styles from './ImageModal.module.css';
const ImageModal = ({ modal, className, children, closeModal, ...props }) => {
  return (
    <span hidden={!modal}>
      <span className={styles.modalbg}></span>
      <span className={`${className} ${styles.modal}`} {...props}>
        {children}
      </span>
    </span>
  );
};

export default ImageModal;
