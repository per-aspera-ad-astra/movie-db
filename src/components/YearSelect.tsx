import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select';

type Props = {
  year?: number;
  onChange: (val?: number) => void;
};

const YearSelect = ({ year, onChange }: Props) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 125 }, (_, i) => currentYear - i);
  const optionClasses = 'cursor-pointer hover:bg-gray-400';

  return (
    <Select
      value={year?.toString() || ''}
      onValueChange={(val) => onChange(val === 'all' ? undefined : Number(val))}
    >
      <SelectTrigger className='w-[120px] bg-gray-500 text-white cursor-pointer'>
        <SelectValue placeholder='Year' />
      </SelectTrigger>
      <SelectContent className='bg-gray-500 text-white max-h-60 overflow-y-auto'>
        <SelectItem className={optionClasses} value='all'>
          All
        </SelectItem>
        {years.map((y) => (
          <SelectItem key={y} className={optionClasses} value={y.toString()}>
            {y}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default YearSelect;
