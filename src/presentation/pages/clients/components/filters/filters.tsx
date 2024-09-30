import { Input } from "@/presentation/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select";
import { FiltersProps, FilterType } from "./filters-types";

export const Filters: React.FC<FiltersProps> = ({
  filterType,
  value,
  onInputChange,
  onSelectChange
}) => {
  return (
    <div className="flex gap-4 flex-grow mr-4">
      <Select value={filterType} onValueChange={onSelectChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={FilterType.Name}>Nome</SelectItem>
          <SelectItem value={FilterType.Age}>Idade</SelectItem>
          <SelectItem value={FilterType.Email}>E-mail</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder={`Filtrar...`}
        value={value}
        onChange={onInputChange}
        className="flex-grow"
      />
    </div>
  );
};
