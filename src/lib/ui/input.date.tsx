"use client"

import { useState, useEffect } from "react"
import CE_Dropdown from "./dropdown"

interface I_DatePickerSplitProps {
    label: string
    value: Date | null
    className?: string
    yearRange?: { start: number; end: number }
    onChange: (val: Date) => void
}

export default function CE_DatePickerSplit({
    label,
    value,
    className,
    yearRange,
    onChange,
}: I_DatePickerSplitProps) {
    const [year, setYear] = useState<number | null>(value?.getFullYear() ?? null)
    const [month, setMonth] = useState<number | null>(
        value ? value.getMonth() + 1 : null
    )
    const [day, setDay] = useState<number | null>(value?.getDate() ?? null)

    const currentYear = new Date().getFullYear()
    const startYear = yearRange?.start ?? currentYear - 100
    const endYear = yearRange?.end ?? currentYear

    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i)
    const months = Array.from({ length: 12 }, (_, i) => i + 1)
    const daysInMonth = year && month ? new Date(year, month, 0).getDate() : 31
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    useEffect(() => {
        if (year && month && day) {
            onChange(new Date(year, month - 1, day))
        }
    }, [year, month, day])

    useEffect(() => {
        if (day && day > daysInMonth) {
            setDay(null)
        }
    }, [year, month, daysInMonth])

    const changeYear = (val: string) => {
        setYear(parseInt(val))
        setMonth(null)
        setDay(null)
    }

    const changeMonth = (val: string) => {
        setMonth(parseInt(val))
        setDay(null)
    }

    return (
        <div className={`flex flex-col gap-1 ${className ?? ""}`}>
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div className="flex gap-2">
                <CE_Dropdown
                    label="Year"
                    placeholder="Year"
                    value={year ? year.toString() : ""}
                    options={years.map((y) => ({
                        label: y.toString(),
                        value: y.toString(),
                    }))}
                    onChange={(val) => changeYear(val)}
                    className="flex-1"
                />

                <CE_Dropdown
                    label="Month"
                    placeholder="Month"
                    disable={year === null}
                    value={month ? month.toString() : ""}
                    options={months.map((m) => ({
                        label: m.toString().padStart(2, "0"),
                        value: m.toString(),
                    }))}
                    onChange={(val) => changeMonth(val)}
                    className="flex-1"
                />

                <CE_Dropdown
                    label="Day"
                    placeholder="Day"
                    disable={month === null}
                    value={day ? day.toString() : ""}
                    options={days.map((d) => ({
                        label: d.toString().padStart(2, "0"),
                        value: d.toString(),
                    }))}
                    onChange={(val) => setDay(parseInt(val))}
                    className="flex-1"
                />
            </div>
        </div>
    )
}
