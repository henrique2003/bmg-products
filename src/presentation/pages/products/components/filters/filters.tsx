import { Input } from "@/presentation/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select"
import { FiltersProps, FilterType } from "./filters-types"

export const Filters: React.FC<FiltersProps> = ({
  filterType,
  value,
  onInputChange,
  onSelectChange
}) => {
  return (
    <div className="flex gap-4 flex-grow mr-4">
      <Input
        placeholder={`Filtrar por ${filterType}...`}
        value={value}
        onChange={onInputChange}
        className="flex-grow"
      />
      <Select value={filterType} onValueChange={onSelectChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={FilterType.name}>Nome</SelectItem>
          <SelectItem value={FilterType.description}>Descrição</SelectItem>
          <SelectItem value={FilterType.price}>Preço</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
