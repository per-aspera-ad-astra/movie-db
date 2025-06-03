import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select';

type Props = {
  sort: string;
  onChange: (val: string) => void;
};

const options = [
  { value: 'popularity.desc', label: 'Popular' },
  { value: 'release_date.desc', label: 'New' },
  { value: 'vote_average.desc', label: 'High rating' },
  { value: 'revenue.desc', label: 'Revenue' },
];

const optionClasses = 'cursor-pointer hover:bg-gray-400';

const SortSelect = ({ sort, onChange }: Props) => {
  return (
    <Select value={sort} onValueChange={onChange}>
      <SelectTrigger className='w-[140px] bg-gray-500 text-white cursor-pointer'>
        <SelectValue placeholder='Sort by' />
      </SelectTrigger>
      <SelectContent className='bg-gray-500 text-white max-h-60 overflow-y-auto'>
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            className={optionClasses}
            value={opt.value}
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortSelect;
