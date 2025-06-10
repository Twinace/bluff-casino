"use client";

import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";

export type SelectOption<T = string> = {
  label: string;
  value: T;
  icon?: React.ReactNode;
};

type Props<T> = {
  value: T;
  onChange: (val: T) => void;
  options: SelectOption<T>[];
  className?: string;
};

export default function CustomSelect<T>({
  value,
  onChange,
  options,
  className = "",
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block min-w-[106px]">
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          "w-full bg-[var(--tab-btn-bg)] text-sm rounded-full pl-3 pr-3 py-[6px] flex items-center justify-between gap-1",
          className
        )}
      >
        <div className="flex items-center gap-2">
          {selected?.icon}
          {selected?.label}
        </div>
        <button className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M15.8334 7.5L10.0001 13.3333L4.16675 7.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </button>

      {open && (
        <ul className="absolute z-50 mt-2 w-full bg-[var(--tab-btn-bg)] border border-[#2C2C31] rounded-md shadow-lg overflow-hidden text-sm">
          {options.map((opt) => (
            <li
              key={`${opt.value}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={clsx(
                "flex items-center gap-2 px-3 py-2 hover:bg-[#2A2A30] cursor-pointer",
                opt.value === value && "bg-[#2A2A30]"
              )}
            >
              {opt.icon}
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
