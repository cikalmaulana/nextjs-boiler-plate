"use client"

import { useState } from "react"

interface I_RadioOption {
    label: string
    value: string
}

interface I_RadioGroupProps {
    options: I_RadioOption[]
    shape?: "square" | "rounded" | "circle"
    defaultValue?: string
    onChange?: (value: string) => void
}

export default function CE_RadioGroup({
    options,
    shape = "circle",
    defaultValue,
    onChange,
}: I_RadioGroupProps) {
    const [selected, setSelected] = useState(defaultValue ?? "")

    const handleSelect = (value: string) => {
        setSelected(value)
        onChange?.(value)
    }

    const shapeClass =
        shape === "circle"
        ? "rounded-full"
        : shape === "rounded"
            ? "rounded-md"
            : "rounded-sm"

    return (
        <div className="flex flex-col gap-3">
            {options.map((opt) => (
                <label
                    key={opt.value}
                    className="flex items-center gap-2 cursor-pointer select-none"
                >
                    <input
                        type="radio"
                        value={opt.value}
                        checked={selected === opt.value}
                        onChange={() => handleSelect(opt.value)}
                        className="hidden"
                    />
                    <div
                        className={`w-5 h-5 border-2 flex items-center justify-center transition-colors duration-200 ${shapeClass}
                        ${selected === opt.value ? "border-primary" : "border-gray-400"}`}
                    >
                        {selected === opt.value && (
                            <div className={`w-2.5 h-2.5 ${shapeClass} bg-primary`} />
                        )}
                    </div>
                    <span className="text-gray-800">{opt.label}</span>
                </label>
            ))}
        </div>
    )
}
