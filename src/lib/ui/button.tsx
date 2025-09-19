"use client"

import CE_Loading from "./loading"

export interface I_ButtonProps {
    label: string
    color?: "primary" | "secondary"
    loading?: boolean
    loadingText?: string
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

    const isDisabled = disable

    return (
        <button
            onClick={onClick}
            disabled={isDisabled || loading}
            className={`rounded-xl px-4 py-2 font-medium transition-all duration-300 
                ${
                    isDisabled
                        ? "bg-disable text-txt-disable opacity-70"
                        : color === "primary"
                            ? "bg-primary text-white "
                            : "bg-secondary text-white "
                }
                ${isDisabled || loading ? "cursor-not-allowed" : "hover:cursor-pointer hover:opacity-90"}
                ${className}`}
        >
            {loading ? <CE_Loading color="white" label={props.loadingText} height="h-4" width="w-4"/> : label}
        </button>
    )
}
