const naira = new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 })

export const formatAmount = (value) => naira.format(value)

// The lowest price an item can be ordered at, used for "from" labels on bottle lists.
export function startingPrice(item) {
  if (typeof item.price === 'number') return item.price
  if (item.options?.length) return Math.min(...item.options.map((o) => o.price))
  return null
}
