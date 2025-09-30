import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
    title: `使用条款 - ${siteConfig.name}`,
    description: '了解使用我们网站的条款和条件。这些条款规定了您与我们网站互动时的权利和责任。',
    keywords: ['使用条款', '服务条款', '用户协议', '网站规则', '法律条款'],
    robots: 'index, follow',
};

export default function TermsPage() {
    const lastUpdated = '2024年1月15日';

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        使用条款
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        欢迎使用哲学的花园导游。这些条款规定了您使用我们网站时的权利和责任。
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        最后更新：{lastUpdated}
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-lg prose-gray max-w-none">
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-amber-700">
                                    <strong>重要提示：</strong>通过访问和使用本网站，您同意遵守这些使用条款。如果您不同意这些条款，请不要使用我们的网站。
                                </p>
                            </div>
                        </div>
                    </div>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. 接受条款</h2>
                        <p className="text-gray-700 mb-4">
                            通过访问、浏览或使用{siteConfig.name}网站（以下简称"本网站"），您确认已阅读、理解并同意受这些使用条款（以下简称"条款"）的约束。这些条款构成您与我们之间具有法律约束力的协议。
                        </p>
                        <p className="text-gray-700 mb-4">
                            如果您代表组织或实体使用本网站，您声明并保证您有权代表该组织或实体接受这些条款。
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. 网站描述</h2>
                        <p className="text-gray-700 mb-4">
                            {siteConfig.name}是一个专注于哲学思维、商业智慧和人生哲学的内容平台。我们提供：
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>原创的哲学思考和商业智慧文章</li>
                            <li>YouTube视频内容的整合和推广</li>
                            <li>教育性和启发性的内容分享</li>
                            <li>与读者的互动和交流平台</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. 使用许可</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 许可授予</h3>
                        <p className="text-gray-700 mb-4">
                            在您遵守这些条款的前提下，我们授予您有限的、非独占的、不可转让的许可，允许您：
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>访问和浏览本网站</li>
                            <li>阅读和分享我们的内容（需注明出处）</li>
                            <li>为个人、非商业目的使用网站功能</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 使用限制</h3>
                        <p className="text-gray-700 mb-4">
                            您不得：
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>复制、修改、分发或创建本网站内容的衍生作品</li>
                            <li>将内容用于商业目的（除非获得明确许可）</li>
                            <li>使用自动化工具（如爬虫、机器人）访问网站</li>
                            <li>尝试获取未授权的网站访问权限</li>
                            <li>干扰网站的正常运行</li>
                            <li>传播恶意软件或有害代码</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. 知识产权</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 我们的权利</h3>
                        <p className="text-gray-700 mb-4">
                            本网站及其所有内容，包括但不限于：
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>文章、博客文章和其他文本内容</li>
                            <li>图像、图形和视觉设计</li>
                            <li>网站代码和软件</li>
                            <li>商标、标志和品牌元素</li>
                            <li>网站的整体外观和感觉</li>
                        </ul>
                        <p className="text-gray-700 mb-4">
                            均受版权、商标和其他知识产权法律保护，归{siteConfig.author.name}或其许可方所有。
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 用户内容</h3>
                        <p className="text-gray-700 mb-4">
                            如果您向我们提交任何内容（如评论、反馈、建议），您授予我们永久的、全球性的、免版税的许可来使用、修改、展示和分发该内容。
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. 用户行为</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 可接受的使用</h3>
                        <p className="text-gray-700 mb-4">
                            您同意以负责任和合法的方式使用本网站。您的使用应当：
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>遵守所有适用的法律法规</li>
                            <li>尊重他人的权利和尊严</li>
                            <li>保持建设性和文明的交流</li>
                            <li>不侵犯他人的知识产权</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 禁止行为</h3>
                        <p className="text-gray-700 mb-4">
                            您不得在使用本网站时：
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>发布非法、有害、威胁、辱骂或诽谤性内容</li>
                            <li>骚扰、威胁或恐吓其他用户</li>
                            <li>传播垃圾邮件或未经请求的商业信息</li>
                            <li>冒充他人或虚假陈述您的身份</li>
                            <li>违反任何人的隐私权或其他权利</li>
                            <li>从事任何可能损害网站声誉的活动</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. 内容准确性</h2>
                        <p className="text-gray-700 mb-4">
                            虽然我们努力确保网站内容的准确性和时效性，但我们不对以下方面做出保证：
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>内容的完全准确性、完整性或时效性</li>
                            <li>内容适用于您的特定需求或情况</li>
                            <li>网站的持续可用性或无错误运行</li>
                        </ul>
                        <p className="text-gray-700 mb-4">
                            本网站的内容仅供一般信息和教育目的，不构成专业建议。在做出重要决定之前，请咨询相关专业人士。
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. 第三方链接</h2>
                        <p className="text-gray-700 mb-4">
                            本网站可能包含指向第三方网站的链接，包括但不限于：
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>YouTube频道和视频</li>
                            <li>相关的教育资源</li>
                            <li>推荐的书籍和材料</li>
                            <li>合作伙伴网站</li>
                        </ul>
                        <p className="text-gray-700 mb-4">
                            这些链接仅为方便用户而提供。我们不控制这些第三方网站，也不对其内容、隐私政策或做法负责。访问这些网站的风险由您自行承担。
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. 免责声明</h2>
                        <p className="text-gray-700 mb-4">
                            在法律允许的最大范围内，本网站按"现状"和"可用"基础提供，不提供任何明示或暗示的保证，包括但不限于：
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>适销性、特定用途适用性的暗示保证</li>
                            <li>不侵权的保证</li>
                            <li>持续可用性或无错误运行的保证</li>
                            <li>内容准确性或完整性的保证</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. 责任限制</h2>
                        <p className="text-gray-700 mb-4">
                            在任何情况下，{siteConfig.author.name}或其关联方均不对以下损失承担责任：
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>任何间接、偶然、特殊、后果性或惩罚性损害</li>
                            <li>利润损失、数据丢失或业务中断</li>
                            <li>因使用或无法使用网站而产生的任何损害</li>
                            <li>第三方内容或行为造成的任何损害</li>
                        </ul>
                        <p className="text-gray-700 mb-4">
                            我们的总责任不超过您在过去12个月内向我们支付的金额（如有）。
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. 赔偿</h2>
                        <p className="text-gray-700 mb-4">
                            您同意就因以下原因产生的任何索赔、损失、责任、损害、成本和费用（包括合理的律师费）对我们进行赔偿和免责：
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>您违反这些使用条款</li>
                            <li>您违反任何法律或第三方权利</li>
                            <li>您使用网站的方式</li>
                            <li>您提交的任何内容</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. 终止</h2>
                        <p className="text-gray-700 mb-4">
                            我们保留在任何时候，出于任何原因或无原因，暂停或终止您对网站的访问的权利，恕不另行通知。终止后：
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>您使用网站的许可立即终止</li>
                            <li>您必须停止使用网站的所有内容</li>
                            <li>这些条款中的相关条款将继续有效</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">12. 条款修改</h2>
                        <p className="text-gray-700 mb-4">
                            我们保留随时修改这些使用条款的权利。修改后的条款将在网站上发布，并在发布时生效。重大修改时，我们可能会：
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>更新页面顶部的"最后更新"日期</li>
                            <li>通过网站通知或邮件通知用户</li>
                            <li>提供合理的过渡期</li>
                        </ul>
                        <p className="text-gray-700 mb-4">
                            继续使用网站即表示您接受修改后的条款。
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">13. 适用法律</h2>
                        <p className="text-gray-700 mb-4">
                            这些使用条款受中华人民共和国法律管辖，不考虑法律冲突原则。任何争议应通过友好协商解决。如协商不成，应提交至网站运营地有管辖权的人民法院解决。
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">14. 可分割性</h2>
                        <p className="text-gray-700 mb-4">
                            如果这些条款的任何条款被认定为无效或不可执行，其余条款将继续完全有效。无效条款将被替换为在法律允许范围内最接近原意图的有效条款。
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">15. 完整协议</h2>
                        <p className="text-gray-700 mb-4">
                            这些使用条款，连同我们的隐私政策，构成您与我们之间关于使用本网站的完整协议，并取代所有先前或同期的协议、谅解或沟通。
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">16. 联系信息</h2>
                        <p className="text-gray-700 mb-4">
                            如果您对这些使用条款有任何问题或疑虑，请联系我们：
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
                                <strong>运营者：</strong>{siteConfig.author.name}
                            </p>
                        </div>
                    </section>

                    <div className="bg-blue-50 rounded-lg p-6 mt-8">
                        <p className="text-blue-800 text-sm">
                            <strong>感谢您使用{siteConfig.name}！</strong>我们致力于为您提供有价值的内容和良好的用户体验。如果您有任何建议或反馈，我们很乐意听取。
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}