import clsx from 'clsx'
import { formatAmount, startingPrice } from '../../lib/format'

export default function Price({ item, value, className }) {
  const amount = value ?? startingPrice(item)
  if (amount == null) return null
  const isFrom = value == null && typeof item?.price !== 'number'

  return (
    <span className={clsx('tabular whitespace-nowrap', className)}>
      {isFrom && <span className="mr-1 text-[0.8em] font-normal text-muted">from</span>}
      <span className="mr-[0.1em] text-[0.85em] text-muted">₦</span>
      {formatAmount(amount)}
    </span>
  )
}
