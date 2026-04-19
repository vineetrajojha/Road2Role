import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function fadeUpOnScroll(selector: string, options = {}) {
  return gsap.fromTo(
    selector,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.85,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    }
  )
}

export function slideInFromLeft(selector: string) {
  return gsap.fromTo(
    selector,
    { x: -80, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    }
  )
}

export function growLine(selector: string) {
  return gsap.fromTo(
    selector,
    { scaleY: 0, transformOrigin: 'top center' },
    {
      scaleY: 1,
      duration: 1.5,
      ease: 'none',
      scrollTrigger: {
        trigger: selector,
        start: 'top 90%',
        end: 'bottom 10%',
        scrub: true,
      },
    }
  )
}

export function counterAnimation(element: Element, end: number, duration = 2) {
  const obj = { value: 0 }
  return gsap.to(obj, {
    value: end,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toLocaleString() + '+'
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      once: true,
    },
  })
}

export function heroTextReveal(containerSelector: string) {
  const tl = gsap.timeline()
  tl.fromTo(
    `${containerSelector} .hero-word`,
    { y: 100, opacity: 0, rotationX: -45 },
    {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'back.out(1.4)',
    }
  )
  return tl
}
