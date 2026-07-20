# AI Development Rules

## General

- Generate production-ready React code.
- Use Vite + React.
- Use Tailwind CSS v4.
- Keep components modular.
- Never generate unused code.
- Keep code clean and readable.

---

## Layout

- Use Flexbox or CSS Grid.
- Avoid absolute positioning unless it is required for the design.
- Keep layouts responsive.
- Desktop first, but ensure mobile compatibility.

---

## Styling

- Follow DESIGN_SYSTEM.md exactly.
- Never invent fonts.
- Never invent colors.
- Never invent spacing.
- Use Tailwind utility classes.
- Reuse design tokens whenever possible.

---

## Assets

- Never use Figma asset URLs.
- Use local assets from src/assets/.
- Use SVGs when available.

---

## Components

- Build one section only.
- Do not generate other sections.
- Create reusable components when appropriate.
- Keep components small and maintainable.

---

## Code Quality

- Use semantic HTML.
- Use accessible markup.
- Avoid inline styles unless absolutely necessary.
- Keep JSX clean.
- Remove unnecessary wrappers.

---

## Responsiveness

- Mobile
- Tablet
- Desktop

All layouts must adapt correctly.

---

## Animations

- Leave placeholders for animations.
- Do not replace animations with images.
- Assume Lottie or video assets will be added later.

---

## Output

Always return:
- JSX
- Tailwind classes
- Required imports
- Export statement

Do not explain the code unless asked.