"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"

interface I_AutocompleteOptions {
    label: string
    value: string
}

interface I_AutocompleteProps {
    label: string
    options: I_AutocompleteOptions[]
    value: string | string[] // bisa single atau multiple
    multiple?: boolean
    disable?: boolean
    placeholder?: string
    className?: string
    onChange?: (value: string | string[]) => void
}

export default function CE_Autocomplete({
    options,
    label,
    value,
    multiple = false,
    disable,
    placeholder = "Select an option",
    className,
    onChange,
}: I_AutocompleteProps) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [highlightIndex, setHighlightIndex] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)

    const values = multiple
        ? ((value as string[]) || [])
        : value
            ? [value as string]
            : []

    const filteredOptions = options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    )

    const handleSelect = (option: I_AutocompleteOptions) => {
        if (multiple) {
            const newValues = values.includes(option.value)
                ? values.filter((v) => v !== option.value)
                : [...values, option.value]
            onChange?.(newValues)
        } else {
            onChange?.(option.value)
            setOpen(false)
        }
        setSearch("")
        setHighlightIndex(0)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!open) return

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault()
                setHighlightIndex((prev) =>
                    prev + 1 < filteredOptions.length ? prev + 1 : 0
                )
                break
            case "ArrowUp":
                e.preventDefault()
                setHighlightIndex((prev) =>
                    prev - 1 >= 0 ? prev - 1 : filteredOptions.length - 1
                )
                break
            case "Enter":
                e.preventDefault()
                if (filteredOptions[highlightIndex]) {
                    handleSelect(filteredOptions[highlightIndex])
                }
                break
            case "Escape":
                setOpen(false)
                break
        }
    }

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus()
        }
    }, [open])

    useEffect(() => {
        setHighlightIndex(0)
    }, [search, options])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("touchstart", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("touchstart", handleClickOutside)
        }
    }, [])

    return (
        <div ref={wrapperRef} className={`relative ${className ?? ""}`}>
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div
                className={`
                    w-full flex justify-between items-center rounded-lg px-4 py-2 
                    shadow-sm focus:outline-none focus:ring-2 focus:ring-primary 
                    ${disable 
                        ? "bg-disable cursor-not-allowed" 
                        : "bg-white border border-gray-300 hover:border-primary cursor-pointer"}
                `}
                onClick={() => !disable && setOpen(true)}
            >
                {multiple && values.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {values.map((val) => {
                            const opt = options.find((o) => o.value === val)
                            return (
                                <span
                                    key={val}
                                    className="bg-primary text-white text-xs px-2 py-1 rounded-md flex items-center gap-1"
                                >
                                {opt?.label ?? val}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleSelect({ label: opt?.label ?? val, value: val })
                                    }}
                                    className="ml-1 text-white hover:text-gray-200"
                                >
                                    x
                                </button>
                                </span>
                            )
                        })}
                    </div>
                )}

                <input
                    ref={inputRef}
                    type="text"
                    disabled={disable}
                    placeholder={values.length === 0 ? placeholder : ""}
                    value={
                        multiple
                            ? search
                            : search || options.find((o) => o.value === (value as string))?.label || ""
                    }
                    onChange={(e) => {
                        setSearch(e.target.value)
                        setHighlightIndex(0)
                        if (!open) setOpen(true)
                    }}
                    onKeyDown={handleKeyDown}
                    className="flex-1 outline-none text-sm bg-transparent px-1"
                />

                <Image
                    src={"/icons/arrow-down.png"}
                    width={16}
                    height={16}
                    alt="arrow"
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
            </div>

            {open && !disable && (
                <ul className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((opt, idx) => (
                            <li
                                key={opt.value}
                                onClick={() => handleSelect(opt)}
                                onMouseEnter={() => setHighlightIndex(idx)}
                                className={`
                                    px-4 py-2 cursor-pointer flex justify-between items-center
                                    hover:bg-gray-100
                                    ${highlightIndex === idx ? "bg-gray-100" : ""}
                                    ${values.includes(opt.value) ? "bg-gray-50 font-medium" : ""}
                                `}
                            >
                                <span>{opt.label}</span>
                                {multiple && values.includes(opt.value) && (
                                    <span className="text-primary text-sm">✓</span>
                                )}
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 text-gray-400">No results found</li>
                    )}
                </ul>
            )}
        </div>
    )
}
