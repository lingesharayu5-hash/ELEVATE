# Elevate Motion System

## Philosophy

Motion should communicate quality and intention.

Animations should feel premium, smooth, and confident.

Never playful.

Never cartoonish.

Never distracting.

Every animation must support the content instead of competing with it.

---

# Global Rules

- Prefer transform + opacity.
- Never animate width or height.
- Never animate expensive layout properties.
- Always use hardware acceleration.
- Prefer requestAnimationFrame for scroll-driven interactions.
- Respect prefers-reduced-motion.
- Use subtle blur only during transitions.
- Motion should never reduce readability.

---

# Timing

Micro interactions:
150–250ms

Cards:
300–500ms

Section transitions:
500–700ms

Large storytelling animations:
700–1200ms

---

# Easing

Default:
cubic-bezier(0.16,1,0.3,1)

No bounce.

No elastic effects.

No overshoot unless intentionally designed.

---

# Scroll Philosophy

Scroll controls the animation.

Do not trigger animations after scrolling.

The scroll position IS the animation timeline.

Avoid IntersectionObserver for premium storytelling sections.

Use one requestAnimationFrame timeline whenever possible.

---

# Hero

- Cinematic entrance
- Floating illustration
- Mouse parallax
- Subtle glow
- Premium easing
- No excessive movement

---

# About

- Storytelling reveal
- Sequential content
- Minimal hover motion
- Small depth effects

---

# Services

Sticky storytelling section.

Only one active service.

Only one active visual.

Transitions are synchronized.

Text and visual move together.

Animations are driven by scroll progress.

Inactive visuals must be paused or unmounted.

---

# Portfolio

Image reveal

Depth on hover

Soft scaling

Subtle lighting

---

# Contact

Minimal motion

CTA emphasis

No distracting effects

---

# Performance Rules

60 FPS target.

Avoid unnecessary React re-renders.

Prefer refs for animations.

Cancel animations on unmount.

Never run hidden animations.

Keep animation logic isolated.

---

# Accessibility

Support prefers-reduced-motion.

Provide functional experience without animation.

Never rely on animation for understanding content.
# AI Rules

Do not invent animations.

Do not simplify existing animations.

Preserve animation behavior unless explicitly instructed.

If an HTML animation is provided,
convert it to React as faithfully as possible.

Never replace premium interactions with simple fade-ins.

Always prioritize smoothness and performance over animation quantity.