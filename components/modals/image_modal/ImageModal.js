import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import styles from './ImageModal.module.css';
import CloseButton from '../../buttons/close_button/CloseButton';
import { useState } from 'react';
const ImageModal = ({ modal, className, src, alt, setImgModal, ...props }) => {
  if (!modal) return null;
  return (
    <>
      <span className={styles.modalbg}></span>
      <span className={`${className} ${styles.modal}`} {...props}>
        <TransformWrapper centerOnInit initialScale={1} minScale={0.05}>
          {({ resetTransform, zoomIn, zoomOut }) => {
            return (
              <div>
                <span className={`btn-group ${styles['modal-btn']}`}>
                  <button
                    onClick={() => resetTransform()}
                    className={`btn btn-blur`}
                  >
                    Original Size
                  </button>
                  <button
                    onClick={() => zoomIn(0.1)}
                    className={`btn btn-blur`}
                  >
                    [ + ]
                  </button>
                  <button
                    onClick={() => zoomOut(0.1)}
                    className={`btn btn-blur`}
                  >
                    [ - ]
                  </button>
                  <CloseButton
                    onClick={() => setImgModal(false)}
                    color={'white'}
                    className={`btn btn-blur`}
                  />
                </span>
                <TransformComponent
                  wrapperStyle={{
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}
                  contentStyle={{ cursor: 'grab' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={alt} src={`${src}`} />
                </TransformComponent>
              </div>
            );
          }}
        </TransformWrapper>
      </span>
    </>
  );
};

export default ImageModal;
