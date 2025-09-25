import Link from 'next/link';

interface PostCardProps {
  post: {
    slug: string;
    title: string;
    description: string;
    category: string;
    readingTime: number;
    publishedAt: string;
    featured?: boolean;
    tags: string[];
  };
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const categoryColors: { [key: string]: string } = {
    '哲学思维': 'bg-blue-100 text-blue-800',
    '商业智慧': 'bg-green-100 text-green-800',
    '人生哲学': 'bg-purple-100 text-purple-800',
    '教育理念': 'bg-orange-100 text-orange-800',
    '人际关系': 'bg-pink-100 text-pink-800',
    '个人成长': 'bg-indigo-100 text-indigo-800',
  };

  const categoryIcons: { [key: string]: string } = {
    '哲学思维': '🧠',
    '商业智慧': '💼',
    '人生哲学': '🌟',
    '教育理念': '📚',
    '人际关系': '🤝',
    '个人成长': '🚀',
  };

  return (
    <article className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${featured ? 'ring-2 ring-primary-100' : ''}`}>
      {/* Post Image Placeholder */}
      <div className={`${featured ? 'h-56' : 'h-48'} bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center relative`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-white text-2xl">
              {categoryIcons[post.category] || '📝'}
            </span>
          </div>
          <p className="text-gray-600 text-sm font-medium">{post.category}</p>
        </div>
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            精选
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="p-6">
        {/* Category & Reading Time */}
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-800'}`}>
            {post.category}
          </span>
          <span className="text-gray-500 text-sm flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readingTime} 分钟
          </span>
        </div>

        {/* Title */}
        <h3 className={`${featured ? 'text-xl' : 'text-lg'} font-bold text-gray-900 mb-3 line-clamp-2`}>
          <Link
            href={`/posts/${post.slug}`}
            className="hover:text-primary-600 transition-colors duration-200"
          >
            {post.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-gray-400">
              +{post.tags.length - 3} 更多
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <time className="text-gray-500 text-sm flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(post.publishedAt).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <Link
            href={`/posts/${post.slug}`}
            className="text-primary-600 hover:text-primary-800 font-medium text-sm transition-colors duration-200 flex items-center group"
          >
            阅读全文
            <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}