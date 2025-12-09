import React, { useState, useEffect } from 'react'
import Head from 'next/head'

interface MediaFile {
  id?: number
  name?: string
  url?: string
  formats?: any
}

interface Slot {
  id?: number
  Name?: string
  logo?: MediaFile | MediaFile[] | string
  link?: string
}

interface CasinoData {
  name: string
  description?: string
  url: string
  template?: string
  language_code: string
  allow_indexing: boolean
  redirect_404s_to_homepage: boolean
  use_www_version: boolean
  // Rich text content
  content?: string
  // Tupchiy specific fields
  tupchiy_hero_title?: string
  tupchiy_hero_subtitle?: string
  tupchiy_hero_bonus?: string
  tupchiy_cta_text?: string
  tupchiy_site_name?: string
  tupchiy_popup_bonus?: string
  // Repeatable components
  Slots?: Slot[]
  // Metadata
  _generated_at?: string
  _version?: string
  // Allow any other fields
  [key: string]: any
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --background: 220 20% 10%;
    --foreground: 45 100% 95%;
    --card: 220 25% 12%;
    --primary: 45 100% 50%;
    --primary-foreground: 220 20% 10%;
    --secondary: 220 25% 18%;
    --muted: 220 20% 15%;
    --muted-foreground: 220 15% 60%;
    --border: 220 20% 20%;
    --radius: 0.5rem;
  }

  body {
    font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: hsl(var(--background));
    color: hsl(var(--foreground));
    line-height: 1.6;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Header Styles */
  header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: hsla(var(--card), 0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid hsl(var(--border));
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .logo-icon {
    width: 2rem;
    height: 2rem;
    color: hsl(var(--primary));
  }

  .logo-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: hsl(var(--primary));
  }

  .header-buttons {
    display: flex;
    gap: 0.75rem;
  }

  .btn {
    padding: 0.5rem 1.5rem;
    font-weight: 600;
    border-radius: calc(var(--radius) * 2);
    cursor: pointer;
    transition: all 0.3s;
    border: none;
    font-size: 0.95rem;
  }

  .btn-outline {
    background: transparent;
    border: 2px solid hsl(var(--primary));
    color: hsl(var(--primary));
  }

  .btn-outline:hover {
    background: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
  }

  .btn-primary {
    background: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
  }

  .btn-primary:hover {
    opacity: 0.9;
  }

  .btn-lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }

  /* Navigation Styles */
  .nav-bar {
    background: hsl(var(--secondary));
    border-bottom: 1px solid hsl(var(--border));
  }

  .nav-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 0.75rem 0;
    overflow-x: auto;
  }

  .nav-link {
    color: hsl(var(--muted-foreground));
    text-decoration: none;
    font-weight: 500;
    white-space: nowrap;
    transition: color 0.3s;
  }

  .nav-link:hover {
    color: hsl(var(--primary));
  }

  /* Hero Banner Styles */
  .hero-section {
    position: relative;
    width: 100%;
    height: 600px;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--background)) 100%);
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, 
      hsla(var(--background), 0.9) 0%, 
      hsla(var(--background), 0.6) 50%, 
      transparent 100%);
  }

  .hero-content {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 40rem;
  }

  .hero-badge {
    display: inline-block;
    background: hsla(var(--primary), 0.2);
    color: hsl(var(--primary));
    padding: 0.25rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
    width: fit-content;
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    margin-bottom: 1rem;
    line-height: 1.1;
  }

  .hero-accent {
    color: hsl(var(--primary));
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: hsl(var(--foreground));
    margin-bottom: 0.5rem;
  }

  .hero-description {
    color: hsl(var(--muted-foreground));
    margin-bottom: 2rem;
  }

  .btn-hero {
    box-shadow: 0 0 30px hsla(var(--primary), 0.4);
  }

  /* Slots Section */
  .slots-section {
    padding: 4rem 0;
    background: hsl(var(--background));
  }

  .section-title {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    margin-bottom: 2rem;
  }

  .slider-container {
    position: relative;
  }

  .slider-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 50%;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.3s;
  }

  .slider-btn:hover {
    background: hsl(var(--secondary));
  }

  .slider-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .slider-btn-left {
    left: -1rem;
  }

  .slider-btn-right {
    right: -1rem;
  }

  .slots-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 0 2rem;
  }

  .slot-card {
    position: relative;
    border-radius: 0.75rem;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s;
  }

  .slot-card:hover {
    transform: scale(1.05);
  }

  .slot-image {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }

  .slot-overlay {
    position: absolute;
    inset: 0;
    background: hsla(var(--background), 0.8);
    opacity: 0;
    transition: opacity 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }

  .slot-card:hover .slot-overlay {
    opacity: 1;
  }

  .slot-name {
    color: hsl(var(--foreground));
    font-weight: 700;
    font-size: 1.125rem;
  }

  /* Bonuses Section */
  .bonuses-section {
    padding: 4rem 0;
    background: hsl(var(--secondary));
  }

  .bonuses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 0 2rem;
  }

  .bonus-card {
    background: hsl(var(--card));
    border-radius: 0.75rem;
    overflow: hidden;
    border: 1px solid hsl(var(--border));
    transition: all 0.3s;
  }

  .bonus-card:hover {
    border-color: hsl(var(--primary));
    box-shadow: 0 0 20px hsla(var(--primary), 0.2);
  }

  .bonus-header {
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bonus-icon {
    width: 3rem;
    height: 3rem;
    color: white;
  }

  .bonus-content {
    padding: 1rem;
    text-align: center;
  }

  .bonus-name {
    color: hsl(var(--foreground));
    font-weight: 700;
    font-size: 1.125rem;
    margin-bottom: 0.25rem;
  }

  .bonus-text {
    color: hsl(var(--primary));
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  /* Article Section */
  .article-section {
    padding: 4rem 0;
    background: hsl(var(--background));
  }

  .article-container {
    max-width: 56rem;
    margin: 0 auto;
  }

  .article-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .article-intro {
    font-size: 1.125rem;
    color: hsl(var(--muted-foreground));
    text-align: center;
    margin-bottom: 3rem;
  }

  .article-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .article-card {
    background: hsl(var(--card));
    padding: 1.5rem;
    border-radius: 1.5rem;
    box-shadow: 0 4px 20px hsla(var(--primary), 0.1);
  }

  .article-card h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    margin-bottom: 1rem;
  }

  .article-card p {
    color: hsl(var(--muted-foreground));
    line-height: 1.7;
    margin-bottom: 1rem;
  }

  .article-table {
    width: 100%;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  .article-table th {
    text-align: left;
    padding: 0.75rem 1rem;
    color: hsl(var(--foreground));
    font-weight: 600;
    border-bottom: 1px solid hsl(var(--border));
  }

  .article-table td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid hsla(var(--border), 0.5);
  }

  .article-table td:first-child {
    color: hsl(var(--muted-foreground));
  }

  .article-table td.primary {
    color: hsl(var(--primary));
  }

  .article-list {
    list-style: disc;
    padding-left: 1.5rem;
    color: hsl(var(--muted-foreground));
  }

  .article-list li {
    margin-bottom: 0.25rem;
  }

  /* Conclusion Section */
  .conclusion-section {
    padding: 4rem 0;
    background: hsl(var(--secondary));
  }

  .conclusion-card {
    background: hsl(var(--card));
    padding: 2rem;
    border-radius: 1.5rem;
    box-shadow: 0 4px 20px hsla(var(--primary), 0.1);
    text-align: center;
    max-width: 56rem;
    margin: 0 auto;
  }

  .conclusion-title {
    font-size: 2rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    margin-bottom: 1rem;
  }

  .conclusion-text {
    color: hsl(var(--muted-foreground));
    margin-bottom: 2rem;
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
  }

  .btn-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    box-shadow: 0 0 40px hsla(var(--primary), 0.5);
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }

  /* FAQ Section */
  .faq-section {
    padding: 4rem 0;
    background: hsl(var(--secondary));
  }

  .faq-container {
    max-width: 48rem;
    margin: 0 auto;
  }

  .faq-item {
    background: hsl(var(--card));
    border-radius: 1.5rem;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 4px 20px hsla(var(--primary), 0.1);
  }

  .faq-question {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    color: hsl(var(--foreground));
    cursor: pointer;
    user-select: none;
  }

  .faq-question:hover {
    color: hsl(var(--primary));
  }

  .faq-answer {
    color: hsl(var(--muted-foreground));
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid hsl(var(--border));
  }

  .faq-answer.hidden {
    display: none;
  }

  /* Footer */
  footer {
    background: hsl(var(--card));
    border-top: 1px solid hsl(var(--border));
    padding: 2rem 0;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .footer-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .footer-certifications {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .cert-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: hsl(var(--muted-foreground));
    font-size: 0.875rem;
  }

  .age-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 2px solid hsl(0 84% 60%);
    color: hsl(0 84% 60%);
    font-weight: 700;
    font-size: 0.875rem;
  }

  .footer-links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .footer-link {
    color: hsl(var(--muted-foreground));
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.3s;
  }

  .footer-link:hover {
    color: hsl(var(--primary));
  }

  .footer-bottom {
    padding-top: 1.5rem;
    border-top: 1px solid hsl(var(--border));
    text-align: center;
  }

  .footer-copyright {
    color: hsl(var(--muted-foreground));
    font-size: 0.875rem;
  }

  /* Bonus Popup */
  .bonus-popup {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background: hsl(var(--card));
    border-top: 1px solid hsla(var(--primary), 0.3);
    box-shadow: 0 -4px 20px hsla(var(--primary), 0.2);
    animation: slideUp 0.3s ease-out;
  }

  .bonus-popup.hidden {
    display: none;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .popup-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    gap: 1rem;
  }

  .popup-text {
    font-size: 1.125rem;
    font-weight: 700;
    color: hsl(var(--primary));
    flex: 1;
    text-align: center;
  }

  .popup-buttons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn-close {
    padding: 0.25rem;
    color: hsl(var(--muted-foreground));
    background: transparent;
    border: none;
    cursor: pointer;
    transition: color 0.3s;
  }

  .btn-close:hover {
    color: hsl(var(--foreground));
  }

  /* Custom Content Section */
  .content-section {
    padding: 4rem 0;
    background: hsl(var(--background));
  }

  .content-wrapper {
    max-width: 56rem;
    margin: 0 auto;
    color: hsl(var(--foreground));
    line-height: 1.8;
    font-size: 1.125rem;
  }

  .content-wrapper h1, .content-wrapper h2, .content-wrapper h3, .content-wrapper h4 {
    color: hsl(var(--primary));
    margin: 2rem 0 1rem;
    font-weight: 700;
  }

  .content-wrapper h1 { font-size: 2.5rem; }
  .content-wrapper h2 { font-size: 2rem; }
  .content-wrapper h3 { font-size: 1.5rem; }

  .content-wrapper p {
    margin-bottom: 1.5rem;
    color: hsl(var(--muted-foreground));
  }

  .content-wrapper a {
    color: hsl(var(--primary));
    text-decoration: underline;
  }

  .content-wrapper a:hover {
    opacity: 0.8;
  }

  .content-wrapper ul, .content-wrapper ol {
    margin: 1.5rem 0;
    padding-left: 2rem;
    color: hsl(var(--muted-foreground));
  }

  .content-wrapper li {
    margin-bottom: 0.5rem;
  }

  .content-wrapper blockquote {
    border-left: 4px solid hsl(var(--primary));
    padding-left: 1.5rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: hsl(var(--muted-foreground));
  }

  .content-wrapper img {
    max-width: 100%;
    height: auto;
    border-radius: 1rem;
    margin: 1.5rem 0;
  }

  .content-wrapper table {
    width: 100%;
    margin: 1.5rem 0;
    border-collapse: collapse;
  }

  .content-wrapper th, .content-wrapper td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid hsl(var(--border));
    text-align: left;
  }

  .content-wrapper th {
    color: hsl(var(--foreground));
    font-weight: 600;
  }

  .content-wrapper td {
    color: hsl(var(--muted-foreground));
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
    }

    .hero-section {
      height: 500px;
    }

    .slots-grid,
    .bonuses-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .article-title {
      font-size: 2rem;
    }

    .popup-text {
      font-size: 0.875rem;
    }

    .header-buttons .btn {
      padding: 0.375rem 1rem;
      font-size: 0.875rem;
    }

    .content-wrapper {
      font-size: 1rem;
    }
  }
`;

export default function TupchiyTemplate() {
  const data: CasinoData = require('../data.json')
  const [slotStartIndex, setSlotStartIndex] = useState(0)
  const [bonusStartIndex, setBonusStartIndex] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [faqOpen, setFaqOpen] = useState<number | null>(null)

  const siteName = data.tupchiy_site_name || data.name || 'LuckySpin'
  const heroTitle = data.tupchiy_hero_title || 'Get 200% Bonus'
  const heroSubtitle = data.tupchiy_hero_subtitle || 'Up to €1,000 + 100 Free Spins'
  const heroBonus = data.tupchiy_hero_bonus || '🎰 Welcome Bonus'
  const ctaText = data.tupchiy_cta_text || 'Play Now'
  const popupBonus = data.tupchiy_popup_bonus || '🎁 Welcome Bonus: 100% up to $500 + 200 Free Spins!'

  // Mock slots data if not provided
  const slots = data.Slots && data.Slots.length > 0 ? data.Slots : [
    { id: 1, Name: 'Gem Rush', logo: '', link: '#' },
    { id: 2, Name: "Pharaoh's Gold", logo: '', link: '#' },
    { id: 3, Name: 'Lucky 777', logo: '', link: '#' },
    { id: 4, Name: 'Wild West', logo: '', link: '#' },
    { id: 5, Name: "Dragon's Fire", logo: '', link: '#' },
    { id: 6, Name: 'Ocean Treasure', logo: '', link: '#' },
    { id: 7, Name: 'Cosmic Slots', logo: '', link: '#' },
    { id: 8, Name: 'Viking Fortune', logo: '', link: '#' },
  ]

  const bonuses = [
    { id: 1, name: 'LuckySpin', bonus: '200% Welcome Bonus', color: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' },
    { id: 2, name: 'GoldenBet', bonus: '100 Free Spins', color: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' },
    { id: 3, name: 'RoyalWin', bonus: '500% First Deposit', color: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' },
    { id: 4, name: 'JackpotCity', bonus: 'No Wagering Bonus', color: 'linear-gradient(135deg, #ef4444 0%, #f43f5e 100%)' },
    { id: 5, name: 'SpinPalace', bonus: '50 Free Spins Daily', color: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)' },
    { id: 6, name: 'CasinoMax', bonus: '300% Match Bonus', color: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' },
    { id: 7, name: 'WinBig', bonus: 'Cashback 20%', color: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)' },
    { id: 8, name: 'FortunePlay', bonus: 'VIP Welcome Pack', color: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' },
  ]

  const faqs = [
    {
      question: 'How do I claim the welcome bonus?',
      answer: 'Simply register a new account and make your first deposit. The 200% bonus up to €1,000 will be automatically credited to your account along with 100 free spins on selected slots.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, e-wallets including PayPal, Skrill, and Neteller, bank transfers, and various cryptocurrencies. All transactions are secured with SSL encryption.',
    },
    {
      question: 'How long do withdrawals take?',
      answer: 'E-wallet withdrawals are processed within 24 hours. Card and bank transfer withdrawals typically take 2-5 business days depending on your banking provider.',
    },
    {
      question: 'Are your games fair?',
      answer: 'Yes, all our games use certified Random Number Generators (RNG) and are regularly audited by independent testing agencies. We hold licenses from multiple gaming authorities.',
    },
    {
      question: 'What is responsible gambling?',
      answer: 'Responsible gambling means playing within your means and for entertainment only. We offer deposit limits, self-exclusion options, and links to support organizations for anyone who needs help.',
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setShowPopup(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const visibleSlots = 5
  const visibleBonuses = 5

  const handleSlotPrev = () => {
    setSlotStartIndex((prev) => Math.max(0, prev - 1))
  }

  const handleSlotNext = () => {
    setSlotStartIndex((prev) => Math.min(slots.length - visibleSlots, prev + 1))
  }

  const handleBonusPrev = () => {
    setBonusStartIndex((prev) => Math.max(0, prev - 1))
  }

  const handleBonusNext = () => {
    setBonusStartIndex((prev) => Math.min(bonuses.length - visibleBonuses, prev + 1))
  }

  const getLogoUrl = (slot: Slot) => {
    if (!slot.logo) return ''
    if (typeof slot.logo === 'string') return slot.logo
    if (Array.isArray(slot.logo) && slot.logo.length > 0) return slot.logo[0].url || ''
    if (typeof slot.logo === 'object' && 'url' in slot.logo) return slot.logo.url || ''
    return ''
  }

  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content={data.description} />
        <meta name="robots" content={data.allow_indexing ? 'index,follow' : 'noindex,nofollow'} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div>
        {/* Header */}
        <header>
          <div className="container">
            <div className="header-content">
              <div className="logo">
                <svg className="logo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
                <span className="logo-text">{siteName}</span>
              </div>
              <div className="header-buttons">
                <button className="btn btn-outline">Login</button>
                <button className="btn btn-primary">Register</button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="nav-bar">
          <div className="container">
            <ul className="nav-content">
              <li><a href="#home" className="nav-link">Home</a></li>
              <li><a href="#slots" className="nav-link">Slots</a></li>
              <li><a href="#bonuses" className="nav-link">Bonuses</a></li>
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#faq" className="nav-link">FAQ</a></li>
            </ul>
          </div>
        </nav>

        {/* Hero Banner */}
        <section id="home" className="hero-section">
          <div className="hero-bg"></div>
          <div className="hero-overlay"></div>
          <div className="container">
            <div className="hero-content">
              <span className="hero-badge">{heroBonus}</span>
              <h1 className="hero-title">
                <span className="hero-accent">{heroTitle}</span>
              </h1>
              <p className="hero-subtitle">{heroSubtitle}</p>
              <p className="hero-description">
                Start your winning journey today with the best welcome offer in online gaming!
              </p>
              <button className="btn btn-primary btn-lg btn-hero">{ctaText}</button>
            </div>
          </div>
        </section>

        {/* Slots Section */}
        <section id="slots" className="slots-section">
          <div className="container">
            <h2 className="section-title">
              🎰 Popular <span className="hero-accent">Slots</span>
            </h2>
            <div className="slider-container">
              <button
                onClick={handleSlotPrev}
                disabled={slotStartIndex === 0}
                className="slider-btn slider-btn-left"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="slots-grid">
                {slots.slice(slotStartIndex, slotStartIndex + visibleSlots).map((slot, index) => {
                  const logoUrl = getLogoUrl(slot)
                  return (
                    <div key={slot.id || index} className="slot-card">
                      {logoUrl ? (
                        <img src={logoUrl} alt={slot.Name || `Slot ${index + 1}`} className="slot-image" />
                      ) : (
                        <div className="slot-image" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                          🎰
                        </div>
                      )}
                      <div className="slot-overlay">
                        <span className="slot-name">{slot.Name || `Slot ${index + 1}`}</span>
                        <button className="btn btn-primary" onClick={() => slot.link && window.open(slot.link, '_blank')}>
                          Play
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              <button
                onClick={handleSlotNext}
                disabled={slotStartIndex >= slots.length - visibleSlots}
                className="slider-btn slider-btn-right"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Bonuses Section */}
        <section id="bonuses" className="bonuses-section">
          <div className="container">
            <h2 className="section-title">
              🎁 Casino <span className="hero-accent">Bonuses</span>
            </h2>
            <div className="slider-container">
              <button
                onClick={handleBonusPrev}
                disabled={bonusStartIndex === 0}
                className="slider-btn slider-btn-left"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="bonuses-grid">
                {bonuses.slice(bonusStartIndex, bonusStartIndex + visibleBonuses).map((bonus) => (
                  <div key={bonus.id} className="bonus-card">
                    <div className="bonus-header" style={{ background: bonus.color }}>
                      <svg className="bonus-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                    </div>
                    <div className="bonus-content">
                      <h3 className="bonus-name">{bonus.name}</h3>
                      <p className="bonus-text">{bonus.bonus}</p>
                      <button className="btn btn-primary" style={{ width: '100%', padding: '0.5rem' }}>
                        Get Bonus
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleBonusNext}
                disabled={bonusStartIndex >= bonuses.length - visibleBonuses}
                className="slider-btn slider-btn-right"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Custom Content Section */}
        {data.content && (
          <section className="content-section">
            <div className="container">
              <div className="content-wrapper" dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
          </section>
        )}

        {/* Article Section */}
        <section id="about" className="article-section">
          <div className="container article-container">
            <h1 className="article-title">
              Your Ultimate Guide to <span className="hero-accent">Online Casino Gaming</span>
            </h1>
            <p className="article-intro">
              Discover the exciting world of online slots, bonuses, and winning strategies.
              Whether you're a beginner or seasoned player, we have everything you need.
            </p>

            <div className="article-content">
              <div className="article-card">
                <h2>How Online Slots Work</h2>
                <p>
                  Online slots use Random Number Generators (RNG) to ensure fair and unpredictable outcomes.
                  Each spin is independent, giving every player an equal chance of hitting the jackpot.
                </p>
                <table className="article-table">
                  <thead>
                    <tr>
                      <th>Slot Type</th>
                      <th>RTP</th>
                      <th>Volatility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Classic Slots</td>
                      <td className="primary">95-97%</td>
                      <td>Low</td>
                    </tr>
                    <tr>
                      <td>Video Slots</td>
                      <td className="primary">94-98%</td>
                      <td>Medium</td>
                    </tr>
                    <tr>
                      <td>Progressive Jackpots</td>
                      <td className="primary">88-94%</td>
                      <td>High</td>
                    </tr>
                  </tbody>
                </table>
                <ul className="article-list">
                  <li>Wild symbols substitute for other symbols to create wins</li>
                  <li>Scatter symbols trigger bonus features and free spins</li>
                  <li>Multipliers increase your winnings by 2x, 3x or more</li>
                  <li>Bonus rounds offer interactive mini-games with prizes</li>
                </ul>
              </div>

              <div className="article-card">
                <h2>Maximizing Your Bonuses</h2>
                <p>
                  Welcome bonuses are the best way to boost your bankroll when starting out.
                  Look for casinos offering matched deposits, free spins, and loyalty rewards.
                </p>
                <table className="article-table">
                  <thead>
                    <tr>
                      <th>Bonus Type</th>
                      <th>Value</th>
                      <th>Wagering</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Welcome Bonus</td>
                      <td className="primary">200%</td>
                      <td>30x</td>
                    </tr>
                    <tr>
                      <td>Free Spins</td>
                      <td className="primary">100 Spins</td>
                      <td>25x</td>
                    </tr>
                    <tr>
                      <td>Cashback</td>
                      <td className="primary">20%</td>
                      <td>No Wagering</td>
                    </tr>
                  </tbody>
                </table>
                <ul className="article-list">
                  <li>Always read the terms and conditions before claiming</li>
                  <li>Check wagering requirements - lower is better</li>
                  <li>Look for no-deposit bonuses to try risk-free</li>
                  <li>Join VIP programs for exclusive rewards</li>
                </ul>
              </div>

              <div className="article-card">
                <h2>Responsible Gaming Tips</h2>
                <p>
                  Set a budget before you play and stick to it. Gambling should always be entertainment,
                  not a way to make money. Take regular breaks and never chase losses.
                </p>
                <table className="article-table">
                  <thead>
                    <tr>
                      <th>Tool</th>
                      <th>Purpose</th>
                      <th>Access</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Deposit Limits</td>
                      <td>Control spending</td>
                      <td className="primary">Account Settings</td>
                    </tr>
                    <tr>
                      <td>Self-Exclusion</td>
                      <td>Take a break</td>
                      <td className="primary">Support Team</td>
                    </tr>
                    <tr>
                      <td>Reality Check</td>
                      <td>Time reminders</td>
                      <td className="primary">Auto-Enabled</td>
                    </tr>
                  </tbody>
                </table>
                <ul className="article-list">
                  <li>Set daily, weekly, or monthly deposit limits</li>
                  <li>Never gamble when stressed or emotional</li>
                  <li>Take regular breaks during gaming sessions</li>
                  <li>Seek help if gambling becomes a problem</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion Section */}
        <section className="conclusion-section">
          <div className="container">
            <div className="conclusion-card">
              <h2 className="conclusion-title">
                Ready to Start <span className="hero-accent">Winning?</span>
              </h2>
              <p className="conclusion-text">
                Join thousands of satisfied players who trust {siteName} for their online gaming experience.
                With secure payments, fair games, and exciting bonuses, your next big win is just a spin away.
                Register now and claim your 200% welcome bonus!
              </p>
              <button className="btn btn-primary btn-lg btn-pulse">
                🎰 Play Now
              </button>
            </div>
          </div>
        </section>

        {/* FA Section */}
        <section id="faq" className="faq-section">
          <div className="container faq-container">
            <h2 className="section-title">
              Frequently Asked <span className="hero-accent">Questions</span>
            </h2>
            <div>
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <div className="faq-question" onClick={() => setFaqOpen(faqOpen === index ? null : index)}>
                    <span>{faq.question}</span>
                    <span>{faqOpen === index ? '−' : '+'}</span>
                  </div>
                  <div className={`faq-answer ${faqOpen === index ? '' : 'hidden'}`}>
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className="container">
            <div className="footer-content">
              <div className="footer-top">
                <div className="logo">
                  <svg className="logo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '1.5rem', height: '1.5rem' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                  <span className="logo-text" style={{ fontSize: '1.25rem' }}>{siteName}</span>
                </div>

                <div className="footer-certifications">
                  <div className="cert-item">
                    <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>FairPlay</span>
                  </div>
                  <div className="age-badge">18+</div>
                  <div className="cert-item">
                    <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>GamCare</span>
                  </div>
                </div>

                <div className="footer-links">
                  <a href="#" className="footer-link">About Us</a>
                  <a href="#" className="footer-link">Terms & Conditions</a>
                  <a href="#" className="footer-link">Responsible Gambling</a>
                </div>
              </div>

              <div className="footer-bottom">
                <p className="footer-copyright">
                  © 2024 {siteName}. All rights reserved. Gambling can be addictive. Play responsibly.
                </p>
              </div>
            </div>
          </div>
        </footer>

        {/* Bonus Popup */}
        <div className={`bonus-popup ${showPopup ? '' : 'hidden'}`}>
          <div className="container">
            <div className="popup-content">
              <div className="logo">
                <svg className="logo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
                <span className="logo-text logo-text-mobile" style={{ fontSize: '1.25rem', display: 'none' }}>{siteName}</span>
              </div>

              <div className="popup-text">{popupBonus}</div>

              <div className="popup-buttons">
                <button className="btn btn-primary">Get Bonus</button>
                <button className="btn-close" onClick={() => setShowPopup(false)}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

