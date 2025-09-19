"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import emitter from "../utils/global.emitter"
import Image from "next/image"

interface ToastPayload {
    success?: boolean
    label: string
    autoclose?: boolean
    autoclosetime?: number
    onClose?: () => void
}

interface ToastMessage extends ToastPayload {
    id: number
}

export interface I_ToastProps {
    name: string
}

export default function CE_Toast({ name }: I_ToastProps) {
    const [toasts, setToasts] = useState<ToastMessage[]>([])
    const toastId = useRef(0)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const handleToast = (payload: ToastPayload) => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            setToasts([])

            setTimeout(() => {
                const id = toastId.current++
                const toast: ToastMessage = { id, ...payload }
                setToasts([toast])

                if (payload.autoclose ?? true) {
                    timeoutRef.current = setTimeout(() => {
                        setToasts([])
                        payload.onClose?.()
                        timeoutRef.current = null
                    }, (payload.autoclosetime ?? 3) * 1000)
                }
            }, 100)
        }

        emitter.on(name, handleToast)
        return () => {
            emitter.off(name, handleToast)
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [name])

    return (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[9999] w-full max-w-2xl px-4">
            <AnimatePresence>
                {toasts.map((t) => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className={`flex flex-row gap-1 w-full min-w-[50%] max-w-xl px-4 py-2 rounded-3xl shadow-lg font-semibold ${
                            t.success ? "text-white bg-success" : "text-white bg-danger"
                        }`}
                    >
                        {t.success 
                            ? <Image src={"/icons/success.png"} alt="success" height={20} width={25}/>
                            : <Image src={"/icons/error.png"} alt="error" height={20} width={25}/>
                        }
                        {t.label}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
