import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Categories, Posts } from '@/lib/data';

// 获取分类数据的函数
function getCategoryData(slug: string) {
  const category = Categories.getBySlug(slug);
  if (!category) return null;
  
  const posts = Posts.getByCategory(slug);
  return {
    ...category,
    posts: posts.map(post => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      readingTime: post.readingTime,
      publishedAt: post.publishedAt,
    }))
  };
}

type CategorySlug = string;

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = Categories.getBySlug(params.slug);
  
  if (!category) {
    return {
      title: '分类未找到 - 哲学的花园导游',
    };
  }

  return {
    title: `${category.name} - 哲学的花园导游`,
    description: category.description,
    keywords: [category.name, '郭春林', '哲学思维', '智慧分享'],
    openGraph: {
      title: `${category.name} - 哲学的花园导游`,
      description: category.description,
    },
  };
}

export async function generateStaticParams() {
  const allCategories = Categories.getAll();
  return allCategories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryData(params.slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Category Hero */}
        <section className={`py-20 bg-gradient-to-br ${category.color} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div className="text-8xl mb-6">{category.icon}</div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">{category.name}</h1>
            <p className="text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed mb-8">
              {category.description}
            </p>
            <div className="flex items-center justify-center space-x-6 text-white/80">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {category.posts.length} 篇文章
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                平均 {category.posts.length > 0 ? Math.round(category.posts.reduce((sum, post) => sum + post.readingTime, 0) / category.posts.length) : 0} 分钟阅读
              </div>
            </div>
          </div>
        </section>

        {/* Posts List */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {category.posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.posts.map((post) => (
                  <article
                    key={post.slug}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200"
                  >
                    <div className={`h-48 bg-gradient-to-br ${category.color} relative`}>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <div className="text-6xl">{category.icon}</div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors duration-300">
                        <Link href={`/posts/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {post.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {post.readingTime} 分钟
                        </div>
                        <time>
                          {new Date(post.publishedAt).toLocaleDateString('zh-CN')}
                        </time>
                      </div>
                      
                      <Link
                        href={`/posts/${post.slug}`}
                        className="inline-flex items-center text-primary-600 hover:text-primary-800 font-semibold mt-4 group/link"
                      >
                        阅读全文
                        <svg className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-6">📝</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">内容即将上线</h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  我们正在为这个分类准备高质量的内容，请关注我们的更新。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/posts"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-300"
                  >
                    浏览其他文章
                  </Link>
                  <Link
                    href="/categories"
                    className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 px-8 py-3 rounded-xl font-semibold transition-colors duration-300"
                  >
                    返回分类页面
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related Categories */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              探索其他分类
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Categories.getAll()
                .filter((cat) => cat.slug !== params.slug)
                .slice(0, 3)
                .map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className={`h-32 bg-gradient-to-br ${cat.color} relative`}>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <div className="text-4xl">{cat.icon}</div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                        {cat.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}