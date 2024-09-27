import { ChangeEventHandler } from "react"

export type FiltersProps = {
  value?: string | undefined
  filterType: FilterType
  onInputChange?: ChangeEventHandler<HTMLInputElement> | undefined
  onSelectChange?(value: string): void
}

export enum FilterType {
  Name = 'name',
  Age = 'age',
  Email = 'email',
  Address = 'address'
}
