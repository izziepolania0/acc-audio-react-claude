import type { ChangeEvent } from "react";

export default function FileInput({
  handleFileChange,
}: {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mb-8 text-center">
      <label
        htmlFor="audioFile"
        className="inline-block px-8 py-4 bg-gradient-to-r from-red-500 to-orange-600 rounded-full cursor-pointer hover:translate-y-[-2px] hover:shadow-lg transition-all font-bold uppercase tracking-wider text-white"
      >
        Choose Music File
      </label>
      <input
        type="file"
        id="audioFile"
        className="hidden"
        accept="audio/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
