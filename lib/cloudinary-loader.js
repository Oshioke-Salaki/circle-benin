'use client'

// next/image loader. Cloudinary resizes and picks the best format (AVIF/WebP) at the edge,
// so the site does not spend its own image-optimisation quota.
export default function cloudinaryLoader({ src, width, quality }) {
  if (src.startsWith('https://res.cloudinary.com/')) {
    const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`].join(',')
    return src.replace('/upload/', `/upload/${params}/`)
  }
  return `${src}?w=${width}`
}
