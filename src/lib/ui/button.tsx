"use client"

import CE_Loading from "./loading"

export interface I_ButtonProps {
    label: string
    color?: "primary" | "secondary"
    loading?: boolean
    disable?: boolean
    className?: string
    onClick?: () => void
}

export default function CE_Button(props: I_ButtonProps) {
    const {
        label,
        color = "primary",
        loading = false,
        disable = false,
        className = "",
        onClick,
    } = props

    const isDisabled = disable || loading

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`rounded-xl px-4 py-2 font-medium transition-all duration-300 
                ${
                    isDisabled
                        ? "bg-disable text-txt-disable cursor-not-allowed opacity-70"
                        : color === "primary"
                            ? "bg-primary text-white hover:opacity-90 hover:cursor-pointer"
                            : "bg-secondary text-white hover:opacity-90 hover:cursor-pointer"
                }
                ${className}`}
        >
            {loading ? <CE_Loading color={color} /> : label}
        </button>
    )
}
