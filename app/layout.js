import { Playfair_Display, Outfit } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata = {
  title: 'Circle Restaurant & Lounge — Benin City',
  description: 'An unparalleled dining experience in the heart of Benin City. Where luxury meets the future of cuisine.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} bg-sexy-white`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
