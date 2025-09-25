import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { name: '首页', href: '/' },
      { name: '博客', href: '/posts' },
      { name: '分类', href: '/categories' },
      { name: '关于', href: '/about' },
    ],
    legal: [
      { name: '隐私政策', href: '/privacy' },
      { name: '使用条款', href: '/terms' },
      { name: '联系我们', href: '/contact' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">哲</span>
              </div>
              <span className="text-xl font-bold">{siteConfig.name}</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {siteConfig.description}
            </p>
            <div className="flex space-x-4">
              <a
                href={siteConfig.author.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                aria-label="YouTube频道"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {siteConfig.author.social.email && (
                <a
                  href={`mailto:${siteConfig.author.social.email}`}
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  aria-label="邮箱联系"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              导航
            </h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              法律信息
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} {siteConfig.name}. 保留所有权利。
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              由 {siteConfig.author.name} 创建，致力于分享智慧与成长
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}