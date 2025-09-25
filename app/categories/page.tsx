import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Categories from '@/components/Categories';

export const metadata: Metadata = {
  title: '智慧分类 - 哲学的花园导游',
  description: '按主题探索郭春林的哲学思维内容，包括商业智慧、人生哲学、教育理念等多个领域的深度文章',
  keywords: ['哲学分类', '商业智慧', '人生哲学', '教育理念', '个人成长', '郭春林'],
  openGraph: {
    title: '智慧分类 - 哲学的花园导游',
    description: '按主题探索郭春林的哲学思维内容，包括商业智慧、人生哲学、教育理念等多个领域的深度文章',
  },
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-primary-800 to-accent-700 bg-clip-text text-transparent">
                智慧分类
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              探索不同领域的哲学思维，每个分类都是通往智慧的独特路径
            </p>
          </div>
        </section>
        
        <Categories />
      </main>
      <Footer />
    </div>
  );
}