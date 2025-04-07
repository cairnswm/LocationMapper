import React from 'react';

function FullscreenImageModal({ image, onClose }) {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
      style={{ zIndex: 1100 }}
    >
      <div
        className="relative overflow-hidden"
        style={{ maxWidth: '90vw', maxHeight: '90vh' }}
      >
        <img
          src={image}
          alt="Fullscreen"
          className="object-cover"
          style={{ height: "auto", width: "auto", maxWidth: '90vw', maxHeight: '90vh' }}
        />
        <button
          type="button"
          className="absolute top-2 right-2 bg-white text-white text-lg rounded-full w-8 h-8 flex items-center justify-center"
          onClick={onClose}
          style={{
            position: 'absolute',
            zIndex: 1200,
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default FullscreenImageModal;
