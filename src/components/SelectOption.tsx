import React from "react";

interface SelectOptionProps {
  id: string;
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  options: { value: string | number; label: string }[];
  placeholder?: string;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  id,
  label,
  name,
  value,
  onChange,
  required = false,
  options,
  placeholder = " ",
}) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-md font-medium">
        {label}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="bg-gray-700 text-white p-2 rounded transition duration-300 focus:ring-2 focus:ring-blue-500 w-full"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOption;
