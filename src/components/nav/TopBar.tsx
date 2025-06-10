"use client";

import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Button from "../form/Button";

interface TopBarProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setMode: (mode: "register" | "login") => void;
}

export default function TopBar({ setIsModalOpen, setMode }: TopBarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 pb-4 rounded-b-3xl">
      {/* Left Side: Logo + Search */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Logo */}
        <img src="/logo.svg" alt="Logo" className="w-auto h-[20px]" />
      </div>
      <div className="w-full max-w-[415px]">
        {/* Search Icon (Mobile) */}
        <div className="flex sm:hidden items-center justify-center w-10 h-10 bg-[var(--burger-btn-bg)] rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
          >
            <path
              d="M12.9866 12.69L15.2966 15M14.5669 8.625C14.5669 10.1168 13.9743 11.5476 12.9194 12.6025C11.8645 13.6574 10.4337 14.25 8.94189 14.25C7.45005 14.25 6.01931 13.6574 4.96442 12.6025C3.90953 11.5476 3.31689 10.1168 3.31689 8.625C3.31689 7.13316 3.90953 5.70242 4.96442 4.64752C6.01931 3.59263 7.45005 3 8.94189 3C10.4337 3 11.8645 3.59263 12.9194 4.64752C13.9743 5.70242 14.5669 7.13316 14.5669 8.625Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden sm:flex items-center gap-2 bg-[var(--burger-btn-bg)] p-[14px] rounded-full w-full max-w-[415px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
          >
            <path
              d="M12.9866 12.69L15.2966 15M14.5669 8.625C14.5669 10.1168 13.9743 11.5476 12.9194 12.6025C11.8645 13.6574 10.4337 14.25 8.94189 14.25C7.45005 14.25 6.01931 13.6574 4.96442 12.6025C3.90953 11.5476 3.31689 10.1168 3.31689 8.625C3.31689 7.13316 3.90953 5.70242 4.96442 4.64752C6.01931 3.59263 7.45005 3 8.94189 3C10.4337 3 11.8645 3.59263 12.9194 4.64752C13.9743 5.70242 14.5669 7.13316 14.5669 8.625Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="search slots.."
            className="bg-transparent text-sm tracking-[-0.28px] leading-[100%] text-[var(--input-text-color)] placeholder:text-[var(--input-text-color)] outline-none w-full"
          />
        </div>
      </div>
      {/* Right Side: Wallet + Avatar */}
      <div className="flex items-center gap-2 w-full max-w-[248px] justify-end">
        {/* <div className="flex items-center gap-2 bg-[#16151E] px-4 py-2 rounded-md">
          <span className="text-green-400 text-xl leading-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                fill="#6CDE07"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.0625 11.9712C14.0625 13.5775 12.7587 14.6438 10.8337 14.8044V16.25H9.515V14.79C8.21293 14.6432 6.9758 14.1431 5.9375 13.3438L6.9075 12.015C7.77188 12.6869 8.59 13.125 9.57563 13.2712V10.4087C7.3625 9.85375 6.33187 9.05062 6.33187 7.40062C6.33187 5.82375 7.62 4.74313 9.515 4.59688V3.75H10.8337V4.62625C11.8645 4.74074 12.8471 5.12346 13.6837 5.73625L12.8344 7.10875C12.1675 6.62687 11.4856 6.32 10.7731 6.17437V8.94875C13.0775 9.50375 14.0625 10.3944 14.0625 11.9712ZM9.575 8.64187V6.07188C8.62062 6.145 8.12063 6.65625 8.12063 7.29875C8.12063 7.91125 8.40813 8.30625 9.57563 8.6425L9.575 8.64187ZM12.2738 12.0731C12.2738 11.4169 11.955 11.0225 10.7731 10.6862V13.33C11.7281 13.2562 12.2738 12.7744 12.2738 12.0738V12.0731Z"
                fill="white"
              />
            </svg>
          </span>
          <span className="text-white text-sm font-semibold">0.00</span>
          <svg
            className="w-4 h-4 text-white ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <img src="/avatar.jpeg" alt="User" className="w-10 h-10 rounded-full" /> */}
        {user ? (
          <>
            <Button
              label="Settings"
              variant="signup"
              onClick={() => router.push("/settings")}
            />
            <Button label="Logout" variant="login" onClick={logout} />
          </>
        ) : (
          <>
            <Button
              variant="login"
              label="Log in"
              fullWidth
              onClick={() => {
                setMode("login");
                setIsModalOpen(true);
              }}
            />
            <Button
              variant="signup"
              label="Sign up"
              fullWidth
              onClick={() => {
                setMode("register");
                setIsModalOpen(true);
              }}
            />
          </>
        )}
      </div>
    </header>
  );
}
