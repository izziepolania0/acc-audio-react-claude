import SettingRow from "./SettingRow";

export default function Settings({
  startSpeed,
  maxSpeed,
  acceleration,
  setMaxSpeed,
  setStartSpeed,
  setAcceleration,
}: {
  startSpeed: number;
  maxSpeed: number;
  acceleration: number;
  setMaxSpeed: (value: number) => void;
  setStartSpeed: (value: number) => void;
  setAcceleration: (value: number) => void;
}) {
  return (
    <div className="bg-white/10 rounded-2xl p-6 space-y-4">
      <SettingRow
        label="Start Speed:"
        value={startSpeed}
        onChange={(e) => setStartSpeed(parseFloat(e.target.value))}
        min="0.5"
        max="2.0"
        step="0.1"
      />
      <SettingRow
        label="Max Speed:"
        value={maxSpeed}
        onChange={(e) => setMaxSpeed(parseFloat(e.target.value))}
        min="1.0"
        max="4.0"
        step="0.1"
      />
      <SettingRow
        label="Acceleration:"
        value={acceleration}
        onChange={(e) => setAcceleration(parseFloat(e.target.value))}
        min="0.1"
        max="2.0"
        step="0.1"
      />
    </div>
  );
}
