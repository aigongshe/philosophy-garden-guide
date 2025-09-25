# Technology Stack

## Framework & Runtime
- **Next.js 14** with App Router architecture
- **React 18** with TypeScript
- **Node.js 18+** required for development

## Styling & UI
- **Tailwind CSS 3.3+** for styling with custom color palette
- **Inter font** from Google Fonts as primary typeface
- Custom primary/accent color schemes defined in tailwind.config.js
- Responsive design with mobile-first approach

## Content Management
- **MDX** for blog content with @next/mdx integration
- **gray-matter** for frontmatter parsing
- **remark** and **remark-html** for markdown processing
- File-based content structure

## SEO & Performance
- **next-seo** for SEO optimization
- Built-in sitemap.xml and robots.txt generation via API routes
- Image optimization with Next.js Image component
- YouTube thumbnail domains whitelisted in next.config.js

## Development Tools
- **TypeScript 5** with strict mode enabled
- **ESLint** with Next.js configuration
- **PostCSS** and **Autoprefixer** for CSS processing
- Path aliases configured (@/* maps to root)

## Common Commands

### Development
```bash
npm run dev          # Start development server on localhost:3000
npm run build        # Build production version
npm run start        # Start production server
npm run lint         # Run ESLint checks
```

### Installation
```bash
npm install          # Install all dependencies
```

## Deployment
- **Vercel** for hosting and deployment
- Automatic deployments from Git repository
- Environment variables configured in Vercel dashboard

## Key Dependencies
- `@next/mdx` - MDX support for Next.js
- `next-seo` - SEO meta tags management
- `gray-matter` - YAML frontmatter parser
- `remark` - Markdown processor