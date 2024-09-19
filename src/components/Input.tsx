import React from "react";

interface InputProps {
  id: string;
  label: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  name,
  value,
  onChange,
  required = false,
  min,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-md font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        min={min}
        className="bg-gray-700 text-white p-2 rounded transition duration-300 focus:ring-2 focus:ring-blue-500 w-full"
      />
    </div>
  );
};

export default Input;
