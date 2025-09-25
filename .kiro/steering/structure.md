# Project Structure & Organization

## Directory Layout

```
├── app/                    # Next.js App Router (main application)
│   ├── globals.css        # Global Tailwind CSS styles
│   ├── layout.tsx         # Root layout with metadata and HTML structure
│   ├── page.tsx           # Homepage component
│   ├── posts/             # Blog-related pages
│   │   ├── page.tsx       # Blog listing page
│   │   └── [slug]/        # Dynamic blog post pages
│   ├── about/             # About page
│   └── api/               # API routes
│       ├── robots/        # robots.txt generation
│       └── sitemap/       # sitemap.xml generation
├── components/            # Reusable React components
├── lib/                   # Utility libraries and configurations
│   ├── config.ts          # Site configuration and metadata
│   └── types.ts           # TypeScript type definitions
└── scripts/               # Development and deployment scripts
```

## Component Organization

### Core Layout Components
- `Header.tsx` - Navigation with mobile responsive menu
- `Footer.tsx` - Site footer with links and branding
- `Hero.tsx` - Homepage hero section

### Content Components
- `PostCard.tsx` - Blog post preview cards
- `FeaturedPosts.tsx` - Featured blog posts section
- `Categories.tsx` - Category navigation and display
- `RelatedPosts.tsx` - Related content suggestions

### Specialized Components
- `YouTubeEmbed.tsx` - YouTube video integration with lazy loading
- `YouTubeSection.tsx` - YouTube content showcase
- `SEOHead.tsx` - SEO metadata management

## File Naming Conventions

- **Components**: PascalCase (e.g., `YouTubeEmbed.tsx`)
- **Pages**: lowercase with hyphens for routes (e.g., `[slug]/page.tsx`)
- **Utilities**: camelCase (e.g., `config.ts`, `types.ts`)
- **API routes**: lowercase (e.g., `route.ts`)

## Import Patterns

- Use `@/` path alias for imports from project root
- Import site config from `@/lib/config`
- Import types from `@/lib/types`
- Components imported with relative paths when in same directory

## Content Structure

### Blog Posts
- Managed through MDX files or data structures
- Include frontmatter with metadata (title, description, tags, etc.)
- Support for YouTube video integration via `youtubeVideoId` field
- SEO keywords and reading time calculations

### Configuration
- Site-wide settings in `lib/config.ts`
- Author information and social links centralized
- SEO defaults and keywords managed in config

## Styling Approach

- Tailwind utility classes for all styling
- Custom color palette defined in `tailwind.config.js`
- Responsive design with `sm:`, `md:`, `lg:` breakpoints
- Component-scoped styling, no global CSS beyond Tailwind base

## API Route Structure

- `/api/robots` - Dynamic robots.txt generation
- `/api/sitemap` - Dynamic sitemap.xml generation
- Routes return appropriate content-type headers
- SEO-optimized with proper meta information