import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeaturedPosts from '@/components/FeaturedPosts';
import YouTubeSection from '@/components/YouTubeSection';
import Categories from '@/components/Categories';
import SEOHead from '@/components/SEOHead';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.seo.keywords,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.seo.defaultImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.seo.defaultImage],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="首页"
        description={siteConfig.description}
        keywords={siteConfig.seo.keywords}
        url={siteConfig.url}
        type="website"
      />
      <Header />
      <main>
        <Hero />
        <YouTubeSection />
        <FeaturedPosts />
        <Categories />
      </main>
      <Footer />
    </div>
  );
}