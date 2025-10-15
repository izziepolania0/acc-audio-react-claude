import type { ChangeEvent } from "react";

interface SettingRowProps {
  label: string;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  min: string;
  max: string;
  step: string;
}

const SettingRow: React.FC<SettingRowProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
}) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-bold text-white">{label}</span>
      <input
        type="number"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className="w-24 px-3 py-2 rounded-lg bg-white/20 text-white text-center border-none focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
    </div>
  );
};

export default SettingRow;
