"use client"

import { useState } from "react"

interface I_CheckboxProps {
    label: string
    shape?: "square" | "rounded" | "circle"
    onChecked: (checked: boolean) => void
}

export default function CE_Checkbox({
    label,
    shape = "square",
    onChecked,
}: I_CheckboxProps) {
    const [checked, setChecked] = useState(false)

    const handleChange = () => {
        const newChecked = !checked
        setChecked(newChecked)
        onChecked?.(newChecked)
    }

    const shapeClass =
        shape === "circle"
        ? "rounded-full"
        : shape === "rounded"
            ? "rounded-md"
            : "rounded-sm"

    return (
        <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                className="hidden"
            />
                <div
                    className={`w-5 h-5 border-2 flex items-center justify-center 
                    transition-colors duration-200 ${shapeClass} 
                    ${checked ? "bg-primary border-primary" : "bg-white border-gray-400"}`}
                >
                    {checked && (
                        <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </div>
            <span className="text-gray-800">{label}</span>
        </label>
    )
}
