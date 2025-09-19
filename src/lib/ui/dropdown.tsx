"use client"

import Image from "next/image"
import { useState } from "react"

interface I_DropdownOption {
    label: string
    value: string
}

interface I_DropdownProps {
    options: I_DropdownOption[]
    placeholder?: string
    className?: string
    onChange?: (value: string) => void
}

export default function CE_Dropdown({
    options,
    placeholder = "Select an option",
    className,
    onChange,
}: I_DropdownProps) {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<I_DropdownOption | null>(null)

    const handleSelect = (option: I_DropdownOption) => {
        setSelected(option)
        setOpen(false)
        onChange?.(option.value)
    }

    return (
        <div className={`relative ${className ?? ""}`}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center hover:cursor-pointer border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
                <span className={selected ? "text-gray-900" : "text-gray-400"}>
                    {selected ? selected.label : placeholder}
                </span>
                <Image src={"/icons/arrow-down.png"} width={16} height={16} alt="arrow"/>
            </button>

            {open && (
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
