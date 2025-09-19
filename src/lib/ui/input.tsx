"use client"

import { ChangeEvent, KeyboardEvent } from "react"

interface I_InputProps {
    label: string
    type?:string
    value: string
    placeholder?: string
    className?: string
    onInput: (val: string) => void
    onEnter?: () => void
}

export default function CE_Input({
    label,
    type = "text",
    value,
    placeholder,
    className,
    onInput,
    onEnter,
}: I_InputProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onInput(e.target.value)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onEnter?.()
        }
    }

    return (
        <div className={`flex flex-col gap-1 ${className ?? ""}`}>
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full border focus:border-primary text-gray-900 placeholder-gray-400 border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
        </div>
    )
}