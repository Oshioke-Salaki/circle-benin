import Price from '../ui/Price'

// Bottle or variant list: name, leader, price.
export default function OptionList({ options }) {
  return (
    <ul className="space-y-2.5">
      {options.map((o) => (
        <li key={o.name} className="flex items-baseline gap-3 text-[0.95rem]">
          <span className="text-ink">{o.name}</span>
          <span aria-hidden className="leader" />
          <Price value={o.price} className="text-ink" />
        </li>
      ))}
    </ul>
  )
}
