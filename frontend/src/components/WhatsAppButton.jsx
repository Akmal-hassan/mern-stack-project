import React, { useState } from 'react';

/**
 * Floating WhatsApp Button positioned in the bottom-right corner
 * Direct connection to Blue Bells Electronics WhatsApp: 03005902425
 */
export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '923005902425';
  const defaultMessage = encodeURIComponent('Hello Blue Bells Electronics! I would like to inquire about an iPhone / Samsung product.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside aria-label="Customer WhatsApp Support" className="floating-whatsapp-container">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat directly on WhatsApp with Blue Bells Electronics at 03005902425"
      >
        {/* Animated Ripple Pulse Rings */}
        <span className="floating-whatsapp-pulse" />
        <span className="floating-whatsapp-pulse-second" />

        {/* WhatsApp Official SVG Icon */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="floating-whatsapp-icon"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 2C8.268 2 2 8.268 2 16C2 18.618 2.716 21.072 3.96 23.18L2.096 29.356C1.986 29.724 2.084 30.122 2.35 30.394C2.552 30.602 2.83 30.712 3.116 30.712C3.218 30.712 3.322 30.698 3.424 30.666L9.848 28.662C11.724 29.626 13.824 30.144 16 30.144C23.732 30.144 30 23.876 30 16.144C30 8.412 23.732 2 16 2ZM22.84 20.354C22.56 21.144 21.464 21.782 20.584 21.972C19.984 22.1 19.208 22.202 16.574 21.11C13.208 19.714 11.042 16.292 10.874 16.07C10.712 15.848 9.512 14.254 9.512 12.606C9.512 10.958 10.35 10.158 10.686 9.814C10.966 9.528 11.428 9.4 11.876 9.4C12.022 9.4 12.156 9.408 12.278 9.414C12.638 9.43 12.82 9.452 13.056 10.016C13.35 10.72 14.066 12.472 14.152 12.65C14.242 12.828 14.308 13.048 14.196 13.27C14.09 13.498 14.024 13.582 13.868 13.766C13.712 13.948 13.568 14.092 13.4 14.304C13.244 14.492 13.066 14.696 13.256 15.022C13.446 15.344 14.102 16.414 15.074 17.28C16.326 18.396 17.348 18.75 17.684 18.892C17.936 19 18.236 18.976 18.416 18.784C18.644 18.536 18.928 18.128 19.248 17.676C19.476 17.354 19.762 17.31 20.06 17.42C20.366 17.526 22.002 18.332 22.338 18.5C22.674 18.67 22.898 18.754 22.982 18.898C23.066 19.048 23.066 19.722 22.84 20.354Z"
            fill="#FFFFFF"
          />
        </svg>

        {/* Floating Tooltip Label (Desktop Friendly) */}
        <span className="floating-whatsapp-label">
          <span>Chat on WhatsApp</span>
          <span className="floating-whatsapp-number">03005902425</span>
        </span>
      </a>
    </aside>
  );
}
