import React from "react";

interface CheckboxProps {
  label?: string;
  value: string;
  isChecked: boolean;
  onChange: (value: string, checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  value,
  isChecked,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    onChange(value, checked);
  };

  return (
    <span>
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      {label}
    </span>
  );
};

export default Checkbox;
