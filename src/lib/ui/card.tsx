"use client"

interface I_CardProps {
    bgColor?:string
    className?: string
    children: React.ReactNode
}

export default function CE_Card(props: I_CardProps) {
    return (
        <div
            className={`rounded-2xl shadow-lg p-4 ${props.className} ${props.bgColor ?? 'bg-white'}`}
        >
            {props.children}
        </div>
    )
}
