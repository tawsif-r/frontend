'use client'
import React from 'react'

const About = () => {
  return (
    <main className="flex-1 p-8 ml-16 transition-all duration-300">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          About Us
        </h1>

        <div className="shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">Why Instasure</h2>
              <p className="leading-relaxed">

                Insurance penetration in Bangladesh in GDP percentage declined to 0.40% in 2020, from 0.49% a year ago, according to a recent sigma report by Swiss Re Institute. The number is the lowest among reported South Asian countries. India has 4.2% while Sri Lanka 1.2% of their GDP. This 0.4% penetration rate put Bangladesh in 86th position in insurance market in the world. Bangladesh's economy is projected to reach $516.24 billion in the fiscal 2024-25, outperforming advanced economies such as Denmark, Singapore and Hong Kong along the way, says the International Monetary Fund (IMF). It is suppose to reach 1.2 Trillion USD in 2030 to become the 28th largest economy of the world.

                The average insurance penetration in emerging markets increased to 3.3% in 2017 (2016: 3.2%), as premium growth continued to outpace GDP growth within these economies. Bangladesh, is one of the countries featured on Goldman Sachs’ Next Eleven (N-11), and has been implementing regulatory reforms to reach that average number by 2030. Low insurance uptake in Bangladesh is somewhat due to the traditional distribution of insurance policies. They customarily rely on brick-and-mortar channels to sell and process policies. This takes a long processing cycle and has poor customer satisfaction and higher distribution costs.

                99% of Bangladeshi's don’t buy insurance, although there are more than 52 insurance companies. We felt that building the technological infrastructure to facilitate the distribution of insurance was the best way to increase the penetration level in Bangladesh. But selling directly to consumers would be a meticulous process as they rarely buy insurance from trusted organizations, let alone a third-party company. So Instasure adopted a B2B2C approach to leverage the trust already built by platforms that converse with customers daily and innovate around it.

                Instasure as an Embedded insurance company is all about distributing insurance solutions (traditional or innovative) through third-party businesses. It is embedded within the purchasing journey of an underlying product or service it is related to and could be packaged as an add-on, a bundle, or a transaction-triggered offer. The embedded insurance opportunity delivers the advantage of lower distribution costs through third-party ecosystem integration, relying on partner distribution capacity and customer relationships. This way, the customer is offered relevant and fully customized coverage at the point of sale, putting them in control and improving their overall experience. While in claim part ,typically it takes about 90 days for claims to
                be processed for an average Bangladesh insurer. Instasure is committed to reduce it to a week.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold  mb-2">What is Instasure</h2>
              <p className=" leading-relaxed">

                Insurance sector is often characterized as traditional and conservative with limited capacities for a profound transformation. However, Instasure believe digitally-enhanced services are no longer a nice-to-have and it's a shift no industry can ignore. The sector of insurance shouldn't be an exception. With the purpose of breaking the 0.4% insurance penetration barrier in Bangladesh, we built the first-ever 'insurance-as-a-service' platform in Bangladesh capable of meeting the rapidly evolving needs of today's Gen Z. Better cover for less cost and fast claim processing using technology. If this wasn't enough, Instasure is removing all excess on claims and allowing you to switch your cover off and back on with the push of a button.
                Instasure distributes insurance products through the 'ecosystem partners', and this ecosystem is vast. From ecommerce portals selling a multitude of products to travel sites selling air tickets and tour plans, and MFIs selling small-ticket loans, everyone is a part of the ecosystem for Instasure. We thus enables large insurance companies to reach out to ecosystem partners at zero marginal cost using its proprietary embedded insurance API suite. It allows the insurance companies to help assess the risk better, streamline partner and customer interaction, enhance claim settlement as well as make transactions smooth.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold  mb-2">Contact Us</h2>
              <p className="leading-relaxed">
                Have questions? Reach out to us at{' '}
                <a
                  href="mailto:support@example.com"
                  className="text-cyan-600 hover:text-cyan-800"
                >
                  Contact us by Phone Number or Email Address
                  +0880960-6252525
                  OR
                  info@instasure.xyz
                </a>
                . We’re here to help!
              </p>
            </section>
          </div>

          {/* Back Button */}
          <div className="p-6border-t border-gray-200">
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-6 py-2 bg-cyan-600 rounded-md 
                                    hover:bg-cyan-700 transition-colors duration-200 focus:outline-none 
                                    focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default About