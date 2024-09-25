import { ChangeEventHandler } from "react"

export type FiltersProps = {
  value?: string | undefined
  filterType: FilterType
  onInputChange?: ChangeEventHandler<HTMLInputElement> | undefined
  onSelectChange?(value: string): void
}

export enum FilterType {
  name = 'name' ,
  description = 'description',
  price = 'price'
}
