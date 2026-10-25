import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';
import {
  IPadProVisual,
  IPhone18ProMaxVisual,
  GalaxyS24UltraVisual,
  IPhone17ProMaxVisual
} from './HeroVisuals';

const HERO_SLIDES = [
  {
    id: 'ipad-pro',
    badge: 'FLAGSHIP TABLET',
    badgeIcon: Sparkles,
    badgeColor: '#38BDF8',
    title: 'iPad Pro',
    titleGradient: 'linear-gradient(135deg, #FFFFFF 30%, #93C5FD 70%, #60A5FA 100%)',
    subtitle: 'The ultimate iPad experience with groundbreaking M4 performance.',
    price: 'Rs. 229,999',
    ptaStatus: 'Official PTA Approved',
    specTags: [
      'M4 Chip: Breakthrough speed',
      '11" / 13": Ultra Retina XDR',
      'Apple Pencil: Pro Precision'
    ],
    shopLink: '/shop?category=ipad',
    exploreLink: '/shop?category=ipad',
    VisualComponent: IPadProVisual,
    ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(56, 189, 248, 0.25) 0%, rgba(37, 99, 235, 0.12) 45%, transparent 70%)'
  },
  {
    id: 'iphone-18-pro-max',
    badge: 'NEW ARRIVAL',
    badgeIcon: Sparkles,
    badgeColor: '#60A5FA',
    title: 'iPhone 18 Pro Max',
    titleGradient: 'linear-gradient(135deg, #FFFFFF 30%, #BFDBFE 65%, #3B82F6 100%)',
    subtitle: 'The next generation of titanium smartphone innovation is here.',
    price: 'Rs. 449,999',
    ptaStatus: 'Official PTA Approved',
    specTags: [
      'A20 Pro Chip: 2nm Architecture',
      '48MP Pro: Fusion Telephoto',
      '6.9" Display: Super Retina XDR'
    ],
    shopLink: '/shop?category=iphone',
    exploreLink: '/shop?category=iphone',
    VisualComponent: IPhone18ProMaxVisual,
    ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(37, 99, 235, 0.32) 0%, rgba(99, 102, 241, 0.16) 45%, transparent 70%)'
  },
  {
    id: 'galaxy-s24-ultra',
    badge: 'GALAXY AI IS HERE',
    badgeIcon: Sparkles,
    badgeColor: '#A78BFA',
    title: 'Galaxy S24 Ultra',
    titleGradient: 'linear-gradient(135deg, #FFFFFF 30%, #DDD6FE 65%, #818CF8 100%)',
    subtitle: 'Unleash mobile AI capabilities with integrated S-Pen and titanium frame.',
    price: 'Rs. 289,999',
    ptaStatus: 'Official PTA Approved',
    specTags: [
      '200MP Camera: Nightography Zoom',
      'Snapdragon 8 Gen 3: Extreme Speed',
      '6.8" Screen: Dynamic AMOLED 2X'
    ],
    shopLink: '/shop?category=samsung',
    exploreLink: '/shop?category=samsung',
    VisualComponent: GalaxyS24UltraVisual,
    ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(139, 92, 246, 0.28) 0%, rgba(59, 130, 246, 0.15) 45%, transparent 70%)'
  },
  {
    id: 'iphone-17-pro-max',
    badge: 'BEST SELLER',
    badgeIcon: Award,
    badgeColor: '#FBBF24',
    title: 'iPhone 17 Pro Max',
    titleGradient: 'linear-gradient(135deg, #FFFFFF 30%, #FDE68A 65%, #D97706 100%)',
    subtitle: 'A more powerful iPhone with aerospace-grade desert titanium design.',
    price: 'Rs. 389,999',
    ptaStatus: 'Official PTA Approved',
    specTags: [
      'A19 Pro Chip: Hardware Ray Tracing',
      '48MP Pro: Macro & Spatial',
      '6.9" Display: ProMotion 120Hz'
    ],
    shopLink: '/shop?category=iphone',
    exploreLink: '/shop?category=iphone',
    VisualComponent: IPhone17ProMaxVisual,
    ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(245, 158, 11, 0.26) 0%, rgba(37, 99, 235, 0.14) 45%, transparent 70%)'
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);
  const slideCount = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play timer (6000ms), paused on user hover or interaction
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Touch / Swipe handling
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartXRef.current - touchEndXRef.current;
    const swipeThreshold = 45;
    if (delta > swipeThreshold) {
      nextSlide();
    } else if (delta < -swipeThreshold) {
      prevSlide();
    }
  };

  return (
    <section
      className="hero-slider-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Flagship Mobile Products Carousel"
    >
      {/* Background Decorative Grid & Ambient Glows */}
      <div className="hero-slider-bg-mesh" />
      <div
        className="hero-slider-ambient-glow"
        style={{ background: HERO_SLIDES[currentSlide].ambientGlow }}
      />

      {/* Main Slides Track */}
      <div className="hero-slider-viewport">
        <div
          className="hero-slider-track"
          style={{
            transform: `translate3d(-${currentSlide * 100}%, 0, 0)`
          }}
        >
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            const Visual = slide.VisualComponent;
            const BadgeIcon = slide.badgeIcon;

            return (
              <div
                key={slide.id}
                className={`hero-slide-pane ${isActive ? 'is-active' : ''}`}
                aria-hidden={!isActive}
              >
                <div className="container hero-slide-container">
                  <div className="hero-slide-grid">
                    {/* Left Column: Typography, Specs, Price & CTAs */}
                    <div className="hero-slide-left">
                      {/* Top Category Badge */}
                      <div className="hero-badge-wrap">
                        <span
                          className="hero-top-badge"
                          style={{
                            borderColor: `${slide.badgeColor}40`,
                            boxShadow: `0 0 16px ${slide.badgeColor}25`
                          }}
                        >
                          <BadgeIcon size={14} style={{ color: slide.badgeColor }} />
                          <span style={{ color: slide.badgeColor }}>{slide.badge}</span>
                        </span>
                      </div>

                      {/* Main Title & Subtitle */}
                      <h1
                        className="hero-slide-title"
                        style={{
                          backgroundImage: slide.titleGradient
                        }}
                      >
                        {slide.title}
                      </h1>
                      <p className="hero-slide-subtitle">{slide.subtitle}</p>

                      {/* Price & PTA Approval Pill */}
                      <div className="hero-price-row">
                        <div className="hero-price-block">
                          <span className="hero-price-label">STARTING FROM</span>
                          <span className="hero-price-amount">{slide.price}</span>
                        </div>
                        <div className="hero-pta-badge">
                          <CheckCircle2 size={15} className="hero-pta-icon" />
                          <span>{slide.ptaStatus}</span>
                        </div>
                      </div>

                      {/* 3 Dark Glassmorphism Specification Tags */}
                      <div className="hero-specs-wrap">
                        {slide.specTags.map((spec, sIdx) => (
                          <div key={sIdx} className="hero-spec-tag">
                            <span className="hero-spec-dot" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action CTA Buttons */}
                      <div className="hero-cta-group">
                        <Link to={slide.shopLink} className="hero-btn-primary">
                          <span>Shop Now</span>
                          <ArrowRight size={18} className="hero-btn-arrow" />
                        </Link>
                        <Link to={slide.exploreLink} className="hero-btn-outline">
                          <span>Explore Features</span>
                        </Link>
                      </div>

                      {/* 3 Inline Trust Badges at Bottom of Text */}
                      <div className="hero-inline-trust">
                        <div className="hero-trust-item">
                          <ShieldCheck size={16} className="hero-trust-icon" />
                          <span>100% Original Products</span>
                        </div>
                        <div className="hero-trust-divider" />
                        <div className="hero-trust-item">
                          <Award size={16} className="hero-trust-icon" />
                          <span>Official Brand Warranty</span>
                        </div>
                        <div className="hero-trust-divider" />
                        <div className="hero-trust-item">
                          <Truck size={16} className="hero-trust-icon" />
                          <span>Fast Nationwide Delivery</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: High-Fidelity Floating Product Visual */}
                    <div className="hero-slide-right">
                      <div className="hero-visual-stage">
                        <div className="hero-visual-halo" />
                        <Visual className={isActive ? 'hero-visual-floating' : ''} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows (Circular Glassmorphic) */}
      <button
        type="button"
        onClick={prevSlide}
        className="hero-nav-arrow hero-nav-prev"
        aria-label="Previous Product Slide"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="hero-nav-arrow hero-nav-next"
        aria-label="Next Product Slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Bottom Pagination Dots */}
      <div className="hero-pagination-bar" role="tablist" aria-label="Slide Selection">
        {HERO_SLIDES.map((slide, dotIdx) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={dotIdx === currentSlide}
            aria-label={`Go to slide ${dotIdx + 1}: ${slide.title}`}
            onClick={() => goToSlide(dotIdx)}
            className={`hero-dot-btn ${dotIdx === currentSlide ? 'is-active' : ''}`}
          >
            <span className="hero-dot-pill" />
          </button>
        ))}
      </div>
    </section>
  );
}
