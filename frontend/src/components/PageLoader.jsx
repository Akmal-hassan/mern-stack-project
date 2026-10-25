import React from 'react';

export default function PageLoader({
  fullScreen = true,
  message = 'Loading official flagships...',
  size = 'md'
}) {
  const content = (
    <div className={`loader-3d-wrapper loader-3d-${size}`} role="status" aria-live="polite">
      {/* 3D Isometric Rotating Cube Container */}
      <div className="cube-3d-scene">
        <div className="cube-3d">
          <div className="cube-face cube-face-front" />
          <div className="cube-face cube-face-back" />
          <div className="cube-face cube-face-right" />
          <div className="cube-face cube-face-left" />
          <div className="cube-face cube-face-top" />
          <div className="cube-face cube-face-bottom" />
          {/* Glowing Inner Core */}
          <div className="cube-core" />
        </div>
        {/* Dynamic 3D Perspective Shadow */}
        <div className="cube-3d-shadow" />
      </div>

      {/* Brand & Loading Label */}
      <div className="loader-3d-text-group">
        <div className="loader-3d-brand">
          <span className="loader-brand-blue">Blue</span>
          <span className="loader-brand-accent">Bells</span>
        </div>
        <p className="loader-3d-message">{message}</p>
        <div className="loader-3d-bar">
          <div className="loader-3d-bar-fill" />
        </div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="page-loader-overlay">
        {content}
      </div>
    );
  }

  return (
    <div className="inline-loader-container">
      {content}
    </div>
  );
}
