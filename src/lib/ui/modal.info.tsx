"use client"

import Image from "next/image"
import CE_Button from "./button"
import { useState, useRef, useEffect } from "react"

interface I_ModalInfoProps {
    title: string
    isOpen: boolean
    closeButtonText?: string
    description?: string
    isSuccess?: boolean
    onClose: () => void
}

export default function CE_ModalInfo(props: I_ModalInfoProps) {
    const [showFade, setShowFade] = useState(true)
    const scrollRef = useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        if (!scrollRef.current) return
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
        const isBottom = scrollTop + clientHeight >= scrollHeight - 10
        setShowFade(!isBottom)
    }

    useEffect(() => {
        if (props.isOpen) setShowFade(true)
    }, [props.isOpen])

    return (
        <>
            {props.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={props.onClose}
                    />

                    <div className="relative z-50 bg-white rounded-2xl shadow-lg p-6 w-[80%] max-w-md flex flex-col items-center text-center max-h-[90%]">
                        <div
                            ref={scrollRef}
                            onScroll={handleScroll}
                            className="w-full flex flex-col items-center overflow-y-auto no-scrollbar relative"
                        >
                            {props.isSuccess !== undefined && (
                                <div className="mb-4 flex justify-center">
                                    <Image
                                        src={props.isSuccess ? "/icons/success.png" : "/icons/error.png"}
                                        alt={props.isSuccess ? "Success" : "Error"}
                                        width={60}
                                        height={60}
                                    />
                                </div>
                            )}

                            <div className="flex flex-col mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">{props.title}</h2>

                                {props.description && (
                                    <p className="text-gray-600 mt-2">{props.description}</p>
                                )}

                            </div>
                        </div>

                        {showFade && (
                            <div className="absolute bottom-[72px] left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                        )}

                        <div className="flex flex-row w-full gap-2 mt-4">
                            <CE_Button
                                label={props.closeButtonText ?? "Close"}
                                onClick={props.onClose}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
