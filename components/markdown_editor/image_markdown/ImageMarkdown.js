import React, { useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import CloseButton from '../../buttons/close_button/CloseButton';
import ImageModal from '../../modals/image_modal/ImageModal';
import styles from './ImageMarkdown.module.css';

const ImageMarkdown = React.memo(({ src, alt }) => {
  const [imgModal, setImgModal] = useState(false);

  return (
    <span style={{ display: 'grid', placeItems: 'center' }}>
      <img
        onClick={(e) => {
          setImgModal(true);
        }}
        src={src}
        alt={alt}
        style={{
          maxWidth: '100%',
          objectFit: 'contain',
          cursor: 'pointer',
        }}
        height='auto'
      />
      <span
        style={{
          textAlign: 'center',
          display: 'block',
          fontStyle: 'italic',
        }}
      >
        Figure: {alt}
      </span>
      {imgModal && (
        <ImageModal modal={imgModal}>
          <TransformWrapper
            initialPositionX={200}
            initialPositionY={100}
            centerOnInit
            initialScale={1}
            minScale={0.05}
          >
            {({ resetTransform, zoomIn, zoomOut }) => {
              return (
                <>
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
                    <img alt='' src={`${src}`} />
                  </TransformComponent>
                </>
              );
            }}
          </TransformWrapper>
        </ImageModal>
      )}
    </span>
  );
});

ImageMarkdown.displayName = 'ImageMarkdown';

export default ImageMarkdown;
