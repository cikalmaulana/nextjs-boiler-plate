"use client"

import Image from "next/image"
import CE_Button from "./button"
import { useState, useRef, useEffect } from "react"

interface I_ModalConfirmProps {
    title: string
    isOpen: boolean
    icon: "none" | "alert" | "success" | "danger"
    acceptBtnText?: string
    declineBtnText?: string
    description?: string
    onClose: () => void
    onCancel: () => void
    onAccept: () => void
}

export default function CE_ModalConfirmation(props: I_ModalConfirmProps) {
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
                            {props.icon !== "none" && (
                                <div className="mb-4 flex justify-center">
                                    <Image
                                        src={
                                            props.icon === "alert"
                                                ? "/icons/alert.png"
                                                : props.icon === "success"
                                                    ? "/icons/success.png"
                                                    : "/icons/error.png"
                                        }
                                        alt="icon"
                                        width={60}
                                        height={60}
                                    />
                                </div>
                            )}

                            <div className="flex flex-col mb-4 px-1">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {props.title}
                                </h2>

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
                                label={props.declineBtnText ?? "Cancel"}
                                color="secondary"
                                onClick={props.onCancel}
                                className="flex-1"
                            />
                            <CE_Button
                                label={props.acceptBtnText ?? "Accept"}
                                color="primary"
                                onClick={props.onAccept}
                                className="flex-1"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
