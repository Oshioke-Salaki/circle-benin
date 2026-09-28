'use client'

import { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

// Dish photo with a shimmer placeholder while loading and a quiet monogram if the file fails.
// The parent sets the size and shape; this fills it.
export default function Photo({ src, alt, sizes, priority, className, imgClassName }) {
  const [state, setState] = useState('loading')

  return (
    <div className={twMerge('relative overflow-hidden bg-surface-2', className)}>
      {state === 'loading' && (
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-ink/[0.06] to-transparent" />
        </div>
      )}

      {state === 'error' ? (
        <div className="absolute inset-0 grid place-items-center">
          <span aria-hidden className="font-display text-4xl italic text-muted/60">{alt?.[0] ?? 'C'}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setState('ready')}
          onError={() => setState('error')}
          className={clsx(
            'object-cover transition-[opacity,transform] duration-700 ease-out',
            state === 'ready' ? 'opacity-100' : 'opacity-0',
            imgClassName
          )}
        />
      )}
    </div>
  )
}
