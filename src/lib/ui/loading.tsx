"use client"

export interface I_LoadingProps {
    color: "primary" | "secondary" | "white"
    label?: string
    className?: string
    height?: string
    width?: string
}

export default function CE_Loading(props: I_LoadingProps) {
    const { color, label, className = "", height, width } = props

    const spinnerColor =
        color === "primary"
            ? "border-primary"
            : color === "secondary"
                ? "border-secondary"
                : "border-white"

    if (!height && !width) {
        return (
            <div
                className={`flex h-full w-full items-center justify-center gap-2 ${className}`}
            >
                <div
                    className={`h-6 w-6 animate-spin rounded-full border-2 border-t-transparent ${spinnerColor}`}
                ></div>
                {label && <span className="text-sm">{label}</span>}
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div
                className={`${
                    height ?? "h-6"
                    } ${width ?? "w-6"} animate-spin rounded-full border-2 border-t-transparent ${spinnerColor}`}
            ></div>
            {label && <span className="text-sm">{label}</span>}
        </div>
    );
}
