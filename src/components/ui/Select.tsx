import { ChangeEvent } from "react";

type Props = {
  value?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
} & React.HTMLProps<HTMLSelectElement>;

const Select = ({ onChange, value, options, placeholder, ...props }: Props) => {
  return (
    <select
      className="w-min text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
      {...props}
      onChange={onChange}
      value={value}
    >
      {options.map((option, index) => (
        <option key={option || index} value={option}>
          {option || placeholder}
        </option>
      ))}
    </select>
  );
};

export default Select;
