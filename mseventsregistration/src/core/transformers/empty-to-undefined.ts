import { Transform } from 'class-transformer'
export function EmptyToUndefined() {
  return Transform(({ value }) => {
    if (value === '' || value === null) return undefined

    return value
  })
}
