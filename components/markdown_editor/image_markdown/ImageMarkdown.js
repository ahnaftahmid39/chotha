// import dynamic from 'next/dynamic';
import React, { useState } from 'react';
// const ImageModal = dynamic(
//   () => {
//     return import('../../modals/image_modal/ImageModal');
//   },
//   { ssr: false }
// );
import ImageModal from '../../modals/image_modal/ImageModal';

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
        {alt != '' && `Figure: ${alt}`}
      </span>

      <ImageModal
        modal={imgModal}
        src={src}
        alt={alt}
        setImgModal={setImgModal}
      />
    </span>
  );
});

ImageMarkdown.displayName = 'ImageMarkdown';

export default ImageMarkdown;
