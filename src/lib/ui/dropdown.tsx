"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"

interface I_DropdownOption {
    label: string
    value: string
}

interface I_DropdownProps {
    label: string
    options: I_DropdownOption[]
    value: string
    disable?: boolean
    placeholder?: string
    className?: string
    onChange?: (value: string) => void
}

export default function CE_Dropdown({
    options,
    label,
    value,
    disable,
    placeholder = "Select an option",
    className,
    onChange,
}: I_DropdownProps) {
    const [open, setOpen] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const selected = options.find((opt) => opt.value === value) || null

    const handleSelect = (option: I_DropdownOption) => {
        setOpen(false)
        onChange?.(option.value)
    }

    // ✅ Close kalau klik di luar
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div ref={wrapperRef} className={`relative ${className ?? ""}`}>
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <button
                type="button"
                disabled={disable}
                onClick={() => !disable && setOpen(!open)}
                className={`
                    w-full flex justify-between items-center rounded-lg px-4 py-2 
                    shadow-sm focus:outline-none focus:ring-2 focus:ring-primary 
                    ${disable 
                        ? "bg-disable cursor-not-allowed" 
                        : "bg-white border border-gray-300 hover:border-primary cursor-pointer"}
                `}
            >
                <span
                    className={
                        selected
                            ? "text-sm text-gray-900"
                            : disable
                                ? "text-sm text-disable-text"
                                : "text-sm text-gray-400"
                    }
                >
                    {selected ? selected.label : placeholder}
                </span>
                <Image
                    src={"/icons/arrow-down.png"}
                    width={16}
                    height={16}
                    alt="arrow"
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && !disable && (
                <ul className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                    {options.map((opt) => (
                        <li
                            key={opt.value}
                            onClick={() => handleSelect(opt)}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                selected?.value === opt.value ? "bg-gray-50 font-medium" : ""
                            }`}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
