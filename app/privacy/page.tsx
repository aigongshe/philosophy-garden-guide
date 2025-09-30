import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: `隐私政策 - ${siteConfig.name}`,
  description: '了解我们如何收集、使用和保护您的个人信息。我们承诺保护您的隐私权，并遵循最高的数据保护标准。',
  keywords: ['隐私政策', '数据保护', '个人信息', 'GDPR', '用户隐私'],
  robots: 'index, follow',
};

export default function PrivacyPage() {
  const lastUpdated = '2024年1月15日';

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            隐私政策
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            我们重视并保护您的隐私权。本政策说明我们如何收集、使用和保护您的个人信息。
          </p>
          <p className="text-sm text-gray-500 mt-4">
            最后更新：{lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>重要提示：</strong>使用我们的网站即表示您同意本隐私政策。如果您不同意本政策的任何部分，请不要使用我们的服务。
                </p>
              </div>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. 信息收集</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">1.1 自动收集的信息</h3>
            <p className="text-gray-700 mb-4">
              当您访问我们的网站时，我们可能会自动收集以下信息：
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>IP地址和地理位置信息</li>
              <li>浏览器类型和版本</li>
              <li>操作系统信息</li>
              <li>访问时间和页面浏览记录</li>
              <li>引荐网站信息</li>
              <li>设备信息（如屏幕分辨率、设备类型）</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">1.2 主动提供的信息</h3>
            <p className="text-gray-700 mb-4">
              您可能会主动向我们提供以下信息：
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>通过联系表单提供的姓名和邮箱地址</li>
              <li>订阅邮件列表时提供的邮箱地址</li>
              <li>评论或反馈中包含的个人信息</li>
              <li>通过邮件沟通提供的任何信息</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. 信息使用</h2>
            <p className="text-gray-700 mb-4">
              我们收集的信息用于以下目的：
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>网站运营：</strong>提供、维护和改进我们的网站服务</li>
              <li><strong>内容个性化：</strong>根据您的兴趣推荐相关内容</li>
              <li><strong>沟通交流：</strong>回复您的询问和提供客户支持</li>
              <li><strong>分析优化：</strong>分析网站使用情况，优化用户体验</li>
              <li><strong>安全保护：</strong>检测和防止欺诈、滥用和安全威胁</li>
              <li><strong>法律合规：</strong>遵守适用的法律法规要求</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. 信息分享</h2>
            <p className="text-gray-700 mb-4">
              我们承诺不会出售、租赁或以其他方式商业化您的个人信息。我们只在以下情况下分享您的信息：
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 服务提供商</h3>
            <p className="text-gray-700 mb-4">
              我们可能与可信的第三方服务提供商分享信息，包括：
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>网站托管：</strong>Vercel（网站托管和CDN服务）</li>
              <li><strong>分析服务：</strong>Google Analytics（网站访问分析）</li>
              <li><strong>邮件服务：</strong>用于发送通知和回复的邮件服务提供商</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 法律要求</h3>
            <p className="text-gray-700 mb-4">
              在以下情况下，我们可能会披露您的信息：
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>遵守法律义务或法院命令</li>
              <li>保护我们的权利、财产或安全</li>
              <li>保护用户或公众的安全</li>
              <li>防止或调查可能的违法行为</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. 数据安全</h2>
            <p className="text-gray-700 mb-4">
              我们采取适当的技术和组织措施来保护您的个人信息：
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>加密传输：</strong>使用SSL/TLS加密保护数据传输</li>
              <li><strong>访问控制：</strong>限制对个人信息的访问权限</li>
              <li><strong>定期审查：</strong>定期审查和更新安全措施</li>
              <li><strong>事件响应：</strong>建立数据泄露事件响应机制</li>
            </ul>
            <p className="text-gray-700 mb-4">
              但请注意，没有任何互联网传输或电子存储方法是100%安全的。我们无法保证绝对的安全性。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookie和跟踪技术</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Cookie的使用</h3>
            <p className="text-gray-700 mb-4">
              我们使用Cookie和类似技术来：
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>记住您的偏好设置</li>
              <li>分析网站使用情况</li>
              <li>提供个性化内容</li>
              <li>改善网站性能</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Cookie管理</h3>
            <p className="text-gray-700 mb-4">
              您可以通过浏览器设置管理Cookie：
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>禁用或删除Cookie</li>
              <li>设置Cookie接受偏好</li>
              <li>接收Cookie设置通知</li>
            </ul>
            <p className="text-gray-700 mb-4">
              请注意，禁用Cookie可能会影响网站的某些功能。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. 您的权利</h2>
            <p className="text-gray-700 mb-4">
              根据适用的数据保护法律，您享有以下权利：
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>访问权：</strong>要求获取我们持有的关于您的个人信息</li>
              <li><strong>更正权：</strong>要求更正不准确或不完整的个人信息</li>
              <li><strong>删除权：</strong>要求删除您的个人信息（"被遗忘权"）</li>
              <li><strong>限制处理权：</strong>要求限制对您个人信息的处理</li>
              <li><strong>数据可携权：</strong>要求以结构化格式获取您的个人信息</li>
              <li><strong>反对权：</strong>反对基于合法利益的数据处理</li>
            </ul>
            <p className="text-gray-700 mb-4">
              如需行使这些权利，请通过 <a href={`mailto:${siteConfig.author.social.email}`} className="text-primary-600 hover:text-primary-700">
                {siteConfig.author.social.email}
              </a> 联系我们。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. 数据保留</h2>
            <p className="text-gray-700 mb-4">
              我们只在必要的时间内保留您的个人信息：
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>网站分析数据：</strong>通常保留26个月</li>
              <li><strong>联系信息：</strong>在您要求删除之前一直保留</li>
              <li><strong>邮件通信：</strong>根据业务需要和法律要求保留</li>
              <li><strong>技术日志：</strong>通常保留12个月</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. 国际数据传输</h2>
            <p className="text-gray-700 mb-4">
              您的信息可能会被传输到您所在国家/地区以外的地方进行处理。我们确保：
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>只与提供适当保护措施的国家/地区进行数据传输</li>
              <li>与数据处理方签署适当的数据保护协议</li>
              <li>遵循适用的数据保护法律要求</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. 儿童隐私</h2>
            <p className="text-gray-700 mb-4">
              我们的网站不针对13岁以下的儿童。我们不会故意收集13岁以下儿童的个人信息。如果我们发现收集了此类信息，我们将立即删除。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. 政策更新</h2>
            <p className="text-gray-700 mb-4">
              我们可能会不时更新本隐私政策。重大变更时，我们将：
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>在网站上发布更新的政策</li>
              <li>更新页面顶部的"最后更新"日期</li>
              <li>对于重大变更，可能会通过邮件通知您</li>
            </ul>
            <p className="text-gray-700 mb-4">
              建议您定期查看本政策以了解任何变更。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. 联系我们</h2>
            <p className="text-gray-700 mb-4">
              如果您对本隐私政策有任何问题或疑虑，请通过以下方式联系我们：
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-2">
                <strong>邮箱：</strong>
                <a href={`mailto:${siteConfig.author.social.email}`} className="text-primary-600 hover:text-primary-700 ml-2">
                  {siteConfig.author.social.email}
                </a>
              </p>
              <p className="text-gray-700 mb-2">
                <strong>网站：</strong>
                <a href={siteConfig.url} className="text-primary-600 hover:text-primary-700 ml-2">
                  {siteConfig.url}
                </a>
              </p>
              <p className="text-gray-700">
                <strong>负责人：</strong>{siteConfig.author.name}
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}