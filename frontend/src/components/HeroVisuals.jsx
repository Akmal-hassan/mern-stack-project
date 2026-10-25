import React from 'react';

/**
 * High-fidelity, scalable vector product graphics with metallic textures,
 * camera lens reflections, glass gloss, and vibrant flagship displays.
 * Self-contained without external image dependencies for 100% reliability.
 */

// Slide 1: iPad Pro with Magic Keyboard & Apple Pencil
export function IPadProVisual({ className = '' }) {
  return (
    <div className={`hero-visual-wrapper ${className}`}>
      <svg
        viewBox="0 0 680 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-svg-graphic"
        style={{ width: '100%', height: 'auto', maxHeight: '460px', filter: 'drop-shadow(0 25px 45px rgba(0,0,0,0.45))' }}
      >
        <defs>
          <linearGradient id="ipadBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D333B" />
            <stop offset="50%" stopColor="#1C2128" />
            <stop offset="100%" stopColor="#0F141C" />
          </linearGradient>
          <linearGradient id="ipadBezel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14181E" />
            <stop offset="100%" stopColor="#0B0D11" />
          </linearGradient>
          <linearGradient id="ipadScreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="25%" stopColor="#2563EB" />
            <stop offset="55%" stopColor="#7C3AED" />
            <stop offset="80%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="keyboardDeck" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#22272E" />
            <stop offset="100%" stopColor="#181C22" />
          </linearGradient>
          <linearGradient id="pencilBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F3F4F6" />
            <stop offset="100%" stopColor="#E5E7EB" />
          </linearGradient>
          <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient back shadow / pedestal */}
        <ellipse cx="340" cy="480" rx="260" ry="24" fill="rgba(0,0,0,0.5)" filter="url(#softGlow)" />

        {/* --- MAGIC KEYBOARD BASE --- */}
        {/* Cantilever spine */}
        <path d="M220 340 L460 340 L445 375 L235 375 Z" fill="#2D333B" stroke="#3D444D" strokeWidth="1" />
        {/* Base deck */}
        <polygon points="110,465 570,465 520,380 160,380" fill="url(#keyboardDeck)" stroke="#30363D" strokeWidth="1.5" />
        {/* Trackpad */}
        <rect x="280" y="425" width="120" height="32" rx="4" fill="#1C2128" stroke="#374151" strokeWidth="1" />
        
        {/* Keyboard keys row simulation */}
        <g fill="#14181F" stroke="#252A32" strokeWidth="0.8" rx="2">
          {/* Row 1 */}
          <rect x="175" y="386" width="330" height="7" rx="2" fill="#191F26" />
          {/* Row 2 */}
          <rect x="170" y="396" width="340" height="8" rx="2" fill="#191F26" />
          {/* Row 3 */}
          <rect x="165" y="407" width="350" height="9" rx="2" fill="#191F26" />
        </g>

        {/* --- FLOATING IPAD PRO DISPLAY --- */}
        <g transform="translate(0, -20)">
          {/* Outer aluminum chassis */}
          <rect x="145" y="75" width="390" height="275" rx="26" fill="url(#ipadBody)" stroke="#484F58" strokeWidth="2" />
          {/* Gloss chamfer border */}
          <rect x="148" y="78" width="384" height="269" rx="23" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          {/* Black bezel */}
          <rect x="156" y="86" width="368" height="253" rx="18" fill="url(#ipadBezel)" />

          {/* ULTRA RETINA XDR DISPLAY */}
          <rect x="164" y="94" width="352" height="237" rx="14" fill="url(#ipadScreen)" />

          {/* Screen artwork dynamic curves */}
          <path
            d="M164 190 Q240 130 340 210 T516 160 L516 331 L164 331 Z"
            fill="url(#ipadScreen)"
            opacity="0.85"
            style={{ mixBlendMode: 'overlay' }}
          />
          <path
            d="M164 260 C260 210 320 310 420 250 C470 220 500 240 516 260 L516 331 L164 331 Z"
            fill="#3B82F6"
            opacity="0.7"
          />
          <ellipse cx="360" cy="180" rx="120" ry="70" fill="url(#screenGlow)" />

          {/* Front camera & Face ID array */}
          <circle cx="340" cy="90" r="2.5" fill="#1E293B" stroke="#334155" strokeWidth="0.5" />
          <circle cx="340" cy="90" r="1.2" fill="#0284C7" />

          {/* Screen glare gloss diagonal */}
          <path
            d="M164 94 L320 94 L164 260 Z"
            fill="rgba(255,255,255,0.08)"
          />

          {/* M4 Badge on Screen */}
          <g transform="translate(436, 108)">
            <rect width="64" height="26" rx="6" fill="rgba(15,23,42,0.75)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <text x="32" y="17" fill="#FFFFFF" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="1">M4 PRO</text>
          </g>
        </g>

        {/* --- APPLE PENCIL PRO (Magnetically Attached on Top) --- */}
        <g transform="translate(230, 42)">
          <rect x="0" y="0" width="220" height="9" rx="4.5" fill="url(#pencilBody)" stroke="#CBD5E1" strokeWidth="0.8" />
          {/* Pencil tip */}
          <polygon points="220,0 232,4.5 220,9" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.5" />
          <polygon points="230,3.7 234,4.5 230,5.3" fill="#64748B" />
          {/* Magnetic ring line */}
          <line x1="20" y1="0" x2="20" y2="9" stroke="#94A3B8" strokeWidth="1" />
          {/* Tiny Apple logo icon */}
          <text x="35" y="7" fill="#475569" fontSize="6" fontWeight="700"> Pencil Pro</text>
        </g>
      </svg>
    </div>
  );
}

// Slide 2: iPhone 18 Pro Max (Titanium Blue - Front & Back Duo)
export function IPhone18ProMaxVisual({ className = '' }) {
  return (
    <div className={`hero-visual-wrapper ${className}`}>
      <svg
        viewBox="0 0 680 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-svg-graphic"
        style={{ width: '100%', height: 'auto', maxHeight: '460px', filter: 'drop-shadow(0 25px 45px rgba(0,0,0,0.5))' }}
      >
        <defs>
          <linearGradient id="tiBlueChassis" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="30%" stopColor="#1D4ED8" />
            <stop offset="70%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#0B132B" />
          </linearGradient>
          <linearGradient id="tiBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
          <linearGradient id="screen18" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="40%" stopColor="#1E3A8A" />
            <stop offset="80%" stopColor="#090D16" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="cameraPlate" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <radialGradient id="lensGlass" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="40%" stopColor="#1E3A8A" />
            <stop offset="85%" stopColor="#0A0F1D" />
            <stop offset="100%" stopColor="#020408" />
          </radialGradient>
        </defs>

        {/* Ambient base shadow */}
        <ellipse cx="340" cy="485" rx="280" ry="22" fill="rgba(0,0,0,0.55)" filter="blur(10px)" />

        {/* === DEVICE 1: REAR VIEW (Angled Left) === */}
        <g transform="translate(140, 50) rotate(-6, 120, 200)">
          {/* Chassis */}
          <rect x="0" y="0" width="210" height="410" rx="36" fill="url(#tiBlueChassis)" stroke="url(#tiBorder)" strokeWidth="2.5" />
          {/* Frosted glass inner matte */}
          <rect x="4" y="4" width="202" height="402" rx="32" fill="#152445" opacity="0.6" />
          {/* Metallic Apple Logo */}
          <path
            d="M105 185 C108 185 111 183 114 183 C117 183 120 185 123 185 C127 185 131 181 133 177 C128 174 125 169 125 163 C125 156 130 151 135 149 C131 144 125 143 121 143 C116 143 113 145 110 145 C107 145 103 143 99 143 C91 143 83 149 83 161 C83 173 90 185 96 185 C100 185 102 185 105 185 Z M115 141 C117 138 118 134 118 130 C114 130 110 133 108 136 C106 139 105 143 105 147 C109 147 113 144 115 141 Z"
            fill="rgba(255,255,255,0.75)"
          />

          {/* Camera Plateau */}
          <rect x="12" y="16" width="94" height="106" rx="22" fill="url(#cameraPlate)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
          
          {/* Lens 1 (Top Left) */}
          <circle cx="44" cy="46" r="21" fill="#0B132B" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="44" cy="46" r="16" fill="url(#lensGlass)" />
          <circle cx="40" cy="42" r="4" fill="rgba(255,255,255,0.6)" />

          {/* Lens 2 (Bottom Left) */}
          <circle cx="44" cy="90" r="21" fill="#0B132B" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="44" cy="90" r="16" fill="url(#lensGlass)" />
          <circle cx="40" cy="86" r="4" fill="rgba(255,255,255,0.6)" />

          {/* Lens 3 (Right Middle) */}
          <circle cx="78" cy="68" r="21" fill="#0B132B" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="78" cy="68" r="16" fill="url(#lensGlass)" />
          <circle cx="74" cy="64" r="4" fill="rgba(255,255,255,0.6)" />

          {/* TrueTone Flash */}
          <circle cx="78" cy="34" r="7" fill="#FDE047" opacity="0.8" stroke="#CA8A04" strokeWidth="1" />
          {/* LiDAR Sensor */}
          <circle cx="78" cy="102" r="5" fill="#1E293B" stroke="#475569" strokeWidth="0.8" />
        </g>

        {/* === DEVICE 2: FRONT VIEW (Forward Right) === */}
        <g transform="translate(320, 35) rotate(4, 110, 200)">
          {/* Chassis */}
          <rect x="0" y="0" width="216" height="422" rx="38" fill="#0F172A" stroke="url(#tiBorder)" strokeWidth="2.5" />
          {/* Display bezel */}
          <rect x="5" y="5" width="206" height="412" rx="33" fill="#020617" />

          {/* OLED Screen */}
          <rect x="8" y="8" width="200" height="406" rx="30" fill="url(#screen18)" />

          {/* Screen fluid abstract art */}
          <path
            d="M8 140 Q100 80 160 170 T208 260 L208 414 L8 414 Z"
            fill="#1D4ED8"
            opacity="0.6"
          />
          <circle cx="108" cy="220" r="70" fill="#38BDF8" opacity="0.35" filter="blur(16px)" />

          {/* Dynamic Island Pill */}
          <rect x="74" y="16" width="68" height="18" rx="9" fill="#000000" stroke="#1E293B" strokeWidth="0.8" />
          <circle cx="86" cy="25" r="3.5" fill="#0A0F1D" />
          <circle cx="122" cy="25" r="2.5" fill="#0284C7" />

          {/* Lock Screen Time / Status */}
          <text x="108" y="70" fill="#FFFFFF" fontSize="34" fontWeight="800" textAnchor="middle" letterSpacing="-1">09:41</text>
          <text x="108" y="88" fill="#93C5FD" fontSize="10" fontWeight="600" textAnchor="middle" letterSpacing="0.5">Apple Intelligence Ready</text>

          {/* Bottom gesture bar */}
          <rect x="73" y="400" width="70" height="3.5" rx="1.75" fill="#FFFFFF" opacity="0.8" />

          {/* Diagonal glass gloss reflection */}
          <path d="M8 8 L110 8 L8 220 Z" fill="rgba(255,255,255,0.08)" />
        </g>
      </svg>
    </div>
  );
}

// Slide 3: Samsung Galaxy S24 Ultra with S-Pen
export function GalaxyS24UltraVisual({ className = '' }) {
  return (
    <div className={`hero-visual-wrapper ${className}`}>
      <svg
        viewBox="0 0 680 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-svg-graphic"
        style={{ width: '100%', height: 'auto', maxHeight: '460px', filter: 'drop-shadow(0 25px 45px rgba(0,0,0,0.5))' }}
      >
        <defs>
          <linearGradient id="s24Frame" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="s24Screen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="35%" stopColor="#312E81" />
            <stop offset="70%" stopColor="#4338CA" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="spenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="70%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <radialGradient id="s24Lens" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="50%" stopColor="#3730A3" />
            <stop offset="100%" stopColor="#090A1A" />
          </radialGradient>
        </defs>

        {/* Ambient shadow */}
        <ellipse cx="340" cy="485" rx="270" ry="22" fill="rgba(0,0,0,0.55)" filter="blur(10px)" />

        {/* === GALAXY S24 ULTRA (Signature sharp squared titanium corners) === */}
        <g transform="translate(190, 45)">
          {/* Squared Titanium Frame */}
          <rect x="0" y="0" width="230" height="420" rx="14" fill="url(#s24Frame)" stroke="#64748B" strokeWidth="2" />
          {/* Flat Glass Display Bezel */}
          <rect x="4" y="4" width="222" height="412" rx="10" fill="#020617" />
          
          {/* Dynamic AMOLED 2X Display */}
          <rect x="7" y="7" width="216" height="406" rx="8" fill="url(#s24Screen)" />

          {/* Galaxy AI Dynamic Prism Visual on Screen */}
          <path
            d="M7 180 Q80 120 130 220 T223 200 L223 413 L7 413 Z"
            fill="#4F46E5"
            opacity="0.5"
          />
          <polygon points="115,120 145,170 85,170" fill="rgba(129, 140, 248, 0.4)" filter="blur(4px)" />
          <polygon points="115,220 155,160 75,160" fill="rgba(192, 132, 252, 0.4)" filter="blur(4px)" />

          {/* Infinity-O Punch-Hole Camera */}
          <circle cx="115" cy="18" r="4" fill="#000000" stroke="#312E81" strokeWidth="0.8" />
          <circle cx="115" cy="18" r="1.5" fill="#6366F1" />

          {/* Clock & Galaxy AI branding */}
          <text x="115" y="74" fill="#FFFFFF" fontSize="32" fontWeight="800" textAnchor="middle">12:45</text>
          <text x="115" y="94" fill="#A5B4FC" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="1">✨ Galaxy AI is Here</text>

          {/* Screen gloss streak */}
          <path d="M7 7 L90 7 L7 220 Z" fill="rgba(255,255,255,0.07)" />

          {/* Rear Camera Rings (Revealed in subtle 3D isometric peek on left) */}
          <g transform="translate(-18, 30)">
            {/* Camera 1: 200MP Main */}
            <circle cx="10" cy="18" r="15" fill="#0F172A" stroke="#818CF8" strokeWidth="1.5" />
            <circle cx="10" cy="18" r="10" fill="url(#s24Lens)" />
            {/* Camera 2: Periscope Zoom */}
            <circle cx="10" cy="56" r="15" fill="#0F172A" stroke="#818CF8" strokeWidth="1.5" />
            <circle cx="10" cy="56" r="10" fill="url(#s24Lens)" />
            {/* Camera 3: Ultra Wide */}
            <circle cx="10" cy="94" r="15" fill="#0F172A" stroke="#818CF8" strokeWidth="1.5" />
            <circle cx="10" cy="94" r="10" fill="url(#s24Lens)" />
          </g>
        </g>

        {/* === S-PEN STYLUS (Standing Angled to the Right) === */}
        <g transform="translate(455, 110) rotate(14)">
          {/* Pen shaft */}
          <rect x="0" y="0" width="12" height="310" rx="6" fill="url(#spenGradient)" stroke="#64748B" strokeWidth="1" />
          {/* Clicker top */}
          <rect x="2" y="-12" width="8" height="12" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="0.8" />
          {/* Action button */}
          <rect x="4" y="65" width="4" height="24" rx="2" fill="#CBD5E1" />
          {/* Precision cone tip */}
          <polygon points="0,310 12,310 6,330" fill="#1E293B" stroke="#475569" strokeWidth="0.5" />
          <circle cx="6" cy="331" r="1.5" fill="#818CF8" />
          {/* Samsung logo subtle on pen */}
          <text x="6" y="160" fill="#94A3B8" fontSize="7" fontWeight="700" textAnchor="middle" transform="rotate(-90, 6, 160)">SAMSUNG</text>
        </g>
      </svg>
    </div>
  );
}

// Slide 4: iPhone 17 Pro Max (Desert Titanium - Dual Front & Rear View)
export function IPhone17ProMaxVisual({ className = '' }) {
  return (
    <div className={`hero-visual-wrapper ${className}`}>
      <svg
        viewBox="0 0 680 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-svg-graphic"
        style={{ width: '100%', height: 'auto', maxHeight: '460px', filter: 'drop-shadow(0 25px 45px rgba(0,0,0,0.5))' }}
      >
        <defs>
          <linearGradient id="desertTiChassis" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C49B76" />
            <stop offset="35%" stopColor="#9C7753" />
            <stop offset="70%" stopColor="#543D28" />
            <stop offset="100%" stopColor="#2E2015" />
          </linearGradient>
          <linearGradient id="desertBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D0A9" />
            <stop offset="50%" stopColor="#C49B76" />
            <stop offset="100%" stopColor="#785333" />
          </linearGradient>
          <linearGradient id="desertScreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="35%" stopColor="#78350F" />
            <stop offset="70%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>
          <radialGradient id="desertLens" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="45%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#0F0804" />
          </radialGradient>
        </defs>

        {/* Ambient shadow */}
        <ellipse cx="340" cy="485" rx="275" ry="22" fill="rgba(0,0,0,0.55)" filter="blur(10px)" />

        {/* === DEVICE 1: REAR VIEW (Desert Titanium Angled Left) === */}
        <g transform="translate(135, 45) rotate(-5, 110, 200)">
          {/* Chassis */}
          <rect x="0" y="0" width="212" height="415" rx="36" fill="url(#desertTiChassis)" stroke="url(#desertBorder)" strokeWidth="2.5" />
          {/* Frosted Desert Glass Matte */}
          <rect x="4" y="4" width="204" height="407" rx="32" fill="#3D2B1D" opacity="0.6" />

          {/* Apple Logo in Polished Titanium Gold */}
          <path
            d="M106 185 C109 185 112 183 115 183 C118 183 121 185 124 185 C128 185 132 181 134 177 C129 174 126 169 126 163 C126 156 131 151 136 149 C132 144 126 143 122 143 C117 143 114 145 111 145 C108 145 104 143 100 143 C92 143 84 149 84 161 C84 173 91 185 97 185 C101 185 103 185 106 185 Z M116 141 C118 138 119 134 119 130 C115 130 111 133 109 136 C107 139 106 143 106 147 C110 147 114 144 116 141 Z"
            fill="rgba(253, 230, 138, 0.75)"
          />

          {/* Camera Plateau */}
          <rect x="12" y="16" width="94" height="106" rx="22" fill="#24170E" stroke="rgba(245, 208, 169, 0.3)" strokeWidth="1.2" />

          {/* Lens 1 */}
          <circle cx="44" cy="46" r="21" fill="#140D08" stroke="#C49B76" strokeWidth="1.5" />
          <circle cx="44" cy="46" r="16" fill="url(#desertLens)" />
          <circle cx="40" cy="42" r="4" fill="rgba(255,255,255,0.6)" />

          {/* Lens 2 */}
          <circle cx="44" cy="90" r="21" fill="#140D08" stroke="#C49B76" strokeWidth="1.5" />
          <circle cx="44" cy="90" r="16" fill="url(#desertLens)" />
          <circle cx="40" cy="86" r="4" fill="rgba(255,255,255,0.6)" />

          {/* Lens 3 */}
          <circle cx="78" cy="68" r="21" fill="#140D08" stroke="#C49B76" strokeWidth="1.5" />
          <circle cx="78" cy="68" r="16" fill="url(#desertLens)" />
          <circle cx="74" cy="64" r="4" fill="rgba(255,255,255,0.6)" />

          {/* Flash & LiDAR */}
          <circle cx="78" cy="34" r="7" fill="#FEF08A" stroke="#B45309" strokeWidth="1" />
          <circle cx="78" cy="102" r="5" fill="#1A120B" stroke="#78350F" strokeWidth="0.8" />
        </g>

        {/* === DEVICE 2: FRONT VIEW (Forward Right) === */}
        <g transform="translate(325, 35) rotate(5, 110, 200)">
          {/* Chassis */}
          <rect x="0" y="0" width="216" height="422" rx="38" fill="#17120E" stroke="url(#desertBorder)" strokeWidth="2.5" />
          {/* Bezel */}
          <rect x="5" y="5" width="206" height="412" rx="33" fill="#050302" />

          {/* Screen with 120Hz ProMotion Wallpaper */}
          <rect x="8" y="8" width="200" height="406" rx="30" fill="url(#desertScreen)" />

          {/* Flowing golden desert sand dunes */}
          <path
            d="M8 150 Q90 100 150 180 T208 240 L208 414 L8 414 Z"
            fill="#B45309"
            opacity="0.65"
          />
          <path
            d="M8 250 C80 200 140 290 208 220 L208 414 L8 414 Z"
            fill="#F59E0B"
            opacity="0.4"
          />

          {/* Dynamic Island */}
          <rect x="74" y="16" width="68" height="18" rx="9" fill="#000000" stroke="#2E2015" strokeWidth="0.8" />
          <circle cx="86" cy="25" r="3.5" fill="#0A0F1D" />
          <circle cx="122" cy="25" r="2.5" fill="#D97706" />

          {/* Lock Screen Typography */}
          <text x="108" y="72" fill="#FFFFFF" fontSize="34" fontWeight="800" textAnchor="middle" letterSpacing="-1">09:41</text>
          <text x="108" y="90" fill="#FDE68A" fontSize="10" fontWeight="600" textAnchor="middle" letterSpacing="0.5">Desert Titanium Edition</text>

          {/* Bottom gesture bar */}
          <rect x="73" y="400" width="70" height="3.5" rx="1.75" fill="#FFFFFF" opacity="0.8" />

          {/* Specular gloss */}
          <path d="M8 8 L100 8 L8 210 Z" fill="rgba(255,255,255,0.08)" />
        </g>
      </svg>
    </div>
  );
}
