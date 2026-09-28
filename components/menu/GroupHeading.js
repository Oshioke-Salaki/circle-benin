export default function GroupHeading({ children }) {
  return (
    <h3 className="mb-7 flex items-center gap-4 font-display text-2xl italic leading-[1.2] text-accent md:text-3xl">
      <span className="shrink-0 pb-1">{children}</span>
      <span aria-hidden className="h-px flex-1 bg-ink/10" />
    </h3>
  )
}
