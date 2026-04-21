import { useState, useRef, useEffect } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

interface CustomDatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
}

const CustomDatePicker = ({ value, onChange }: CustomDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
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

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const handleDateSelect = (day: number) => {
    const selected = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    onChange(selected);
    setIsOpen(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Pilih Tanggal";
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 z-10 pointer-events-none" />
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[#1c0e06] border transition-all rounded-xl py-3 pl-10 pr-4 text-sm cursor-pointer flex items-center justify-between ${isOpen ? "border-amber-500/50 ring-1 ring-amber-500/50 text-stone-200" : "border-white/10 text-stone-200 hover:border-amber-500/30"}`}
      >
        <span
          className={`select-none pointer-events-none ${!value ? "text-stone-600" : ""}`}
        >
          {formatDate(value)}
        </span>
      </div>

      {/* Calendar Dropdown */}
      <div
        className={`absolute left-0 right-0 top-[calc(100%+0.5rem)] bg-[#2b1408]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl p-4 transition-all duration-300 z-50 origin-top ${isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}
      >
        {/* Month Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1 hover:bg-white/10 rounded-lg text-stone-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-amber-400 font-medium text-sm">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1 hover:bg-white/10 rounded-lg text-stone-300 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-[11px] font-semibold text-stone-500 py-1"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {blanks.map((blank) => (
            <div key={`blank-${blank}`} className="aspect-square w-full" />
          ))}
          {days.map((day) => {
            const isSelected =
              value?.getDate() === day &&
              value?.getMonth() === currentMonth.getMonth() &&
              value?.getFullYear() === currentMonth.getFullYear();
            const isToday =
              new Date().getDate() === day &&
              new Date().getMonth() === currentMonth.getMonth() &&
              new Date().getFullYear() === currentMonth.getFullYear();

            return (
              <button
                type="button"
                key={day}
                onClick={() => handleDateSelect(day)}
                className={`aspect-square w-full flex items-center justify-center text-xs rounded-xl transition-all
                  ${
                    isSelected
                      ? "bg-amber-500 text-white font-bold shadow-md shadow-amber-500/30 scale-105"
                      : isToday
                        ? "border border-amber-500/50 text-amber-400 font-bold hover:bg-amber-500/10"
                        : "text-stone-300 font-medium hover:bg-white/10 hover:text-white"
                  }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default CustomDatePicker;
