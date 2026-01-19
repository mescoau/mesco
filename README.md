# Bastion

## Template Integrations

- Tailwind CSS v4
- Astro SEO - Powered by [@astrolib/seo](https://github.com/onwidget/astrolib/tree/main/packages/seo)
- Astro Sitemap - https://docs.astro.build/en/guides/integrations-guide/sitemap/

## Template Structure

The template follows a typical Astro project structure. You'll find the following key directories and files:

```
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

- `src/pages/`: Contains `.astro` and `.md` files. Each file becomes a route in your project based on its name.
- `src/components/`: Ideal for placing your Astro/React/Vue/Svelte/Preact components.
- `public/`: For static assets such as images that you want to serve directly.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |

Learn more - Explore more through Astro's official [documentation](https://docs.astro.build).

---
## Components

- Reusable components
  This template now includes reusable components, such as the `Text` component:

- Text Component  
  A versatile and reusable component for handling text across your project, ensuring consistency and easy customization.

- **HTML Tags:** Easily change the HTML element (like `p`, `h1`, `span`, `a`) using the `tag` prop, with `p` being the default.
- **Variants:** Pick from preset text styles (such as `displayXL` or `textBase`) for a consistent look.
- **Custom Classes:** Add or adjust styles with the `class` prop.
- **Accessibility:** Customize with additional props like `id`, `href`, `title`, and `style`.
- **Content Slot:** Add any content inside the component, including optional left and right icons.
  Example usage:

```astro
<Text tag="h1" variant="displayXL" class="text-center">
  Welcome to the new version!
</Text>
```

- Kicker Component  
  A small uppercase label for sections or banners.

- **Base styles:** Uppercase, `textSM` variant, `font-medium`.
- **Custom color:** Pass a `class` prop to set text color (or other utilities) while keeping the base casing/weight.
- **Content Slot:** Place your label text inside.
  Example usage:

```astro
<Kicker class="text-accent-500">Built for you</Kicker>
```

- Button Component  
  A customizable button component with options to fit your design needs:

- **Variants:** Choose from predefined styles like `default` (dark background) and `secondary` (lighter background), with support for dark mode.
- **Sizes:** Select `small` or `medium` for different button heights and padding.
- **Gaps:** Control the spacing between content with the `gapSize` prop (either `small` or `medium`).
- **Custom Classes:** Apply additional styles using the `class` prop.
- **Slots:** Include icons or extra content with optional `left-icon` and `right-icon` slots.  
  Example usage:

```astro
<!-- Default button -->
<Button size="small" variant="default">Default small</Button>
<!-- Button with icon -->
<Button iconOnly size="small" variant="default">·</Button>
<!-- Button as link -->
<Button isLink={true} href="#_" size="small" variant="default">Default small</Button>
```

- UnderlinedLink Component  
  An inline link with an animated underline and optional theme.

- **Variants:** `dark` (default, dark text) or `light` (light text) controlled via the `variant` prop.
- **Custom Classes:** Add more styling with the `class` prop.
- **Underline hover:** Underline animates on hover and text shifts to the secondary color.
  Example usage:

```astro
<UnderlinedLink href="/about" variant="light" class="text-lg">
  Learn more
</UnderlinedLink>
```

- Logo Component  
  SVG logo that inherits `currentColor` so you can recolor it via text utilities.

- **Sizing/Color:** Use the `class` prop to control height/width and text color (e.g., `text-white` or `text-base-900`).
- **Additional props:** Any other props are passed to the `<svg>` (e.g., `aria-label`, `role`).
  Example usage:

```astro
<Logo class="h-10 w-auto text-white" aria-label="Bastion logo" />
```

- Wrapper Component  
  A flexible layout component that helps with consistent spacing and alignment.

- **Variants:** The default `standard` variant includes responsive widths, centered content, and padding.
- **Custom Classes:** Add or change styles with the `class` prop.
- **Content Slot:** Easily add any child components or content inside.

```astro
<Wrapper variant="standard">
Your content goes here
</Wrapper>
```

## Navigation transparency

The main navigation supports an opt-in transparent mode that swaps colors on scroll.

- Default: solid white navigation on all pages.
- Transparent (opt-in): pass a flag on the page layout.

Enable transparent nav on a page

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
---

<BaseLayout navTransparent={true}>
  <!-- page content -->
</BaseLayout>
```

Force solid nav (explicit)

```astro
<BaseLayout navTransparent={false}>
  <!-- page content -->
</BaseLayout>
```

Notes
- `BaseLayout` forwards the flag to `Navigation`, which handles scroll-based color swapping for the logo, links, and mobile icons.
- If you render `Navigation` directly (outside the layout), it also supports `<Navigation transparent={true} />`.

---

### [Support](https://lexingtonthemes.com/legal/support/)
### [Documentation](https://lexingtonthemes.com/documentation/)
### [Get your bundle](https://lexingtonthemes.com)
