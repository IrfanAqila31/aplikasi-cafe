import { useState, useRef, useEffect } from "react";
import { Clock, ChevronDown, Check } from "lucide-react";

interface CustomTimePickerProps {
  value: string;
  onChange: (time: string) => void;
}

const CustomTimePicker = ({ value, onChange }: CustomTimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generate times from 10:00 to 22:00 in 30 min intervals
  const generateTimes = () => {
    const times = [];
    for (let h = 10; h <= 22; h++) {
      times.push(`${h.toString().padStart(2, "0")}:00`);
      if (h !== 22) {
        times.push(`${h.toString().padStart(2, "0")}:30`);
      }
    }
    return times;
  };

  const timeOptions = generateTimes();

  return (
    <div className="relative" ref={dropdownRef}>
      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 z-10 pointer-events-none" />
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[#1c0e06] border transition-all rounded-xl py-3 pl-10 pr-4 text-sm cursor-pointer flex items-center justify-between ${isOpen ? "border-amber-500/50 ring-1 ring-amber-500/50 text-stone-200" : "border-white/10 text-stone-200 hover:border-amber-500/30"}`}
      >
        <span
          className={`select-none pointer-events-none ${!value ? "text-stone-600" : ""}`}
        >
          {value || "Pilih Jam"}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-stone-500 transition-transform duration-300 pointer-events-none ${isOpen ? "rotate-180 text-amber-500" : ""}`}
        />
      </div>

      <div
        className={`absolute left-0 right-0 top-[calc(100%+0.5rem)] bg-[#2b1408]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl max-h-56 overflow-y-auto transition-all duration-300 z-50 origin-top [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20 ${isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}
      >
        {timeOptions.map((time) => (
          <div
            key={time}
            onClick={() => {
              onChange(time);
              setIsOpen(false);
            }}
            className={`px-4 py-3 text-sm cursor-pointer transition-colors flex items-center justify-between ${value === time ? "bg-amber-500/10 text-amber-400" : "text-stone-300 hover:bg-white/5 hover:text-stone-100"}`}
          >
            <span>{time}</span>
            {value === time && <Check className="w-4 h-4" />}
          </div>
        ))}
      </div>
    </div>
  );
};
export default CustomTimePicker;
