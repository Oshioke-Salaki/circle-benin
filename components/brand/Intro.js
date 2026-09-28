import { MARK, WORD, TAG } from './Logo'

// Opening moment (styles and timing live in globals.css under `.intro`).
export default function Intro() {
  return (
    <div aria-hidden className="intro z-grain">
      <svg viewBox="0 0 100 141.89" fill="currentColor" className="intro-mark">
        <path className="intro-rings" fillRule="evenodd" d={MARK} />
        <g className="intro-type">
          <path d={WORD} />
          <path d={TAG} />
        </g>
      </svg>
    </div>
  )
}
