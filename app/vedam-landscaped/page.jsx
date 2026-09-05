'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';

const VedamPage = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  // Scenes
  const heroRef = useRef(null);
  const section2Ref = useRef(null);
  const heroOverlayRef = useRef(null);
  const section3Ref = useRef(null);
  const section2OverlayRef = useRef(null);
  const galleryRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorArrowRef = useRef(null);
  const scene6GalleryRef = useRef(null);
  const scene6CursorRef = useRef(null);
  const scene7ClockRef = useRef(null);

  // Modal Refs
  const galleryModalRef = useRef(null);
  const modalContentRef = useRef(null);

  // Refs for Storytelling Section
  const storySectionRef = useRef(null);
  const scene5Ref = useRef(null);
  const mapBgRef = useRef(null);
  const blueGradientRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const text1ContainerRef = useRef(null);
  const text2ContainerRef = useRef(null);
  const section3OverlayRef = useRef(null);

  // Hero Elements
  const headlineRef = useRef(null);
  const bgTextRef = useRef(null);

  // --- Interactive Clock Section: 24-Hour Rhythm at Central Park Flower Valley ---
  const clockData = [
    {
      time: "06:30",
      period: "AM",
      tagline: "Dawn over the Aravalli Crest",
      text: "First light touches the dew on nine botanical reserves. Step directly from your floor into mist-veiled promenades where morning begins in unbroken natural quiet.",
      image: "/flower-valley/Golf-Course-Road.png"
    },
    {
      time: "10:30",
      period: "AM",
      tagline: "The Grand Sanctuary Lounge",
      text: "Mid-morning tea and private meetings unfold within 1.2 lakh sq. ft. of five-star hospitality, curated exclusively for estate residents and their invited guests.",
      image: "/flower-valley/Fleur Villa.png"
    },
    {
      time: "14:30",
      period: "PM",
      tagline: "The Secluded Sun Deck",
      text: "Afternoon calm settles over your private rooftop terrace. Unwind beneath custom timber pergolas with endless views across the valley's wooded green line.",
      image: "/flower-valley/flower4.png"
    },
    {
      time: "17:30",
      period: "PM",
      tagline: "Golden Hour Boulevards",
      text: "As warmth softens across the hilltops, the grand tree-lined avenues open for tranquil evening walks flanked by manicured gardens and cool valley breezes.",
      image: "/flower-valley/flower2.png"
    },
    {
      time: "20:00",
      period: "PM",
      tagline: "Twilight on the Terraces",
      text: "Warm architectural lighting traces the clean lines of the building against dusk, creating a calm backdrop for quiet family dinners under the stars.",
      image: "/flower-valley/flower8.png"
    },
    {
      time: "22:00",
      period: "PM",
      tagline: "The Quiet Hour",
      text: "Gated five-tier surveillance and dedicated concierge care ensure quiet rest, insulated entirely from the speed and noise of the capital city.",
      image: "/flower-valley/car.png"
    }
  ];

  // --- Scene 9 Lobby Data: Architectural Distinction ---
  const lobbyData = [
    {
      title: "Direct Elevator Arrival",
      desc: "Private lifts open straight into your residence foyer, framed with hand-selected Italian stone, understated cove lighting, and tailored metal details.",
      image: "/flower-valley/flower1.png"
    },
    {
      title: "50-Meter Grand Parkway",
      desc: "A wide, tree-shaded thoroughfare that knits the neighborhood together, offering dedicated jogging paths, cycling trails, and immediate access outward.",
      image: "/flower-valley/car.png"
    },
    {
      title: "Private Rooftop Terraces",
      desc: "Top-floor residences feature individual outdoor lounges designed for open-air dining, garden planting, or quiet evenings with open horizons.",
      image: "/flower-valley/scrollselene6.png"
    },
    {
      title: "Dedicated Stilt Level Bays",
      desc: "Covered, private vehicle bays with high-speed elevator access, electric vehicle charging provisions, and climate-controlled chauffeur quarters.",
      image: "/flower-valley/scrollselene2.png"
    }
  ];

  // --- Scene 12 Infrastructure Amenities Data ---
  const infraData = [
    {
      label: "Thermal & Hydro Suites",
      title: "The Mineral Baths & Sauna",
      desc: "Indoor temperature-regulated plunge pools, Finnish cedar saunas, and herbal steam grottos run to resort hospitality standards for pure daily renewal.",
      image: "/flower-valley/Sauna.png"
    },
    {
      label: "The Aquatic Reserve",
      title: "Championship Lap & Leisure Pool",
      desc: "A crystal-clear open-air swimming pool lined with aged date palms, deep sun loungers, and poolside attendants for morning laps or slow afternoons.",
      image: "/flower-valley/scrollselene4.png"
    },
    {
      label: "Ecological Masterplan",
      title: "Nine Thematic Botanical Grounds",
      desc: "Five hundred contiguous acres of landscaped greens, curated flora species, and fresh hillside airflow that make this valley one of the cleanest enclaves in NCR.",
      image: "/flower-valley/flower2.png"
    }
  ];

  // --- Scene 14 Vedam Floor Plans & Typology ---
  const splendidTabs = ["4 BHK Garden Floor", "4 BHK Sky Terrace", "Royal Duplex Penthouse"];
  const splendidData = {
    "4 BHK Garden Floor": { area: "Lower Levels 01 & 02", plotRange: "VD-01 to VD-48", plotSize: "2,450 - 2,850 sq. ft.", primaryFacing: "North-East / Direct Botanical Parkland" },
    "4 BHK Sky Terrace": { area: "Upper Levels 03 & 04", plotRange: "VD-49 to VD-96", plotSize: "3,150 sq. ft. + Private Terrace", primaryFacing: "Open Aravalli Ridge Panoramas" },
    "Royal Duplex Penthouse": { area: "Stilt + Dual Level Penthouse", plotRange: "DP-01 to DP-16", plotSize: "4,600 sq. ft.", primaryFacing: "Three-Sided Unobstructed Horizon" }
  };
  const [activeSplendidTab, setActiveSplendidTab] = useState("4 BHK Garden Floor");

  const getRotationAngles = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const hour12 = hours % 12;
    return {
      hour: (hour12 * 30) + (minutes * 0.5),
      minute: minutes * 6
    };
  };

  const [currentClockIndex, setCurrentClockIndex] = useState(0);
  const [currentInfraIndex, setCurrentInfraIndex] = useState(0);

  const nextClock = () => {
    setCurrentClockIndex((prev) => (prev + 1) % clockData.length);
  };
  const prevClock = () => {
    setCurrentClockIndex((prev) => (prev - 1 + clockData.length) % clockData.length);
  };

  const nextInfra = () => {
    setCurrentInfraIndex((prev) => (prev + 1) % infraData.length);
  };
  const prevInfra = () => {
    setCurrentInfraIndex((prev) => (prev - 1 + infraData.length) % infraData.length);
  };

  const modelRef = useRef(null);
  const bgImageRef = useRef(null);
  const scene12Ref = useRef(null);
  const scene13Ref = useRef(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    const cursor = cursorRef.current;
    const arrow = cursorArrowRef.current;

    if (gallery && cursor && arrow) {
      const onMouseMove = (e) => {
        const isOverGallery = gallery.contains(e.target);

        if (isOverGallery) {
          cursor.style.opacity = "1";
          cursor.style.scale = "1";
          cursor.style.transform = `translate(${e.clientX - 50}px, ${e.clientY - 50}px)`;

          const { left, width } = gallery.getBoundingClientRect();
          const x = e.clientX - left;
          if (x < width / 2) {
            arrow.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
          } else {
            arrow.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
          }
        } else {
          cursor.style.opacity = "0";
          cursor.style.scale = "0.8";
        }
      };

      const onScroll = () => {
        cursor.style.opacity = "0";
        cursor.style.scale = "0.8";
      };

      const onClick = (e) => {
        if (!gallery.contains(e.target)) return;

        const { left, width } = gallery.getBoundingClientRect();
        const x = e.clientX - left;
        const scrollAmount = window.innerWidth * 0.4;
        if (x < width / 2) {
          gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
          gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('click', onClick);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('click', onClick);
      };
    }
  }, []);

  const openGalleryModal = (index = 0) => {
    if (scene6CursorRef.current) {
      gsap.to(scene6CursorRef.current, { opacity: 0, scale: 0.8, duration: 0.2, overwrite: "auto" });
    }

    document.body.style.overflow = 'hidden';

    const scrollContainer = document.getElementById('gallery-modal-scroll');
    if (scrollContainer) {
      scrollContainer.scrollTop = index * window.innerHeight;
    }

    gsap.set(galleryModalRef.current, { visibility: 'visible', pointerEvents: 'auto', clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' });
    gsap.to(galleryModalRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1.2,
      ease: 'power3.inOut'
    });

    gsap.to(modalContentRef.current, { opacity: 1, duration: 0.5, delay: 0.4 });
  };

  const closeGalleryModal = () => {
    gsap.to(modalContentRef.current, { opacity: 0, duration: 0.4 });

    gsap.to(galleryModalRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 1.2,
      ease: 'power3.inOut',
      onComplete: () => {
        gsap.set(galleryModalRef.current, { visibility: 'hidden', pointerEvents: 'none' });
        document.body.style.overflow = '';
      }
    });
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    gsap.registerPlugin(ScrollTrigger);

    // 1. Initial Hero Load Animation (without arrow)
    const tlLoad = gsap.timeline({ defaults: { ease: "power3.out" } });
    tlLoad.fromTo(bgImageRef.current,
      { scale: 1.05, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2 }
    )
      .fromTo(modelRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5 },
        "-=1.5"
      )
      .fromTo(headlineRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        "-=1"
      )
      .fromTo(bgTextRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5 },
        "-=1.2"
      );

    // 2. Cinematic Scrub Timeline (Reversed & Diagonal Push Mechanisms)
    const scrubTl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollWrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
      }
    });

    // Phase 1: Slide Panel 2 diagonally from bottom-right (x: 40%, y: 100% -> 0, 0)
    scrubTl.to(heroOverlayRef.current, {
      opacity: 0.65,
      ease: "none",
      duration: 1
    }, 0)
      .fromTo(section2Ref.current, {
        xPercent: 40,
        yPercent: 100,
        rotateZ: 2
      }, {
        xPercent: 0,
        yPercent: 0,
        rotateZ: 0,
        ease: "none",
        duration: 1
      }, 0);

    // Phase 2: Slide Panel 3 from the LEFT horizontally (-100% to 0)
    scrubTl.to(section2OverlayRef.current, {
      opacity: 0.65,
      ease: "none",
      duration: 1
    }, 1)
      .fromTo(section3Ref.current, {
        xPercent: -100,
      }, {
        xPercent: 0,
        ease: "none",
        duration: 1
      }, 1);

    // Phase 3: Scroll Section 3 vertically up
    scrubTl.to(section3Ref.current, {
      y: () => {
        if (section3Ref.current) {
          const extraHeight = section3Ref.current.scrollHeight - window.innerHeight;
          return extraHeight > 0 ? -extraHeight : 0;
        }
        return 0;
      },
      ease: "none",
      duration: 1
    }, 2);

    // Phase 4: Diagonal Polygon Wipe for Scene 4
    if (storySectionRef.current) {
      gsap.set(storySectionRef.current, { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' });
      scrubTl.to(storySectionRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease: "none",
        duration: 1.2
      }, 3);
    }

    // Phase 5: Locked at top: 0 while paragraph text words scrub-reveal
    const words = document.querySelectorAll('.reveal-text span.reveal-word');
    if (words.length > 0) {
      scrubTl.to(words, {
        color: '#fff',
        stagger: 0.05,
        ease: 'none',
        duration: 1.5
      }, 4.2);
    }

    const bottomImg = document.querySelector('.bottom-flower-img');
    if (bottomImg) {
      scrubTl.fromTo(bottomImg,
        { y: 50, opacity: 0.6 },
        { y: 0, opacity: 1, ease: 'none', duration: 1.5 },
        4.2
      );
    }

    // Phase 6: Scroll Scene 4 fully up
    scrubTl.to(storySectionRef.current, {
      y: () => {
        if (storySectionRef.current) {
          const extraHeight = storySectionRef.current.scrollHeight - window.innerHeight;
          return extraHeight > 0 ? -extraHeight : 0;
        }
        return 0;
      },
      ease: "none",
      duration: 2
    }, 5.7);

    // Scene 5 Text Scroll Entrance
    gsap.from('.scene5-text', {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.scene5-text',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Scene 5 Imagery Scroll Reveal
    const scene5Img = document.querySelector('.scene5-img');
    const scene5ImgInner = document.querySelector('.scene5-img-inner');
    if (scene5Img && scene5ImgInner) {
      gsap.timeline({
        scrollTrigger: {
          trigger: scene5Img,
          start: 'top 90%',
          end: 'bottom 20%',
          scrub: 1,
        }
      })
        .fromTo(scene5Img,
          { clipPath: 'inset(18% 0% 18% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }
        )
        .fromTo(scene5ImgInner,
          { scale: 1.2 },
          { scale: 1, ease: 'none' },
          0
        );
    }

    const imgLeft = document.querySelector('.scene5-img-left');
    const imgLeftInner = document.querySelector('.scene5-img-left-inner');
    if (imgLeft && imgLeftInner) {
      gsap.timeline({
        scrollTrigger: {
          trigger: imgLeft,
          start: 'top 95%',
          end: 'top 35%',
          scrub: 1.2,
        }
      })
        .fromTo(imgLeft,
          { clipPath: 'inset(35% 0% 35% 0%)', y: 60, opacity: 0.2 },
          { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1, ease: 'none' }
        )
        .fromTo(imgLeftInner, { scale: 1.3 }, { scale: 1, ease: 'none' }, 0);
    }

    const imgRight = document.querySelector('.scene5-img-right');
    const imgRightInner = document.querySelector('.scene5-img-right-inner');
    if (imgRight && imgRightInner) {
      gsap.timeline({
        scrollTrigger: {
          trigger: imgRight,
          start: 'top 95%',
          end: 'top 30%',
          scrub: 1.2,
        }
      })
        .fromTo(imgRight,
          { clipPath: 'inset(35% 0% 35% 0%)', y: 80, opacity: 0.2 },
          { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1, ease: 'none' }
        )
        .fromTo(imgRightInner, { scale: 1.3 }, { scale: 1, ease: 'none' }, 0);
    }

    gsap.from('.scene5-heading', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.scene5-heading',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from('.scene5-right-heading', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.scene5-right-heading',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

    const flowerImg = document.querySelector('.scene5-flower-img');
    const flowerImgInner = document.querySelector('.scene5-flower-img-inner');
    if (flowerImg && flowerImgInner) {
      gsap.timeline({
        scrollTrigger: {
          trigger: flowerImg,
          start: 'top 95%',
          end: 'top 35%',
          scrub: 1.2,
        }
      })
        .fromTo(flowerImg,
          { clipPath: 'inset(30% 0% 30% 0%)', y: 60, opacity: 0.2 },
          { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1, ease: 'none' }
        )
        .fromTo(flowerImgInner, { scale: 1.25 }, { scale: 1, ease: 'none' }, 0);
    }

    gsap.from('.scene5-luxury-text', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.scene5-luxury-text',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

    // 3D Refrigerator Door Reveal Animation
    const fridgeContainer = document.querySelector('.fridge-portal');
    const doorLeft = document.querySelector('.fridge-door-left');
    const doorRight = document.querySelector('.fridge-door-right');
    const fridgeInner = document.querySelector('.fridge-inner-showcase');

    if (fridgeContainer && doorLeft && doorRight && fridgeInner) {
      gsap.set(doorLeft, { transformOrigin: 'left center', transformPerspective: 1800 });
      gsap.set(doorRight, { transformOrigin: 'right center', transformPerspective: 1800 });

      const tlFridge = gsap.timeline({
        scrollTrigger: {
          trigger: fridgeContainer,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.2,
        }
      });

      tlFridge
        .to(doorLeft, {
          rotateY: -110,
          boxShadow: '-20px 0 40px rgba(0,0,0,0.7)',
          ease: 'power1.inOut'
        }, 0)
        .to(doorRight, {
          rotateY: 110,
          boxShadow: '20px 0 40px rgba(0,0,0,0.7)',
          ease: 'power1.inOut'
        }, 0)
        .fromTo(fridgeInner, {
          scale: 0.82,
          filter: 'brightness(0.5)'
        }, {
          scale: 1,
          filter: 'brightness(1)',
          ease: 'none'
        }, 0);
    }

    // Scene 6 Pinned Gallery
    const gallerySection6 = scene6GalleryRef.current;
    const scene5 = scene5Ref.current;

    if (gallerySection6 && scene5) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scene5,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      tl.fromTo(gallerySection6, { yPercent: -100 }, { yPercent: 0, ease: 'none' }, 0);
      tl.fromTo('.gallery-img-1', { y: 150 }, { y: 0, ease: 'none' }, 0)
        .fromTo('.gallery-img-2', { y: -80 }, { y: 0, ease: 'none' }, 0)
        .fromTo('.gallery-img-3', { y: 200 }, { y: 0, ease: 'none' }, 0)
        .fromTo('.gallery-img-4', { y: -120 }, { y: 0, ease: 'none' }, 0)
        .fromTo('.gallery-img-5', { y: 100 }, { y: 0, ease: 'none' }, 0)
        .fromTo('.gallery-title', { y: 50, scale: 0.95 }, { y: 0, scale: 1, ease: 'none' }, 0);
    }

    // Scene 7 Clock Reveal
    const clockSection = scene7ClockRef.current;
    if (gallerySection6 && clockSection) {
      gsap.timeline({
        scrollTrigger: {
          trigger: '.scene7-wrapper',
          start: 'top bottom',
          end: 'top top',
          scrub: true
        }
      }).fromTo(clockSection, { yPercent: -100 }, { yPercent: 0, ease: 'none' }, 0);
    }

    // Custom Cursor Handlers
    const handleGallery6MouseMove = (e) => {
      if (!scene6CursorRef.current || !gallerySection6) return;
      const isOverGallery = gallerySection6.contains(e.target);

      if (isOverGallery) {
        gsap.to(scene6CursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto"
        });
      } else {
        gsap.to(scene6CursorRef.current, { opacity: 0, scale: 0.8, duration: 0.3, overwrite: "auto" });
      }
    };

    const handleGallery6Scroll = () => {
      if (!scene6CursorRef.current) return;
      gsap.to(scene6CursorRef.current, { opacity: 0, scale: 0.8, duration: 0.3, overwrite: "auto" });
    };

    if (gallerySection6) {
      window.addEventListener('mousemove', handleGallery6MouseMove);
      window.addEventListener('scroll', handleGallery6Scroll, { passive: true });
    }

    // Scene 8 Fullscreen Reveal
    const scene8Wrapper = document.querySelector('.scene8-wrapper');
    const scene8 = document.querySelector('.scene8-luxury');
    const scene8Text = gsap.utils.toArray('.scene8-text');

    const scene7Wrapper = document.querySelector('.scene7-wrapper');
    if (scene7Wrapper) {
      ScrollTrigger.create({
        trigger: scene7Wrapper,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false
      });
    }

    if (scene8Wrapper) {
      ScrollTrigger.create({
        trigger: scene8Wrapper,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false
      });
    }

    if (scene8) {
      gsap.from(scene8Text, {
        y: 60, opacity: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: scene8,
          start: 'top 95%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Scene 9 & 10
    const scene9_10_spacer = document.querySelector('.scene9-10-spacer');
    if (scene9_10_spacer) {
      const slides = gsap.utils.toArray('.scene9-slide');

      slides.forEach((slide, index) => {
        if (index === 0) {
          gsap.set(slide.querySelector('.scene9-text'), { autoAlpha: 1 });
          gsap.set(slide.querySelector('.scene9-img'), { xPercent: 0 });
          return;
        }
        gsap.set(slide.querySelector('.scene9-text'), { autoAlpha: 0 });
        gsap.set(slide.querySelector('.scene9-img'), { xPercent: index % 2 === 0 ? 100 : -100 });
      });

      const tl9 = gsap.timeline({
        scrollTrigger: {
          trigger: scene9_10_spacer,
          start: 'top top',
          end: '+=900%',
          scrub: true,
        }
      });

      tl9.to({}, { duration: 4 });

      slides.forEach((slide, index) => {
        if (index === 0) return;
        const textPanel = slide.querySelector('.scene9-text');
        const imgPanel = slide.querySelector('.scene9-img');

        tl9.addLabel(`slide${index}`)
          .to(textPanel, { autoAlpha: 1, duration: 1.5, ease: 'none' }, `slide${index}`)
          .to(imgPanel, { xPercent: 0, duration: 1.5, ease: 'none' }, `slide${index}`)
          .to({}, { duration: 2 });
      });

      const scene10 = document.querySelector('.scene10-fitness');
      const scene11 = document.querySelector('.scene11-infra');

      tl9.addLabel('scene10-start')
        .fromTo(scene10, {
          xPercent: -100
        }, {
          xPercent: 0,
          ease: 'none',
          duration: 5
        }, 'scene10-start');

      tl9.set(scene11, { right: 0 }, 'scene10-start+=2');

      tl9.addLabel('scene11-reveal')
        .to(scene10, {
          x: '100vw',
          ease: 'none',
          duration: 2
        }, 'scene11-reveal');
    }

    // Scene 13
    const scene13Wrapper = document.querySelector('.scene13-wrapper');
    if (scene13Wrapper) {
      const scene13ImgLeft = document.querySelector('.scene13-img-left');
      const scene13ImgLeftInner = document.querySelector('.scene13-img-left-inner');
      const scene13ImgRight = document.querySelector('.scene13-img-right');
      const scene13ImgRightInner = document.querySelector('.scene13-img-right-inner');

      const tl13 = gsap.timeline({
        scrollTrigger: {
          trigger: scene13Wrapper,
          start: 'top bottom',
          end: 'top top',
          scrub: true
        }
      });

      if (scene13ImgLeft && scene13ImgLeftInner) {
        tl13.fromTo(scene13ImgLeft,
          { clipPath: 'inset(25% 0% 25% 0%)', y: 60, opacity: 0.2 },
          { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1, ease: 'none' },
          0.2
        )
          .fromTo(scene13ImgLeftInner, { scale: 1.25 }, { scale: 1, ease: 'none' }, 0.2);
      }

      if (scene13ImgRight && scene13ImgRightInner) {
        tl13.fromTo(scene13ImgRight,
          { clipPath: 'inset(25% 0% 25% 0%)', y: 60, opacity: 0.2 },
          { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1, ease: 'none' },
          0.4
        )
          .fromTo(scene13ImgRightInner, { scale: 1.25 }, { scale: 1, ease: 'none' }, 0.4);
      }

      const scene13BottomImg = document.querySelector('.scene13-bottom-img');
      const scene13BottomImgInner = document.querySelector('.scene13-bottom-img-inner');
      if (scene13BottomImg && scene13BottomImgInner) {
        gsap.fromTo(scene13BottomImgInner,
          { scale: 1.2, clipPath: 'inset(20% 10% 20% 10%)' },
          {
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            scrollTrigger: {
              trigger: scene13BottomImg,
              start: 'top bottom',
              end: 'center center',
              scrub: true
            }
          }
        );
      }
    }

    // Scene 15 Scrolling Column
    const scene15Boxes = gsap.utils.toArray('.scene15-box');
    const scene15Imgs = [
      document.querySelector('.scene15-img-1'),
      document.querySelector('.scene15-img-2'),
      document.querySelector('.scene15-img-3'),
      document.querySelector('.scene15-img-4')
    ];

    if (scene15Boxes.length > 0) {
      scene15Boxes.forEach((box, index) => {
        const isLastBox = index === scene15Boxes.length - 1;
        ScrollTrigger.create({
          trigger: box,
          start: 'top 65%',
          end: isLastBox ? 'bottom 0%' : 'bottom 35%',
          onToggle: (self) => {
            if (self.isActive) {
              box.style.borderColor = '#C39169';
              box.style.color = '#FFFFFF';
              const p = box.querySelector('p');
              if (p) {
                p.style.opacity = '1';
                p.style.color = '#FFFFFF';
              }
              scene15Imgs.forEach((img, i) => {
                if (img) img.style.opacity = i === index ? '1' : '0';
              });
            } else {
              box.style.borderColor = 'rgba(255,255,255,0.2)';
              box.style.color = 'rgba(255,255,255,0.4)';
              const p = box.querySelector('p');
              if (p) {
                p.style.opacity = '0.4';
                p.style.color = 'rgba(255,255,255,0.4)';
              }
            }
          }
        });
      });
    }

    // Scene 16 Parallax
    const scene16Bg = document.querySelector('.scene16-bg');
    const scene16Container = document.querySelector('.scene16-penthouse');
    const scene15Container = document.querySelector('.scene15-container');

    if (scene15Container && scene16Container) {
      ScrollTrigger.create({
        trigger: scene15Container,
        start: 'bottom bottom',
        endTrigger: scene16Container,
        end: 'top top',
        pin: true,
        pinSpacing: false
      });
    }

    if (scene16Bg && scene16Container) {
      gsap.fromTo(scene16Bg,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: scene16Container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      if (gallerySection6) {
        window.removeEventListener('mousemove', handleGallery6MouseMove);
        window.removeEventListener('scroll', handleGallery6Scroll);
      }
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      {/* Mobile Landscape Prompt Overlay */}
      <div className="rotate-screen-message fixed inset-0 z-[999999] bg-[#050505] flex-col items-center justify-center text-center px-8 font-sans">
        <div className="animate-rotate-phone mb-8">
          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 18h.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="text-white text-2xl md:text-3xl font-normal tracking-wider uppercase mb-3 font-serif">
          Rotate Device
        </h2>
        <p className="text-white/60 text-xs tracking-widest uppercase font-light leading-relaxed max-w-[260px]">
          Please rotate your device to landscape mode for the architectural showcase.
        </p>
      </div>

      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        .font-serif {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .font-sans {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }

        @keyframes rotate-phone {
          0%, 10% { transform: rotate(0deg); }
          40%, 60% { transform: rotate(-90deg); }
          90%, 100% { transform: rotate(0deg); }
        }
        .animate-rotate-phone {
          animation: rotate-phone 2.5s ease-in-out infinite;
        }
        .rotate-screen-message {
          display: none;
        }
        @media (max-width: 768px) and (orientation: portrait) {
          .rotate-screen-message {
            display: flex;
          }
        }
        ::-webkit-scrollbar { display: none; }
        html, body { scrollbar-width: none; -ms-overflow-style: none; background-color: #050505 !important; }
      `}</style>

      {/* Dummy scroll wrapper for Scenes 1-4 */}
      <div ref={scrollWrapperRef} className="relative w-full h-[900vh] z-[10] bg-black">

        {/* Sticky viewport container */}
        <div ref={containerRef} className="sticky top-0 left-0 w-full h-screen bg-black text-white overflow-hidden font-sans">

          {/* =========================================
            SCENE 1: HERO
            ========================================= */}
          <section ref={heroRef} className="absolute top-0 left-0 w-full h-screen overflow-hidden bg-brand-primary z-10 origin-center will-change-transform">
            <div
              ref={heroOverlayRef}
              className="absolute inset-0 bg-black z-40 opacity-0 pointer-events-none"
            ></div>

            {/* Split Screen Background */}
            <div className="absolute inset-0 flex w-full h-full">
              <div className="w-[33%] h-full bg-[#0E1520] z-10 border-r border-white/5"></div>
              <div
                ref={bgImageRef}
                className="w-[67%] h-full bg-cover bg-center origin-center"
                style={{ backgroundImage: "url('/flower-valley/flower9.png')" }}
              ></div>
            </div>

            {/* Typography */}
            <div
              ref={bgTextRef}
              className="absolute bottom-[-14%] left-0 w-full text-center z-[35] pointer-events-none select-none flex justify-center"
            >
              <h1
                className="text-[19vw] leading-[1.0] font-normal text-white/[0.04] uppercase font-serif"
                style={{ letterSpacing: '0.08em' }}
              >
                VEDAM
              </h1>
            </div>

            {/* Center Model Overlay */}
            <div className="absolute bottom-[-5%] left-[35%] md:left-[35%] -translate-x-1/2 w-full max-w-[700px] h-[88vh] z-30 pointer-events-none">
              <div ref={modelRef} className="relative w-full h-full rounded-t-[140px] overflow-hidden shadow-[0_-30px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
                <Image
                  src="/flower-valley/scrollselene.png"
                  alt="Vedam Residences at Central Park Flower Valley"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none"></div>
              </div>
            </div>

            {/* Top Left Headline - Arrow Removed */}
            <div className="absolute top-28 md:top-32 left-4 md:left-12 z-40 pointer-events-auto max-w-[500px]">
              <span className="text-[#C39169] text-[11px] uppercase tracking-[0.3em] font-medium mb-3 block font-sans">
                Central Park Flower Valley &bull; Sohna Road
              </span>
              <h2 ref={headlineRef} className="text-3xl md:text-4xl lg:text-[42px] leading-[1.15] font-light text-white font-serif tracking-normal">
                Independent Floors with<br />
                Private Terraces on the<br />
                Aravalli Foothills
              </h2>
            </div>
          </section>

          {/* =========================================
            SCENE 2: BOTANICAL REVEAL (DIAGONAL ENTER)
            ========================================= */}
          <section
            ref={section2Ref}
            className="absolute top-0 left-0 w-full h-screen overflow-hidden bg-black z-20 flex items-center origin-center will-change-transform"
          >
            <div
              ref={section2OverlayRef}
              className="absolute inset-0 bg-black z-30 opacity-0 pointer-events-none"
            ></div>

            <div className="absolute inset-0 w-full h-full opacity-40 overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover origin-center"
              >
                <source src="/flower-valley/Central Park Flower Valley.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="relative z-20 w-full max-w-[1400px] mx-auto pl-12 pr-4 h-full flex items-center justify-between">
              <div className="max-w-[480px]">
                <span className="text-[#C39169] text-[10px] font-medium tracking-[0.25em] uppercase block mb-3 font-sans">
                  Stilt + 4 Floors &bull; Private Lift Foyer
                </span>
                <h2 className="text-4xl md:text-5xl font-light text-white font-serif leading-[1.12]">
                  Low-density privacy.<br />
                  Unbroken horizons.
                </h2>
                <p className="text-white/65 text-sm leading-relaxed font-light mt-5 font-sans tracking-wide">
                  An exclusive enclave set inside a 500-acre master community. Individual land footprint privileges, zero shared horizontal walls, and the quiet assurance of 24/7 five-tier gated surveillance.
                </p>
              </div>

              <div className="flex items-center gap-3 h-[220px] self-end mb-6">
                <div className="w-[190px] h-full bg-[#050505] p-6 flex flex-col justify-between border border-white/10">
                  <h3 className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#C39169] font-sans">
                    Master Township
                  </h3>
                  <div className="my-auto">
                    <span className="text-white text-3xl font-light font-serif block">500</span>
                    <span className="text-white/50 text-[10px] uppercase tracking-wider font-light font-sans">Acres of Parkland</span>
                  </div>
                  <span className="text-[9px] text-white/40 tracking-wider font-sans">Sohna elevated corridor</span>
                </div>

                <div className="w-[190px] h-full bg-white p-6 flex flex-col justify-between">
                  <h3 className="text-[9px] font-medium uppercase tracking-[0.25em] text-black/60 font-sans">
                    Residence Class
                  </h3>
                  <div className="flex-grow flex items-center justify-center text-center">
                    <h4 className="text-[22px] font-light text-black font-serif leading-[1.1] mb-1">
                      4 BHK<br />Luxury Floors
                    </h4>
                  </div>
                  <div className="text-center mb-0">
                    <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#C39169] border-b border-[#C39169]/40 pb-[2px] font-sans">
                      View Architecture
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================
            SCENE 3: PRIVILEGE OF LOCATION (HORIZONTAL ENTER)
            ========================================= */}
          <section
            ref={section3Ref}
            className="absolute top-0 left-0 w-full min-h-screen bg-white z-30 flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.3)] origin-center will-change-transform"
          >
            <div
              ref={section3OverlayRef}
              className="absolute inset-0 bg-black z-40 opacity-0 pointer-events-none"
            ></div>

            <div className="relative w-full h-[85vh] flex flex-shrink-0 z-10">
              <div className="w-[28%] h-full bg-white relative"></div>
              <div className="w-[72%] h-full bg-[#0a0a0a] relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-100 bg-cover bg-center"
                  style={{ backgroundImage: "url('/flower-valley/flower8.png')" }}
                ></div>
              </div>
            </div>

            <div className="w-full flex-1 flex flex-col pt-8 pb-0 relative z-10">
              <div className="w-full flex">
                <div className="w-[28%]"></div>
                <div className="w-[72%] pr-12 flex flex-col items-start justify-start">
                  <div className="w-full flex justify-between">
                    <h3 className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#C39169] mb-3 font-sans">
                      Territorial Vantage
                    </h3>
                  </div>
                  <div className="w-full flex justify-end">
                    <h2 className="text-xl md:text-2xl lg:text-[28px] font-light text-black font-serif leading-[1.3] text-right max-w-[850px]">
                      Poised along the seamless elevated corridor of Sohna Road.<br />
                      Moments from Golf Course Extension and Cyber City, while resting inside the tranquil air-shed of the Aravallis.
                    </h2>
                  </div>
                </div>
              </div>

              <div className="w-full flex mt-20">
                <div className="w-[28%]"></div>
                <div className="w-[72%] pr-12 flex justify-end">
                  <h1 className="text-[44px] md:text-[56px] font-light text-black tracking-tight uppercase font-serif">
                    The Township Setting
                  </h1>
                </div>
              </div>

              <div className="w-full h-[1px] bg-black/15 mt-6"></div>

              {/* Gallery Ribbon */}
              <div
                ref={galleryRef}
                className="w-full mt-2 pl-4 md:pl-8 pr-4 md:pr-12 overflow-x-auto flex gap-4 hide-scrollbar cursor-none"
              >
                <div className="flex-none w-[505.48px] h-[349.92px] bg-cover bg-center" style={{ backgroundImage: "url('/flower-valley/Golf-Course-Road.png')" }}></div>
                <div className="flex-none w-[505.48px] h-[349.92px] bg-cover bg-center" style={{ backgroundImage: "url('/flower-valley/car.png')" }}></div>
                <div className="flex-none w-[505.48px] h-[349.92px] bg-cover bg-center" style={{ backgroundImage: "url('/flower-valley/flower2.png')" }}></div>
                <div className="flex-none w-[505.48px] h-[349.92px] bg-cover bg-center" style={{ backgroundImage: "url('/flower-valley/flower4.png')" }}></div>
                <div className="flex-none w-[505.48px] h-[349.92px] bg-cover bg-center" style={{ backgroundImage: "url('/flower-valley/flower3.png')" }}></div>
              </div>

              <div className="w-full mt-8 flex justify-center">
                <div className="relative w-[1280px] max-w-full h-[853px] shrink-0">
                  <div className="w-full h-full bg-cover bg-center bg-fixed bg-no-repeat" style={{ backgroundImage: "url('/flower-valley/flower1.png')" }}></div>
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/10 shadow-[inset_0_0_150px_rgba(0,0,0,0.6)]"></div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================
            SCENE 4: VEDAM PHILOSOPHY (DIAGONAL SHUTTER)
            ========================================= */}
          <section
            ref={storySectionRef}
            className="absolute top-0 left-0 w-full min-h-screen bg-[#0a0a0a] z-40 flex flex-col justify-between pt-10 md:pt-14 pb-0"
          >
            <div
              ref={blueGradientRef}
              className="absolute inset-0 w-full h-full opacity-90"
              style={{ background: 'linear-gradient(135deg, #0d1627 0%, #17243e 50%, #0a1120 100%)' }}
            ></div>

            <div className="relative z-10 w-full">
              <div className="w-full h-[1px] bg-white/15 mb-6 md:mb-10"></div>

              <div className="w-full px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
                  <div className="md:col-span-4 lg:col-span-3 hero-heading">
                    <span className="text-[#C39169] text-[10px] font-medium uppercase tracking-[0.3em] block mb-2 font-sans">The Living Concept</span>
                    <h2 className="text-lg md:text-xl font-light text-white font-serif leading-snug">
                      A quiet, generational home built inside living woods.
                    </h2>
                  </div>

                  <div className="md:col-span-6 md:col-start-7 reveal-text">
                    <p className="text-2xl md:text-3xl lg:text-[36px] font-light leading-[1.3] text-white font-serif">
                      {"Vedam at Central Park Flower Valley answers the need for genuine autonomy. Generous four-bedroom layouts, private elevator entries, bespoke terrace gardens, and the quiet assurance of nine themed parklands.".split(" ").map((word, idx, arr) => (
                        <span key={idx}>
                          <span
                            className="reveal-word transition-colors duration-100"
                            style={{ color: 'rgba(255,255,255,0.35)' }}
                          >
                            {word}
                          </span>
                          {idx < arr.length - 1 && ' '}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bottom-flower-img relative z-10 w-full h-screen shrink-0 mt-16 md:mt-24">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url('/flower-valley/flower3.png')" }}
              ></div>
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20"></div>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0d1627]/90 via-transparent to-black/30"></div>
            </div>
          </section>

        </div>
      </div>

      {/* =========================================
        SCENE 5: WHITE MINIMALIST STATEMENT SECTION
        ========================================= */}
      <section ref={scene5Ref} className="relative w-full bg-white text-black flex flex-col justify-start pt-12 md:pt-20 pb-6 md:pb-10 z-[60] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 md:col-start-5 scene5-text">
            <span className="text-[#C39169] text-[10px] font-medium tracking-[0.3em] uppercase block mb-3 font-sans">Architectural Principles</span>
            <p className="text-3xl md:text-4xl lg:text-[44px] font-light leading-[1.2] tracking-normal text-black font-serif">
              Low-rise proportions framed in stone and glass, positioned to harvest morning light and hillside winds.
            </p>
          </div>
        </div>

        <div className="w-full px-4 md:px-8 lg:px-10 mt-12 md:mt-20">
          <div className="scene5-img relative w-full h-[500px] md:h-[650px] overflow-hidden will-change-transform">
            <div
              className="scene5-img-inner w-full h-full bg-cover bg-center will-change-transform origin-center"
              style={{ backgroundImage: "url('/flower-valley/building.png')" }}
            ></div>
          </div>
        </div>

        <div className="w-full px-4 md:px-8 lg:px-10 mt-6 md:mt-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start">
            <div className="md:col-span-5 flex flex-col justify-start">
              <div className="scene5-heading mb-8 md:mb-12 -mt-3 md:-mt-6">
                <span className="text-[#C39169] text-[10px] font-medium tracking-[0.25em] uppercase block mb-2 font-sans">Natural Lighting</span>
                <h2 className="text-2xl md:text-3xl lg:text-[34px] font-light text-black font-serif leading-[1.2]">
                  Deep Balcony Outreaches<br />
                  and Concealed Warm Grazing
                </h2>
              </div>

              <div className="scene5-img-left relative w-full max-w-[310px] h-[320px] overflow-hidden will-change-transform ml-auto md:translate-x-20 mt-24 md:mt-[170px]">
                <div
                  className="scene5-img-left-inner w-full h-full bg-cover bg-center will-change-transform origin-center"
                  style={{ backgroundImage: "url('/flower-valley/flower10.png')" }}
                ></div>
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col items-end justify-end">
              <div className="scene5-img-right relative w-full max-w-[620px] h-[515px] overflow-hidden will-change-transform mt-14 md:mt-24">
                <div
                  className="scene5-img-right-inner w-full h-full bg-cover bg-center will-change-transform origin-center"
                  style={{ backgroundImage: "url('/flower-valley/flower2.png')" }}
                ></div>
              </div>

              <div className="w-full max-w-[620px] mt-4 md:mt-6 scene5-right-heading text-right">
                <span className="text-[#C39169] text-[10px] font-medium tracking-[0.25em] uppercase block mb-1 font-sans">Township Flora</span>
                <h2 className="text-2xl md:text-3xl lg:text-[34px] font-light text-black font-serif leading-[1.2]">
                  The Native Tree Canopies
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-4 md:px-8 lg:px-10 mt-10 md:mt-16 flex justify-center items-center">
          <div className="scene5-flower-img relative w-full max-w-[650px] md:max-w-[750px] h-[400px] md:h-[550px] flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/flower-valley/flower4.png"
              alt="Central Park Flower Valley Landscape"
              width={900}
              height={900}
              className="scene5-flower-img-inner object-cover w-full h-full drop-shadow-lg"
            />
          </div>
        </div>

        <div style={{ height: '100px' }} className="w-full hidden lg:block"></div>
        <div style={{ height: '80px' }} className="w-full hidden md:block lg:hidden"></div>
        <div style={{ height: '50px' }} className="w-full md:hidden"></div>

        {/* 3D DOUBLE-DOOR REFRIGERATOR SWING OPEN SHOWCASE */}
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="max-w-[800px] mb-6 scene5-luxury-text">
            <span className="text-[#C39169] text-[10px] font-medium uppercase tracking-[0.3em] block mb-2 font-sans">Interior Specification</span>
            <p className="text-sm md:text-base text-black/75 font-normal leading-relaxed font-sans">
              Every Vedam residence is delivered with bookmatched imported marble slabs, acoustic double-glazed glass façades, integrated VRV environmental cooling, and handcrafted kitchen cabinetry.
            </p>
          </div>

          <div
            className="fridge-portal relative w-full h-[580px] md:h-[650px] overflow-hidden rounded-xl bg-[#090C10] shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-black/10"
            style={{ perspective: '1800px', transformStyle: 'preserve-3d' }}
          >
            {/* Interior Reveal: Next/Inner image */}
            <div className="fridge-inner-showcase absolute inset-0 w-full h-full overflow-hidden will-change-transform flex items-center justify-center">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url('/flower-valley/flamingo-floor-3.png')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

              <div className="absolute bottom-10 left-10 md:bottom-14 md:left-14 z-10 max-w-md">
                <span className="text-[#C39169] text-[10px] font-medium tracking-[0.25em] uppercase block mb-1 font-sans">Living Gallery</span>
                <h3 className="text-white text-2xl md:text-4xl font-light font-serif">
                  The Formal Living Room
                </h3>
                <p className="text-white/65 text-xs uppercase tracking-wider font-light mt-2 font-sans">
                  Continuous floor plates framed by warm timber and polished natural quartz.
                </p>
              </div>
            </div>

            {/* Left Refrigerator Door */}
            <div
              className="fridge-door-left absolute top-0 left-0 w-1/2 h-full z-20 overflow-hidden will-change-transform border-r border-black/60 shadow-[5px_0_25px_rgba(0,0,0,0.6)]"
              style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
            >
              <div
                className="absolute top-0 left-0 w-[200%] h-full bg-cover bg-center"
                style={{ backgroundImage: "url('/flower-valley/flamingo-floor-.png')" }}
              ></div>
              <div className="absolute top-0 right-0 w-[3px] h-full bg-gradient-to-b from-white/40 via-[#C39169] to-white/20"></div>
              <div className="absolute top-1/2 -translate-y-1/2 right-4 w-[6px] h-32 rounded-full bg-gradient-to-r from-neutral-300 via-white to-neutral-500 shadow-[0_0_15px_rgba(0,0,0,0.8)] flex items-center justify-center">
                <div className="w-[2px] h-20 bg-black/30 rounded-full"></div>
              </div>
              <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
            </div>

            {/* Right Refrigerator Door */}
            <div
              className="fridge-door-right absolute top-0 right-0 w-1/2 h-full z-20 overflow-hidden will-change-transform border-l border-black/60 shadow-[-5px_0_25px_rgba(0,0,0,0.6)]"
              style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
            >
              <div
                className="absolute top-0 right-0 w-[200%] h-full bg-cover bg-center"
                style={{ backgroundImage: "url('/flower-valley/flamingo-floor-.png')" }}
              ></div>
              <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-white/40 via-[#C39169] to-white/20"></div>
              <div className="absolute top-1/2 -translate-y-1/2 left-4 w-[6px] h-32 rounded-full bg-gradient-to-r from-neutral-500 via-white to-neutral-300 shadow-[0_0_15px_rgba(0,0,0,0.8)] flex items-center justify-center">
                <div className="w-[2px] h-20 bg-black/30 rounded-full"></div>
              </div>
              <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
            </div>

            {/* Center Door Seam Indicator */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none px-4 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9px] uppercase tracking-[0.25em] text-[#C39169] font-medium font-sans">
              Scroll to Open
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
        SCENE 6: PINNED OVERLAPPING GALLERY
        ========================================= */}
      <section
        ref={scene6GalleryRef}
        onClick={() => openGalleryModal(0)}
        className="scene6-gallery relative w-full h-screen bg-black overflow-hidden flex items-center justify-center z-[40] cursor-none"
      >
        <div onClick={(e) => { e.stopPropagation(); openGalleryModal(0); }} className="gallery-img-1 absolute top-[0%] left-[0%] w-[20vw] h-[50vh] z-10 cursor-pointer">
          <Image src="/flower-valley/flower3.png" alt="Gallery 1" fill className="object-cover opacity-75" />
        </div>

        <div onClick={(e) => { e.stopPropagation(); openGalleryModal(1); }} className="gallery-img-2 absolute top-[5%] left-[25%] w-[28vw] h-[25vh] z-10 cursor-pointer">
          <Image src="/flower-valley/scrollselene5.png" alt="Gallery 2" fill className="object-cover opacity-80" />
        </div>

        <div onClick={(e) => { e.stopPropagation(); openGalleryModal(2); }} className="gallery-img-3 absolute top-[0%] right-[0%] w-[18vw] h-[55vh] z-10 cursor-pointer">
          <Image src="/flower-valley/flower8.png" alt="Gallery 3" fill className="object-cover opacity-80" />
        </div>

        <div onClick={(e) => { e.stopPropagation(); openGalleryModal(3); }} className="gallery-img-4 absolute bottom-[0%] left-[33%] w-[35vw] h-[70vh] z-20 cursor-pointer">
          <Image src="/flower-valley/scrollselene4.png" alt="Gallery 4" fill className="object-cover" />
        </div>

        <div onClick={(e) => { e.stopPropagation(); openGalleryModal(4); }} className="gallery-img-5 absolute bottom-[0%] right-[4%] w-[25vw] h-[32vh] z-10 cursor-pointer">
          <Image src="/flower-valley/Golf-Course-Road.png" alt="Gallery 5" fill className="object-cover opacity-80" />
        </div>

        <div className="absolute inset-0 z-30 pointer-events-none flex items-center">
          <div className="w-full max-w-[1400px] mx-auto relative px-10 h-full flex items-center">
            <div className="absolute left-1/2 -translate-x-1/2 flex items-baseline gap-4 top-[5%] md:top-[8%] z-[50] w-full justify-center pointer-events-none">
              <h2 className="gallery-title text-white text-5xl md:text-[70px] lg:text-[90px] font-light tracking-tight uppercase leading-none drop-shadow-2xl font-serif">
                Visual Index
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
        SCENE 7: LUXURY CHRONOMETER CLOCK & TIMEFLOW
        ========================================= */}
      <div className="scene7-wrapper relative w-full h-[100vh] z-[30]">
        <section ref={scene7ClockRef} className="relative w-full h-full flex overflow-hidden z-[30] bg-[#04060A]">
          {/* Dynamic Image Panel */}
          <div className="w-[50%] h-full relative overflow-hidden">
            {clockData.map((data, index) => {
              let positionClass = "translate-x-full opacity-0 z-0";
              if (index === currentClockIndex) {
                positionClass = "translate-x-0 opacity-100 z-10 scale-100";
              } else if (index === (currentClockIndex - 1 + clockData.length) % clockData.length) {
                positionClass = "-translate-x-full opacity-0 z-0 scale-105";
              }

              return (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-all duration-[1400ms] ease-in-out ${positionClass}`}
                >
                  <Image src={data.image} alt="Service" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#04060A]/80 pointer-events-none"></div>
                </div>
              );
            })}
          </div>

          {/* Right Clock Side */}
          <div className="w-[50%] h-full bg-[#04060A] relative flex flex-col justify-between py-14 px-12 md:px-20">
            <div className="flex items-center justify-between z-20 border-b border-white/10 pb-6">
              <div>
                <span className="text-[#C39169] text-[10px] font-medium uppercase tracking-[0.3em] block font-sans">
                  The Daily Cadence
                </span>
                <span className="text-white/45 text-xs font-light font-sans tracking-wider">
                  24 hours inside Flower Valley
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#C39169]"></span>
                <span className="text-xs uppercase font-sans tracking-widest text-[#C39169] font-medium">
                  {clockData[currentClockIndex].period}
                </span>
              </div>
            </div>

            <div className="relative h-[160px] flex items-center justify-between z-20">
              <div className="relative h-full flex-1 overflow-hidden">
                {clockData.map((data, index) => {
                  let textClass = "translate-y-full opacity-0";
                  if (index === currentClockIndex) textClass = "translate-y-0 opacity-100";
                  else if (index === (currentClockIndex - 1 + clockData.length) % clockData.length) textClass = "-translate-y-full opacity-0";

                  return (
                    <div
                      key={index}
                      className={`absolute left-0 top-0 h-full flex flex-col justify-center transition-all duration-[1200ms] ease-out ${textClass}`}
                    >
                      <h2 className="text-white text-6xl md:text-7xl lg:text-[84px] font-light tracking-tight leading-none font-serif flex items-baseline gap-3">
                        {data.time}
                        <span className="text-xs font-sans tracking-[0.2em] text-[#C39169] font-medium">HRS</span>
                      </h2>
                      <span className="text-[#C39169] text-sm font-light font-serif tracking-wide mt-2 block italic">
                        {data.tagline}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3 items-center">
                <button
                  onClick={prevClock}
                  aria-label="Previous Hour"
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#C39169] hover:text-[#C39169] transition-all cursor-pointer bg-white/5 backdrop-blur-sm"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  onClick={nextClock}
                  aria-label="Next Hour"
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#C39169] hover:text-[#C39169] transition-all cursor-pointer bg-white/5 backdrop-blur-sm"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative h-[110px] z-20 overflow-hidden border-t border-white/10 pt-4">
              {clockData.map((data, index) => {
                let descClass = "translate-y-6 opacity-0";
                if (index === currentClockIndex) descClass = "translate-y-0 opacity-100";
                else if (index === (currentClockIndex - 1 + clockData.length) % clockData.length) descClass = "-translate-y-6 opacity-0";

                return (
                  <p
                    key={index}
                    className={`absolute left-0 top-4 text-white/70 text-xs md:text-sm font-light leading-relaxed tracking-wide font-sans transition-all duration-[1200ms] ease-in-out ${descClass}`}
                  >
                    {data.text}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Clock Dial Accent */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-30 border border-[#C39169]/30 shadow-[0_0_80px_rgba(195,145,105,0.15)] font-serif"
            style={{ width: '84vh', height: '84vh' }}
          >
            <span className="absolute top-3 left-1/2 -translate-x-1/2 text-xs text-[#C39169]/70 tracking-widest">XII</span>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-[#C39169]/70 tracking-widest">VI</span>
            <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-[#C39169]/70 tracking-widest">III</span>
            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-xs text-[#C39169]/70 tracking-widest">IX</span>
          </div>

          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[0.5px] border-dashed border-white/20 rounded-full pointer-events-none z-30"
            style={{ width: '68vh', height: '68vh' }}
          ></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-tr from-[#C39169] to-[#eedbc8] border-2 border-black z-40 pointer-events-none shadow-[0_0_20px_rgba(195,145,105,0.8)] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-black"></div>
          </div>

          <div
            className="absolute top-1/2 left-1/2 pointer-events-none z-35 flex justify-center transition-transform duration-[1400ms] ease-in-out"
            style={{
              height: '42vh',
              transformOrigin: 'bottom center',
              transform: `translate(-50%, -100%) rotate(${getRotationAngles(clockData[currentClockIndex].time).minute}deg)`
            }}
          >
            <div className="w-[2px] h-full bg-gradient-to-t from-[#C39169] via-white to-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"></div>
          </div>

          <div
            className="absolute top-1/2 left-1/2 pointer-events-none z-35 flex justify-center transition-transform duration-[1400ms] ease-in-out"
            style={{
              height: '26vh',
              transformOrigin: 'bottom center',
              transform: `translate(-50%, -100%) rotate(${getRotationAngles(clockData[currentClockIndex].time).hour}deg)`
            }}
          >
            <div className="w-[4px] h-full bg-gradient-to-t from-white via-[#C39169] to-[#C39169] rounded-t-sm shadow-[0_0_10px_rgba(195,145,105,0.7)]"></div>
          </div>
        </section>
      </div>

      {/* =========================================
        SCENE 8: LUXURY EXPERIENCE
        ========================================= */}
      <div className="scene8-wrapper relative w-full h-[100vh] z-[30]">
        <section className="scene8-luxury relative w-full h-full flex overflow-hidden bg-[#050505] z-[30]">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/flower-valley/flower4.png"
              alt="Work in Nature"
              fill
              className="scene8-luxury-img object-cover opacity-90"
            />
          </div>

          <div className="absolute bottom-[25%] md:bottom-[30%] left-[2%] w-[55%] md:w-[42%] z-20">
            <p className="scene8-text text-white/90 text-sm md:text-base font-light leading-relaxed tracking-wide font-sans drop-shadow-lg">
              Dedicated work pavilions framed by living hedges and moving water—engineered for calm focus, deep work, and quiet contemplation.
            </p>
          </div>

          <div className="absolute bottom-[10%] right-[2%] z-20 text-right">
            <h2 className="scene8-text text-white text-[42px] md:text-[54px] font-light leading-none font-serif">
              Work & Quiet Study
            </h2>
          </div>
        </section>
      </div>

      {/* =========================================
        SCENE 9 & 10: LOBBY & FITNESS (REVERSED HORIZONTAL SLIDE)
        ========================================= */}
      <div className="scene9-10-spacer relative w-full h-[1100vh] z-[10] bg-black">
        <div className="scene9-10-wrapper sticky top-0 w-full h-[100vh] overflow-hidden">

          <section className="scene9-lobby absolute inset-0 w-full h-full bg-[#050505] z-[40]">
            {lobbyData.map((data, index) => (
              <div
                key={index}
                className="scene9-slide absolute inset-0 w-full h-full flex"
                style={{ zIndex: 10 + index }}
              >
                <div className="scene9-text w-[50%] h-full bg-black relative py-12 md:py-24 lg:py-32 pl-4 md:pl-8 pr-12 md:pr-24 lg:pr-32 flex flex-col justify-between">
                  <div className="text-white/40 text-xs font-medium tracking-[0.25em] mt-10 md:mt-0 font-sans">
                    <span className="text-[#C39169] mr-2">0{index + 1}</span> &bull; <span className="ml-2">0{lobbyData.length}</span>
                  </div>

                  <div className="text-white text-3xl md:text-4xl lg:text-5xl font-light font-serif tracking-normal">
                    {data.title}
                  </div>

                  <div className="text-white/70 text-xs md:text-sm font-light leading-relaxed tracking-wide text-left max-w-[420px] self-start mb-10 md:mb-0 font-sans">
                    {data.desc}
                  </div>
                </div>

                <div className="scene9-img w-[50%] h-full relative">
                  <Image src={data.image} alt={data.title} fill className="object-cover" />
                </div>
              </div>
            ))}
          </section>

          {/* SCENE 11: Dedicated Infrastructure (Set with building.png) */}
          <section className="scene11-infra absolute top-0 h-full w-full z-[40] flex items-center justify-end pr-4 md:pr-8 lg:pr-12 bg-[#050505]">
            <Image src="/flower-valley/building.png" alt="Infrastructure" fill className="object-cover opacity-85" priority />
            <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent pointer-events-none"></div>
            <h1 className="text-white text-[48px] md:text-[64px] font-light leading-none text-right uppercase z-10 drop-shadow-2xl inline-block w-[450px] font-serif">
              Infrastructure
            </h1>
          </section>

          {/* Fitness Horizontal Scroll */}
          <section className="scene10-fitness absolute top-0 h-full z-[50] flex bg-white" style={{ left: 0, width: 'max-content' }}>
            <div className="w-[25vw] h-full flex items-center pl-8 md:pl-12 lg:pl-16 shrink-0">
              <h2 className="text-2xl md:text-3xl font-light leading-[1.2] text-black font-serif">
                The Capri Club<br />&amp; Aquatic Grounds
              </h2>
            </div>

            <div className="w-[45vw] h-full relative shrink-0 pt-[57px] pb-[20px]">
              <div className="relative w-full h-full">
                <Image src="/flower-valley/scrollselene4.png" alt="Swimming Pool" fill className="object-cover" />
              </div>
            </div>

            <div className="w-[30vw] h-full flex items-end pb-[20px] pl-8 md:pl-12 shrink-0">
              <p className="text-xs md:text-sm font-normal text-black/80 leading-relaxed font-sans max-w-sm">
                Temperature-regulated waters, generous stone sun decks, and shaded daybeds designed for morning workouts or quiet hours with a book by the poolside.
              </p>
            </div>

            <div className="w-[25vw] h-full flex flex-col pt-[57px] pr-[9px] pb-[20px] shrink-0">
              <div className="relative w-full aspect-[320/551]">
                <Image src="/flower-valley/Steam.png" alt="Steam Room" fill className="object-cover" />
              </div>
            </div>

            <div className="w-[25vw] h-full flex flex-col pt-[57px] pb-[20px] shrink-0 pr-10">
              <div className="relative w-full aspect-[320/551]">
                <Image src="/flower-valley/Sauna.png" alt="Sauna" fill className="object-cover" />
              </div>
              <p className="mt-4 text-xs font-normal text-black/80 leading-relaxed font-sans">
                Aromatic cedar and smooth river stone saunas to restore vitality and decompress after active days.
              </p>
            </div>

            <div className="w-[25vw] h-full flex flex-col pt-[57px] pb-[20px] shrink-0">
              <div className="relative w-full aspect-[320/551]">
                <Image src="/flower-valley/Golf-Course-Road.png" alt="Grandeur View" fill className="object-cover" />
              </div>
            </div>

            <div className="w-auto h-full flex items-end pb-[20px] pl-10 md:pl-16 pr-8 md:pr-12 shrink-0">
              <p className="text-xs md:text-sm font-normal text-black/80 leading-relaxed font-sans max-w-xs">
                Miles of interconnected walking loops linking the nine signature parklands across Flower Valley.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* =========================================
        SCENE 12: INFRASTRUCTURE AMENITIES SLIDER
        ========================================= */}
      <div className="scene12-spacer relative w-full h-[200vh] -mt-[100vh] z-[30]">
        <div className="scene12-wrapper sticky top-0 w-full h-[100vh]">
          <section ref={scene12Ref} className="scene12-slider relative w-full h-full flex overflow-hidden bg-black">
            <div className="w-[50%] h-full relative overflow-hidden">
              {infraData.map((data, index) => {
                let positionClass = "translate-x-full opacity-0 z-0";
                if (index === currentInfraIndex) {
                  positionClass = "translate-x-0 opacity-100 z-10";
                } else if (index === (currentInfraIndex - 1 + infraData.length) % infraData.length) {
                  positionClass = "-translate-x-full opacity-0 z-0";
                }

                return (
                  <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-all duration-[1200ms] ease-in-out ${positionClass}`}
                  >
                    <Image src={data.image} alt={data.title} fill className="object-cover" />
                  </div>
                );
              })}
            </div>

            <div className="w-[50%] h-full bg-black relative flex flex-col justify-between py-10 md:py-16 px-8 md:px-16 lg:px-20">
              <div className="flex-1 flex flex-col justify-center z-20">
                <div className="relative h-[30px] overflow-hidden mb-3">
                  {infraData.map((data, index) => {
                    let labelClass = "translate-y-full opacity-0";
                    if (index === currentInfraIndex) labelClass = "translate-y-0 opacity-100";
                    else if (index === (currentInfraIndex - 1 + infraData.length) % infraData.length) labelClass = "-translate-y-full opacity-0";

                    return (
                      <p
                        key={index}
                        className={`absolute left-0 top-0 text-[#C39169] text-[10px] md:text-xs font-medium uppercase tracking-[0.25em] font-sans transition-all duration-[1200ms] ease-in-out ${labelClass}`}
                      >
                        {data.label}
                      </p>
                    );
                  })}
                </div>

                <div className="relative h-[110px] md:h-[150px] overflow-hidden">
                  {infraData.map((data, index) => {
                    let titleClass = "translate-y-full opacity-0";
                    if (index === currentInfraIndex) titleClass = "translate-y-0 opacity-100";
                    else if (index === (currentInfraIndex - 1 + infraData.length) % infraData.length) titleClass = "-translate-y-full opacity-0";

                    return (
                      <h2
                        key={index}
                        className={`absolute left-0 top-0 text-white text-3xl md:text-4xl lg:text-[50px] font-light tracking-normal font-serif leading-[1.15] transition-all duration-[1200ms] ease-in-out ${titleClass}`}
                      >
                        {data.title}
                      </h2>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-6 z-20">
                <button
                  onClick={prevInfra}
                  aria-label="Previous amenity"
                  className="text-white hover:text-[#C39169] transition-colors cursor-pointer p-2"
                >
                  <svg width="34" height="12" viewBox="0 0 40 15" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M40 7.5H1M1 7.5L7.5 1M1 7.5L7.5 14" />
                  </svg>
                </button>
                <button
                  onClick={nextInfra}
                  aria-label="Next amenity"
                  className="text-white hover:text-[#C39169] transition-colors cursor-pointer p-2"
                >
                  <svg width="34" height="12" viewBox="0 0 40 15" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M0 7.5H39M39 7.5L32.5 1M39 7.5L32.5 14" />
                  </svg>
                </button>
              </div>

              <div className="absolute bottom-10 md:bottom-16 right-8 md:right-16 lg:right-20 flex items-center gap-2 text-white/40 text-xs font-mono tracking-widest z-20">
                <span className="text-[#C39169] font-medium">{currentInfraIndex + 1}</span>
                <span className="w-6 h-[1px] bg-white/30"></span>
                <span>{infraData.length}</span>
              </div>

              <div className="relative h-[120px] md:h-[130px] overflow-hidden z-20 mt-4">
                {infraData.map((data, index) => {
                  let descClass = "translate-y-8 opacity-0";
                  if (index === currentInfraIndex) descClass = "translate-y-0 opacity-100";
                  else if (index === (currentInfraIndex - 1 + infraData.length) % infraData.length) descClass = "-translate-y-8 opacity-0";

                  return (
                    <p
                      key={index}
                      className={`absolute left-0 bottom-0 right-0 text-white/70 text-xs md:text-sm font-light leading-relaxed tracking-wide font-sans transition-all duration-[1200ms] ease-in-out ${descClass}`}
                    >
                      {data.desc}
                    </p>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* =========================================
        SCENE 13: PRIVATE 2-ACRE PARK
        ========================================= */}
      <div className="scene13-wrapper relative w-full min-h-screen z-[60] bg-white -mt-[100vh] mb-[100vh]">
        <div className="w-full flex flex-col">
          <section ref={scene13Ref} className="scene13-park relative w-full min-h-screen pt-16 md:pt-24 px-4 md:px-8 lg:px-10 overflow-hidden shrink-0">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start h-full">
              <div className="md:col-span-5 flex flex-col justify-start h-full">
                <p className="text-xs md:text-sm font-normal text-black/70 leading-relaxed max-w-[420px] mb-12 font-sans">
                  The clubhouse experience at Central Park Flower Valley extends beyond recreation—offering quiet library lounges, culinary dining rooms, and personal wellness pavilions managed by dedicated hospitality teams.
                </p>

                <div className="scene13-img-left relative w-full max-w-[310px] h-[320px] overflow-hidden will-change-transform ml-auto md:translate-x-20 mt-12 md:mt-24 lg:mt-16">
                  <div
                    className="scene13-img-left-inner w-full h-full bg-contain bg-no-repeat bg-center will-change-transform origin-center"
                    style={{ backgroundImage: "url('/flower-valley/scrollselene10.png')" }}
                  ></div>
                </div>
              </div>

              <div className="md:col-span-7 flex flex-col items-end justify-start h-full">
                <div className="w-full text-right mb-6 md:mb-10">
                  <h2 className="text-4xl md:text-6xl lg:text-[72px] font-light text-black font-serif tracking-tight leading-[1.1]">
                    The Residents&apos;<br />
                    Clubhouse
                  </h2>
                </div>

                <div className="scene13-img-right relative w-full max-w-[620px] h-[515px] overflow-hidden will-change-transform">
                  <div
                    className="scene13-img-right-inner w-full h-full bg-contain bg-no-repeat bg-center will-change-transform origin-center"
                    style={{ backgroundImage: "url('/flower-valley/scrollselene5.png')" }}
                  ></div>
                </div>

                <div className="w-full max-w-[620px] mt-2 md:mt-4 text-left">
                  <p className="text-lg md:text-xl lg:text-[22px] font-light text-black/85 font-serif leading-[1.35]">
                    Over 1.2 lakh sq. ft. devoted to private social gatherings, heated lap pools, squash courts, and wellness programs designed around ease and quiet luxury.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="scene13-bottom-img relative w-full h-[80vh] shrink-0 mt-16 md:mt-24 px-4 md:px-8 lg:px-10 pb-16">
            <div className="relative w-full h-full overflow-hidden">
              <div
                className="scene13-bottom-img-inner w-full h-full bg-cover bg-center will-change-transform origin-center"
                style={{ backgroundImage: "url('/flower-valley/Fleur Villa.png')" }}
              ></div>

              <div className="absolute top-8 md:top-12 right-8 md:right-12 z-10 pointer-events-none">
                <span className="text-black font-medium tracking-[0.25em] text-xs uppercase drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] font-sans">
                  The Residence Plans
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
        SCENE 14: VEDAM APARTMENTS FLOOR PLANS
        ========================================= */}
      <div className="scene14-wrapper fixed bottom-0 left-0 w-full h-screen z-[1] bg-black flex flex-col md:flex-row overflow-hidden border-t border-white/10 font-sans">
        <div className="w-full md:w-1/2 h-full flex flex-col pt-24 md:pt-28 pb-8 md:pb-12 pl-4 pr-6 md:pl-8 md:pr-8 lg:pl-12 lg:pr-12 bg-black relative border-r border-white/10">
          <div className="flex flex-wrap shrink-0 gap-[24px] md:gap-[40px] text-xs font-medium tracking-[0.2em] text-white uppercase pb-[18px] -mb-[1px] border-b border-white/15 w-full z-10">
            {splendidTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSplendidTab(tab)}
                className={`transition-colors cursor-pointer pb-2 ${activeSplendidTab === tab ? 'text-[#C39169] border-b-2 border-[#C39169]' : 'text-white/50 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col mt-4 md:mt-6 relative mb-[20px]">
            <div className="flex items-start text-white font-serif font-light tracking-tight leading-none mb-4 md:mb-6">
              <span className="text-4xl md:text-5xl lg:text-6xl transition-all duration-500">{splendidData[activeSplendidTab].area}</span>
            </div>

            <div className="w-full mt-2 md:mt-4 overflow-hidden rounded border border-white/15 transition-all duration-500">
              <table className="w-full text-left text-white">
                <tbody>
                  <tr className="border-b border-white/15">
                    <th className="py-4 px-5 bg-white/[0.03] font-medium text-xs tracking-wider uppercase w-1/3 text-white/50 align-middle">
                      Unit Designation
                    </th>
                    <td className="py-4 px-5 font-light text-base md:text-lg">
                      {splendidData[activeSplendidTab].plotRange}
                    </td>
                  </tr>
                  <tr className="border-b border-white/15">
                    <th className="py-4 px-5 bg-white/[0.03] font-medium text-xs tracking-wider uppercase w-1/3 text-white/50 align-middle">
                      Super Built-Up Area
                    </th>
                    <td className="py-4 px-5 font-light text-base md:text-lg">
                      {splendidData[activeSplendidTab].plotSize}
                    </td>
                  </tr>
                  <tr>
                    <th className="py-4 px-5 bg-white/[0.03] font-medium text-xs tracking-wider uppercase w-1/3 text-white/50 align-middle">
                      Primary Orientation
                    </th>
                    <td className="py-4 px-5 font-light text-base md:text-lg text-[#C39169]">
                      {splendidData[activeSplendidTab].primaryFacing}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-full relative">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/flower-valley/flamingo-floor-3.png')" }}
          ></div>

          <div className="absolute bottom-8 right-4 md:bottom-12 md:right-8 z-10 text-right">
            <h2 className="text-white text-3xl md:text-4xl font-light leading-tight uppercase font-serif tracking-normal drop-shadow-2xl">
              Vedam Luxury Floors<br />Floorplan Reference
            </h2>
          </div>
        </div>
      </div>

      {/* =========================================
        SCENE 15: TECHNOLOGIES AND SERVICES
        ========================================= */}
      <div className="scene15-container relative w-full flex flex-col md:flex-row bg-black border-t border-white/10 z-[20]">
        <div className="w-full md:w-1/2 h-screen sticky top-0 left-0 border-r border-white/10 overflow-hidden">
          <div className="scene15-img-1 absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700 opacity-100" style={{ backgroundImage: "url('/flower-valley/scrollselene5.png')" }}></div>
          <div className="scene15-img-2 absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700 opacity-0" style={{ backgroundImage: "url('/flower-valley/flower4.png')" }}></div>
          <div className="scene15-img-3 absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700 opacity-0" style={{ backgroundImage: "url('/flower-valley/Golf-Course-Road.png')" }}></div>
          <div className="scene15-img-4 absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700 opacity-0" style={{ backgroundImage: "url('/flower-valley/scrollselene4.png')" }}></div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col relative z-10 font-sans">
          <div className="sticky top-[35vh] right-0 w-full text-right pl-6 pr-2 md:pl-12 md:pr-8 lg:pl-20 lg:pr-12 z-20 pointer-events-none">
            <h2 className="text-white text-xl md:text-2xl font-light uppercase font-serif tracking-wide">
              Estate Amenities &bull; Services
            </h2>
          </div>

          <div className="flex flex-col gap-12 md:gap-16 pt-[45vh] pb-12 pl-4 pr-4 md:pl-6 lg:pl-10 items-center md:items-start">
            <div className="scene15-box flex flex-col justify-between border p-7 bg-black transition-all duration-500 ease-out"
              style={{ width: '320px', height: '280px', color: '#FFFFFF', borderColor: '#C39169' }}>
              <h3 className="uppercase tracking-widest text-xs text-[#C39169] font-medium font-sans">1.2 Lakh Sq. Ft. Club Capri</h3>
              <p className="text-white/80 text-sm font-light leading-relaxed font-sans">
                Fine dining venues, temperature-controlled pools, screening theaters, and private banquet salons set directly within the estate grounds.
              </p>
            </div>

            <div className="scene15-box flex flex-col justify-between border p-7 bg-black transition-all duration-500 ease-out"
              style={{ width: '320px', height: '280px', color: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.15)' }}>
              <h3 className="uppercase tracking-widest text-xs font-medium font-sans">Quiet Garden Work Suites</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed font-sans">
                Air-purified, private work cabanas designed for uninterrupted study, conference calls, and creative work with garden vistas.
              </p>
            </div>

            <div className="scene15-box flex flex-col justify-between border p-7 bg-black transition-all duration-500 ease-out"
              style={{ width: '320px', height: '280px', color: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.15)' }}>
              <h3 className="uppercase tracking-widest text-xs font-medium font-sans">24/7 Five-Star Concierge</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed font-sans">
                Central Park’s hospitality protocol encompassing housekeeping on demand, property upkeep, chauffeur logistics, and guest reception.
              </p>
            </div>

            <div className="scene15-box flex flex-col justify-between border p-7 bg-black transition-all duration-500 ease-out"
              style={{ width: '320px', height: '280px', color: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.15)' }}>
              <h3 className="uppercase tracking-widest text-xs font-medium font-sans">The Aquatic Reserve</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed font-sans">
                Olympic lap swimming corridors, heated indoor therapy grottos, and shaded timber decks for low-impact conditioning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
        SCENE 16: RETREAT
        ========================================= */}
      <div className="scene16-penthouse relative w-full h-screen z-[30] overflow-hidden bg-black border-t border-white/10 font-sans">
        <div
          className="scene16-bg absolute inset-0 w-full h-[130%] -top-[15%] bg-cover bg-center will-change-transform"
          style={{ backgroundImage: "url('/flower-valley/flower1.png')" }}
        ></div>
        <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>

        <div className="relative z-10 w-full h-full flex flex-col justify-end pb-12 md:pb-20 px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-end w-full gap-8">
            <div className="w-full md:w-[42%] max-w-[620px] mb-4 md:mb-0">
              <p className="text-white/85 text-sm md:text-base font-light leading-relaxed tracking-wide drop-shadow-md">
                Evening twilight over the Aravalli foothills. Scented garden hedges, running stone cascades, and the quiet assurance of living in a protected low-density ecosystem.
              </p>
            </div>
            <div className="w-full md:w-[58%] text-right">
              <h2 className="text-white text-3xl md:text-5xl lg:text-[58px] font-light leading-[1.05] tracking-normal uppercase drop-shadow-2xl font-serif">
                Vedam Foothill Estate
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Cursors */}
      <div
        ref={scene6CursorRef}
        className="fixed top-0 left-0 w-[90px] h-[90px] md:w-[120px] md:h-[120px] border-[1px] border-white/70 flex flex-col justify-between p-3 md:p-4 z-[100] pointer-events-none opacity-0 drop-shadow-[0_0_8px_rgba(0,0,0,0.4)] font-sans"
        style={{ transform: 'translate(-50%, -50%)', scale: 0.8 }}
      >
        <span className="text-white text-[9px] md:text-xs font-medium tracking-[0.25em] uppercase">View</span>
        <span className="text-white text-sm md:text-lg self-end font-light">&gt;</span>
      </div>

      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[100px] h-[100px] border-[1px] border-white/70 flex items-center justify-center text-white pointer-events-none z-[100] transition-opacity duration-300 drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]"
        style={{ opacity: 0, scale: 0.8, transitionProperty: "opacity, scale" }}
      >
        <div ref={cursorArrowRef}></div>
      </div>

      {/* Full-Screen Gallery Modal */}
      <div
        ref={galleryModalRef}
        className="fixed inset-0 z-[200] flex pointer-events-none bg-[#050505] font-sans"
        style={{ visibility: 'hidden', clipPath: 'inset(100% 0% 0% 0%)' }}
      >
        <div ref={modalContentRef} className="absolute inset-0 z-[205] flex opacity-0">
          <div className="w-[35%] md:w-[25%] h-full bg-[#050505] flex items-center p-8 md:p-12 relative border-r border-white/5">
            <button
              onClick={closeGalleryModal}
              className="absolute top-8 left-8 w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white cursor-pointer group"
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:stroke-black transition-colors">
                <path d="M1 1L13 13M1 13L1" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            </button>

            <h2 className="text-white text-3xl md:text-4xl font-light tracking-tight uppercase font-serif">
              Gallery Index
            </h2>
          </div>

          <div id="gallery-modal-scroll" className="w-[65%] md:w-[75%] h-full bg-[#050505] overflow-y-auto overflow-x-hidden hide-scrollbar scroll-smooth">
            <div className="flex flex-col">
              <div className="relative w-full h-[100vh]">
                <Image src="/flower-valley/flower3.png" alt="Gallery 1" fill className="object-cover" />
              </div>
              <div className="relative w-full h-[100vh]">
                <Image src="/flower-valley/scrollselene5.png" alt="Gallery 2" fill className="object-cover" />
              </div>
              <div className="relative w-full h-[100vh]">
                <Image src="/flower-valley/flower8.png" alt="Gallery 3" fill className="object-cover" />
              </div>
              <div className="relative w-full h-[100vh]">
                <Image src="/flower-valley/scrollselene4.png" alt="Gallery 4" fill className="object-cover" />
              </div>
              <div className="relative w-full h-[100vh]">
                <Image src="/flower-valley/Golf-Course-Road.png" alt="Gallery 5" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full z-[100] bg-black">
        <Footer />
      </div>
    </>
  );
};

export default VedamPage;