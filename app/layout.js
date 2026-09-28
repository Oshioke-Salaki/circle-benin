import { Bodoni_Moda } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { restaurant } from '../data/menu'
import Intro from '../components/brand/Intro'
import './globals.css'

// Bodoni Moda: a high-contrast Didone for the wordmark, section titles and dish names.
// It carries the lounge's evening glamour; Geist handles everything functional.
const display = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-display',
  style: ['normal', 'italic'],
  display: 'swap',
  adjustFontFallback: false,
})

const siteUrl = 'https://circlebenin.com'
const ogImage = 'https://res.cloudinary.com/dmpulmnb9/image/upload/c_fill,w_1200,h_630,f_jpg,q_auto/v1779655030/asun-rice_mrn1ni.jpg'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Circle Restaurant & Lounge | Benin City Menu',
  description: 'The Circle menu: cocktails, bites and bottles on a Benin City rooftop with skyline views. Browse the full menu, then reserve a table.',
  openGraph: {
    title: 'Circle Restaurant & Lounge',
    description: 'Cocktails, bites and vibes on a Benin City rooftop.',
    url: siteUrl,
    siteName: 'Circle Restaurant & Lounge',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport = {
  themeColor: '#0b090b',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

// Before first paint: apply the saved theme, and mark whether the opening moment already played this visit.
const bootScript = `(function(d){try{d.dataset.theme=localStorage.getItem('circle-theme')==='light'?'light':'dark'}catch(e){d.dataset.theme='dark'}try{d.dataset.intro=sessionStorage.getItem('circle-intro')?'seen':'play';sessionStorage.setItem('circle-intro','1')}catch(e){d.dataset.intro='seen'}})(document.documentElement)`

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: restaurant.name,
  url: siteUrl,
  telephone: restaurant.phone.replace(/\s/g, ''),
  image: ogImage,
  servesCuisine: ['Nigerian', 'Continental', 'Cocktails'],
  hasMenu: siteUrl,
  acceptsReservations: true,
  sameAs: [restaurant.instagramHref],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Benin City Mall (Shoprite), 18 Central Road',
    addressLocality: 'Benin City',
    addressRegion: 'Edo',
    addressCountry: 'NG',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '12:00', closes: '23:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday', 'Saturday'], opens: '12:00', closes: '01:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '13:00', closes: '22:00' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${display.variable} ${GeistSans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body>
        <Intro />
        {children}
        <div aria-hidden className="grain z-grain" />
      </body>
    </html>
  )
}
