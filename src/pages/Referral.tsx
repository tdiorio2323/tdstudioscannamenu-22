import React, { useState } from 'react';
import { LiquidButton } from '@/components/LiquidGlass';
import { PremiumButton } from '@/components/PremiumButton';
import { Copy } from 'lucide-react';

const Referral: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a referral link (in real app, this would be handled by backend)
    const generatedLink = `https://tdstudios.com/ref/${name.toLowerCase().replace(/\s+/g, '')}-${Date.now()}`;
    setReferralLink(generatedLink);
    setIsGenerated(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
  };

  const rewards = [
    {
      tier: 'Bronze',
      referrals: '1-2 Referrals',
      reward: '10% Commission',
      bonus: '$50 Credit',
      icon: '🥉',
    },
    {
      tier: 'Silver',
      referrals: '3-5 Referrals',
      reward: '15% Commission',
      bonus: '$150 Credit',
      icon: '🥈',
    },
    {
      tier: 'Gold',
      referrals: '6-10 Referrals',
      reward: '20% Commission',
      bonus: '$300 Credit',
      icon: '🥇',
    },
    {
      tier: 'Platinum',
      referrals: '11+ Referrals',
      reward: '25% Commission',
      bonus: '$500 Credit',
      icon: '💎',
    },
  ];

  const benefits = [
    'Earn 10-25% commission on all referred sales',
    'Lifetime tracking of your referrals',
    'Monthly payouts via PayPal or bank transfer',
    'Exclusive access to new designs before public release',
    'Personalized referral dashboard',
    'No limit on earnings potential',
  ];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Referral Program
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Earn rewards by referring ambitious brands to our premium design services.
            Join our exclusive referral program and start earning today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Referral Form */}
          <div className="space-y-8">
            <div className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
              <h2 className="text-3xl font-bold text-white mb-6">Join the Program</h2>

              {!isGenerated ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  <PremiumButton type="submit" className="w-full justify-center px-7 py-3">
                    Generate My Referral Link
                  </PremiumButton>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">Your Referral Link</h3>
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={referralLink}
                        readOnly
                        className="flex-1 px-4 py-2 bg-black/30 backdrop-blur-sm border border-white/20 rounded text-white text-sm"
                      />
                      <LiquidButton onClick={copyToClipboard} size="md" className="gap-1.5">
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </LiquidButton>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-white/60 mb-4">
                      Share this link with teams who need elevated design and earn commissions!
                    </p>
                    <button
                      onClick={() => {
                        setIsGenerated(false);
                        setName('');
                        setEmail('');
                        setReferralLink('');
                      }}
                      className="text-white/80 hover:text-white underline"
                    >
                      Generate New Link
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* How it Works */}
            <div className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-6">How It Works</h3>
              <div className="space-y-4">
                {[
                  {
                    step: '01',
                    title: 'Generate Your Link',
                    description: 'Sign up and get your unique referral link instantly.',
                  },
                  {
                    step: '02',
                    title: 'Share with Brands',
                    description: 'Share your link with brands who need elevated design services.',
                  },
                  {
                    step: '03',
                    title: 'They Purchase',
                    description: 'When someone uses your link and makes a purchase, you earn.',
                  },
                  {
                    step: '04',
                    title: 'Get Paid',
                    description: 'Receive your commission monthly via PayPal or bank transfer.',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-white/60 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rewards Tiers */}
          <div className="space-y-8">
            <div className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Reward Tiers</h3>
              <div className="space-y-4">
                {rewards.map((reward, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{reward.icon}</span>
                        <h4 className="text-lg font-bold text-white">{reward.tier}</h4>
                      </div>
                      <span className="text-white/60 text-sm">{reward.referrals}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-white/60">Commission Rate</p>
                        <p className="text-white font-semibold">{reward.reward}</p>
                      </div>
                      <div>
                        <p className="text-white/60">Bonus Credit</p>
                        <p className="text-white font-semibold">{reward.bonus}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Program Benefits</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-white/60 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/70">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { number: '$50K+', label: 'Paid to Referrers' },
            { number: '200+', label: 'Active Referrers' },
            { number: '15%', label: 'Average Commission' },
            { number: '24/7', label: 'Link Tracking' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'When do I get paid?',
                answer: 'Commissions are paid monthly on the 15th of each month for the previous month\'s sales.',
              },
              {
                question: 'Is there a minimum payout?',
                answer: 'Yes, the minimum payout is $50. If you don\'t reach the minimum, your earnings roll over to the next month.',
              },
              {
                question: 'How long do referral links last?',
                answer: 'Referral links never expire and provide lifetime tracking for all customers who use them.',
              },
              {
                question: 'Can I refer myself?',
                answer: 'No, self-referrals are not allowed. The program is designed to reward genuine referrals from external sources.',
              },
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
                <h4 className="text-lg font-semibold text-white mb-3">{faq.question}</h4>
                <p className="text-white/60">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="max-w-4xl mx-auto p-12 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start Earning Today
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join our referral program and start earning commissions by sharing our premium design services
              with visionary brands in your network.
            </p>
            <PremiumButton
              className="mx-auto px-7 py-3"
              onClick={() => {
                if (!isGenerated) {
                  document.getElementById('name')?.focus();
                }
              }}
            >
              {isGenerated ? 'Link Generated! Start Sharing' : 'Get My Referral Link'}
            </PremiumButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;
